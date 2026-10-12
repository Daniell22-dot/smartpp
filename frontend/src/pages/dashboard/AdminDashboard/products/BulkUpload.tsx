import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { productsAPI } from '../../../../Features/products/productsAPI';
import { categoriesAPI, type Category } from '../../../../Features/categories/categoriesAPI';
import './Products.css';
import './CreateProduct.css';
import './BulkUpload.css';

interface ParsedRow {
  name: string;
  data: Record<string, any>;
  errors: string[];
}

const TEMPLATE_HEADERS = [
  'name', 'slug', 'price', 'comparePrice', 'stock', 'category',
  'brand', 'sku', 'color', 'operatingSystem', 'screenSize', 'warranty',
  'store', 'condition', 'shortDescription', 'description', 'isFeatured',
  'isBestSeller', 'featuredPhoto'
];

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const parseCSV = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field); field = '';
    } else if (char === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
};

const bool = (value: string) => ['true', '1', 'yes', 'y'].includes(String(value).trim().toLowerCase());

export default function BulkUpload() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [error, setError] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: { row: number; name: string; reason: string }[] } | null>(null);

  useEffect(() => {
    categoriesAPI.getAll().then((res) => {
      if (res.success) setCategories(res.data);
    }).catch(console.error);
  }, []);

  const downloadTemplate = () => {
    const sample = 'Sample Phone,sample-phone,19999,24999,10,Smartphones,Sample Brand,SAMPLE-001,Midnight Black,Android 14,6.1 inches,1 year,GMNEX Official,Brand New,Short summary,Full description,false,true,https://example.com/image.jpg';
    const csv = `${TEMPLATE_HEADERS.join(',')}\n${sample}\n`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products-template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (file: File) => {
    setError('');
    setResult(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const matrix = parseCSV(String(reader.result || ''));
        if (matrix.length < 2) {
          setError('The file appears to be empty or is missing a header row.');
          setRows([]);
          return;
        }
        const headers = matrix[0].map((h) => h.trim().toLowerCase());
        const categoryByName = new Map<string, number>();
        const categoryBySlug = new Map<string, number>();
        categories.forEach((c) => {
          categoryByName.set(c.name.toLowerCase(), c.categoryId);
          categoryBySlug.set(c.slug.toLowerCase(), c.categoryId);
        });

        const parsed: ParsedRow[] = matrix.slice(1).map((cells, rowIndex) => {
          const record: Record<string, string> = {};
          headers.forEach((h, idx) => { record[h] = (cells[idx] ?? '').trim(); });
          const errors: string[] = [];

          const name = record.name || record.title || '';
          if (!name) errors.push('Missing name');

          let slug = record.slug || '';
          if (!slug && name) slug = slugify(name);

          const priceRaw = record.price || record['price(ksh)'] || '';
          const price = parseFloat(priceRaw);
          if (!priceRaw || isNaN(price) || price < 0) errors.push('Invalid or missing price');

          const compareRaw = record.compareprice || record['compare price'] || '';
          const comparePrice = compareRaw ? parseFloat(compareRaw) : null;

          const stockRaw = record.stock || '0';
          const stock = parseInt(stockRaw, 10);

          let categoryId: number | null = null;
          const catValue = record.category || record.categoryid || '';
          if (catValue) {
            const numeric = parseInt(catValue, 10);
            if (!isNaN(numeric) && String(numeric) === catValue) {
              categoryId = numeric;
            } else {
              categoryId = categoryByName.get(catValue.toLowerCase())
                ?? categoryBySlug.get(slugify(catValue))
                ?? null;
              if (!categoryId) errors.push(`Unknown category "${catValue}"`);
            }
          }

          const data = {
            name,
            slug,
            description: record.description || '',
            shortDescription: record.shortdescription || record['short description'] || '',
            price: isNaN(price) ? 0 : price,
            comparePrice: comparePrice && !isNaN(comparePrice) ? comparePrice : null,
            stock: isNaN(stock) ? 0 : stock,
            categoryId,
            brand: record.brand || '',
            sku: record.sku || '',
            color: record.color || '',
            operatingSystem: record.operatingsystem || record['operating system'] || record.os || '',
            screenSize: record.screensize || record['screen size'] || '',
            warranty: record.warranty || '',
            store: record.store || '',
            condition: record.condition || '',
            isFeatured: bool(record.isfeatured || record.featured || ''),
            isBestSeller: bool(record.isbestseller || record['best seller'] || ''),
            featuredPhoto: record.featuredphoto || record.image || '',
          };

          return { name: name || `(row ${rowIndex + 2})`, data, errors };
        });

        setRows(parsed);
      } catch (err) {
        console.error(err);
        setError('Could not read that file. Please upload a valid CSV file.');
        setRows([]);
      }
    };
    reader.readAsText(file);
  };

  const validRows = rows.filter((r) => r.errors.length === 0);

  const handleImport = async () => {
    if (validRows.length === 0) return;
    setImporting(true);
    setError('');
    try {
      const res = await productsAPI.bulkCreate(validRows.map((r) => r.data));
      if (res.success) {
        setResult(res.data);
      } else {
        setError((res as any).message || 'Import failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div className="page-header-left">
          <button className="back-btn" onClick={() => navigate('/admin/products')}>
            <ArrowLeft size={18} /> Back to Products
          </button>
          <h2>Bulk Upload Products</h2>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="bulk-intro">
        <p>
          Upload a CSV file to add many products at once. Each row becomes a product.
          Use the template to get the correct column headers. Categories can be matched by name
          (e.g. <code>Smartphones</code>) or by numeric ID.
        </p>
        <button type="button" className="btn-secondary" onClick={downloadTemplate}>
          <FileDown size={16} /> Download CSV Template
        </button>
      </div>

      <label className="bulk-dropzone">
        <Upload size={28} />
        <span className="bulk-dropzone-title">
          {fileName ? fileName : 'Click to choose a CSV file'}
        </span>
        <span className="bulk-dropzone-hint">CSV files only · up to 500 products</span>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </label>

      {rows.length > 0 && (
        <>
          <div className="bulk-summary">
            <span className="bulk-chip ok"><CheckCircle2 size={14} /> {validRows.length} ready</span>
            {rows.length - validRows.length > 0 && (
              <span className="bulk-chip bad"><AlertCircle size={14} /> {rows.length - validRows.length} with issues</span>
            )}
            <span className="bulk-total">{rows.length} rows detected</span>
          </div>

          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Price</th>
                  <th>Compare</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={r.errors.length > 0 ? 'bulk-row-bad' : ''}>
                    <td>{i + 1}</td>
                    <td className="product-name">{r.data.name || '—'}</td>
                    <td className="product-sku">{r.data.slug || '—'}</td>
                    <td className="product-price">{r.data.price ? `KSh ${Number(r.data.price).toLocaleString()}` : '—'}</td>
                    <td className="product-price">{r.data.comparePrice ? `KSh ${Number(r.data.comparePrice).toLocaleString()}` : '—'}</td>
                    <td>{r.data.stock}</td>
                    <td>
                      {r.errors.length === 0 ? (
                        <span className="bulk-status ok">Ready</span>
                      ) : (
                        <span className="bulk-status bad" title={r.errors.join(', ')}>{r.errors.join(', ')}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleImport}
              disabled={importing || validRows.length === 0}
            >
              {importing ? 'Importing...' : <><Upload size={16} /> Import {validRows.length} Products</>}
            </button>
            <button type="button" className="btn-secondary" onClick={() => { setRows([]); setFileName(''); setError(''); }}>
              Clear
            </button>
          </div>
        </>
      )}

      {result && (
        <div className="bulk-result">
          <h3>Import complete</h3>
          <p><strong>{result.success}</strong> products imported successfully.</p>
          {result.failed.length > 0 && (
            <>
              <p className="bulk-result-fail-title">{result.failed.length} rows failed:</p>
              <ul className="bulk-result-fail-list">
                {result.failed.map((f, i) => (
                  <li key={i}>Row {f.row} — {f.name || 'unnamed'}: {f.reason}</li>
                ))}
              </ul>
            </>
          )}
          <button type="button" className="btn-primary" onClick={() => navigate('/admin/products')}>
            View Products
          </button>
        </div>
      )}
    </div>
  );
}
