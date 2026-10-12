import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X, Star } from 'lucide-react';
import ProductCard from '../productcard/ProductCard';
import { ProductGridSkeleton } from '../skeletons';
import { productsAPI, type CatalogResult, type Facets, type FacetValue } from '../../Features/products/productsAPI';
import { categoriesAPI, type Category } from '../../Features/categories/categoriesAPI';
import { wishlistAPI } from '../../Features/wishlist/wishlistAPI';
import { getBrandBySlug } from '../../config/brands';
import BrandStrip from './BrandStrip';
import CategoryTilesNav from './CategoryTilesNav';
import SEO from '../seo/SEO';
import './Catalog.css';

type ArrayKey = 'category' | 'brand' | 'color' | 'os' | 'screenSize' | 'warranty' | 'store' | 'condition';

interface FilterState {
  category: string[];
  brand: string[];
  color: string[];
  os: string[];
  screenSize: string[];
  warranty: string[];
  store: string[];
  condition: string[];
  minPrice: string;
  maxPrice: string;
  minRating: string;
  minDiscount: string;
  inStock: boolean;
  sort: string;
  page: number;
}

interface CatalogProps {
  mode: 'all' | 'category' | 'brand' | 'search';
  slug?: string;
  searchTerm?: string;
}

const SORTS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Product Rating' },
  { value: 'discount', label: 'Biggest Discount' },
];

const DISCOUNTS = [50, 40, 30, 20, 10];

const ARRAY_KEYS: ArrayKey[] = ['category', 'brand', 'color', 'os', 'screenSize', 'warranty', 'store', 'condition'];

const FACET_SECTIONS: { key: ArrayKey; title: string; dataKey: keyof Facets }[] = [
  { key: 'brand', title: 'Brand', dataKey: 'brands' },
  { key: 'os', title: 'Operating System', dataKey: 'operatingSystems' },
  { key: 'color', title: 'Color', dataKey: 'colors' },
  { key: 'screenSize', title: 'Screen Size', dataKey: 'screenSizes' },
  { key: 'warranty', title: 'Warranty', dataKey: 'warranties' },
  { key: 'store', title: 'Stores', dataKey: 'stores' },
  { key: 'condition', title: 'Condition', dataKey: 'conditions' },
];

const emptyFilters = (): FilterState => ({
  category: [],
  brand: [],
  color: [],
  os: [],
  screenSize: [],
  warranty: [],
  store: [],
  condition: [],
  minPrice: '',
  maxPrice: '',
  minRating: '',
  minDiscount: '',
  inStock: false,
  sort: 'popularity',
  page: 1,
});

const seedFilters = (mode: CatalogProps['mode'], slug?: string, searchTerm?: string): FilterState => {
  const base = emptyFilters();
  if (mode === 'category' && slug) base.category = [slug];
  if (mode === 'brand' && slug) base.brand = [getBrandBySlug(slug)?.name || slug];
  if (mode === 'search' && searchTerm) base.sort = 'popularity';
  return base;
};

export default function Catalog({ mode, slug, searchTerm }: CatalogProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const base = seedFilters(mode, slug, searchTerm);
    ARRAY_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) base[key] = value.split(',').map((v) => v.trim()).filter(Boolean);
    });
    const minPrice = searchParams.get('minPrice');
    if (minPrice) base.minPrice = minPrice;
    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) base.maxPrice = maxPrice;
    const minRating = searchParams.get('minRating');
    if (minRating) base.minRating = minRating;
    const minDiscount = searchParams.get('minDiscount');
    if (minDiscount) base.minDiscount = minDiscount;
    const sort = searchParams.get('sort');
    if (sort) base.sort = sort;
    return base;
  });

  const [result, setResult] = useState<CatalogResult | null>(null);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistStatus, setWishlistStatus] = useState<Record<number, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ category: true, brand: true });
  const [showFilters, setShowFilters] = useState(false);
  const [priceInputs, setPriceInputs] = useState({ min: filters.minPrice, max: filters.maxPrice });

  useEffect(() => {
    categoriesAPI.getActive().then((res) => {
      if (res.success) setCategories(res.data);
    }).catch(() => {});
  }, []);

  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const params: Record<string, any> = { sort: filters.sort, page: filters.page, limit: 24 };
        if (searchTerm) params.q = searchTerm;
        ARRAY_KEYS.forEach((key) => {
          if (filters[key].length) params[key] = filters[key];
        });
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.minRating) params.minRating = filters.minRating;
        if (filters.minDiscount) params.minDiscount = filters.minDiscount;
        if (filters.inStock) params.inStock = 'true';

        const facetParams: Record<string, any> = {};
        if (searchTerm) facetParams.q = searchTerm;
        if (filters.category.length) facetParams.category = filters.category;

        const [catalogRes, facetRes] = await Promise.all([
          productsAPI.getCatalog(params),
          productsAPI.getFacets(facetParams),
        ]);
        if (cancelled) return;
        if (catalogRes.success) setResult(catalogRes.data);
        if (facetRes.success) setFacets(facetRes.data);
      } catch (error) {
        console.error('Error loading catalog:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [filterKey, searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    ARRAY_KEYS.forEach((key) => {
      if (filters[key].length) params.set(key, filters[key].join(','));
    });
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minRating) params.set('minRating', filters.minRating);
    if (filters.minDiscount) params.set('minDiscount', filters.minDiscount);
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.sort !== 'popularity') params.set('sort', filters.sort);
    if (filters.page > 1) params.set('page', String(filters.page));
    setSearchParams(params, { replace: true });
  }, [filterKey]);

  useEffect(() => {
    if (!result || !localStorage.getItem('token')) return;
    let cancelled = false;
    (async () => {
      const statuses: Record<number, boolean> = {};
      for (const p of result.products) {
        try {
          const res = await wishlistAPI.check(p.productId);
          if (res.success) statuses[p.productId] = res.data;
        } catch {
          statuses[p.productId] = false;
        }
      }
      if (!cancelled) setWishlistStatus(statuses);
    })();
    return () => { cancelled = true; };
  }, [result]);

  const toggleArray = (key: ArrayKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
      page: 1,
    }));
  };

  const setScalar = (patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));
  };

  const clearAll = () => {
    setFilters(seedFilters(mode, slug, searchTerm));
    setPriceInputs({ min: '', max: '' });
  };

  const handleWishlistToggle = async (productId: number) => {
    const current = wishlistStatus[productId] || false;
    try {
      if (current) {
        await wishlistAPI.remove(productId);
        setWishlistStatus((prev) => ({ ...prev, [productId]: false }));
      } else {
        await wishlistAPI.add(productId);
        setWishlistStatus((prev) => ({ ...prev, [productId]: true }));
      }
    } catch {
      alert('Please login to add to wishlist');
    }
  };

  const activeCount = useMemo(() => {
    let count = 0;
    ARRAY_KEYS.forEach((key) => { count += filters[key].length; });
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.minRating) count++;
    if (filters.minDiscount) count++;
    if (filters.inStock) count++;
    return count;
  }, [filters]);

  const title = useMemo(() => {
    if (mode === 'search') return `Results for "${searchTerm || ''}"`;
    if (mode === 'category') {
      const cat = categories.find((c) => c.slug === slug);
      return cat?.name || slug?.replace(/-/g, ' ') || 'Shop';
    }
    if (mode === 'brand') return getBrandBySlug(slug)?.name || slug || 'Brand';
    return 'All Products';
  }, [mode, slug, searchTerm, categories]);

  const heading = typeof title === 'string' ? title.replace(/\b\w/g, (c) => c.toUpperCase()) : title;

  const renderFacetSection = (key: ArrayKey, sectionTitle: string, values: FacetValue[]) => {
    if (!values || values.length === 0) return null;
    const isOpen = openSections[key] !== false;
    return (
      <div className="filter-section" key={key}>
        <button type="button" className="filter-section-head" onClick={() => setOpenSections((p) => ({ ...p, [key]: !isOpen }))}>
          <span>{sectionTitle}</span>
          <ChevronDown size={16} className={`filter-chevron ${isOpen ? 'open' : ''}`} />
        </button>
        {isOpen && (
          <div className="filter-section-body">
            {values.map((v) => (
              <label key={v.value} className="filter-option">
                <input type="checkbox" checked={filters[key].includes(v.value)} onChange={() => toggleArray(key, v.value)} />
                <span className="filter-option-label">{v.value}</span>
                <span className="filter-option-count">({v.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const pagination = useMemo(() => {
    if (!result) return [] as number[];
    const pages: number[] = [];
    const { page, totalPages } = result;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [result]);

  return (
    <>
      <SEO
        title={mode === 'search' ? `Search: ${searchTerm}` : `${heading} - Shop`}
        description={`Browse ${heading} at GM Business Solutions. Filter by brand, price, rating and more. Fast delivery across Kenya.`}
        path={mode === 'category' ? `/category/${slug}` : mode === 'brand' ? `/brand/${slug}` : mode === 'search' ? `/search` : '/shop'}
        type="website"
      />

      <div className="catalog-page">
        <div className="container">
          <div className="catalog-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span className="current">{heading}</span>
          </div>

          {mode === 'all' && (
            <>
              <CategoryTilesNav />
              <BrandStrip />
            </>
          )}

          <div className="catalog-layout">
            <aside className={`catalog-sidebar ${showFilters ? 'open' : ''}`}>
              <div className="catalog-sidebar-head">
                <span>Filters {activeCount > 0 && <em>({activeCount})</em>}</span>
                <div className="catalog-sidebar-actions">
                  {activeCount > 0 && <button type="button" onClick={clearAll} className="filter-clear">Clear all</button>}
                  <button type="button" className="filter-close" onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={18} /></button>
                </div>
              </div>

              <div className="filter-section">
                <button type="button" className="filter-section-head" onClick={() => setOpenSections((p) => ({ ...p, category: p.category === false }))}>
                  <span>Category</span>
                  <ChevronDown size={16} className={`filter-chevron ${openSections.category !== false ? 'open' : ''}`} />
                </button>
                {openSections.category !== false && (
                  <div className="filter-section-body">
                    {categories.map((cat) => (
                      <label key={cat.categoryId} className="filter-option">
                        <input type="checkbox" checked={filters.category.includes(cat.slug)} onChange={() => toggleArray('category', cat.slug)} />
                        <span className="filter-option-label">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {FACET_SECTIONS.map((section) =>
                renderFacetSection(section.key, section.title, (facets?.[section.dataKey] as FacetValue[]) || [])
              )}

              <div className="filter-section">
                <button type="button" className="filter-section-head" onClick={() => setOpenSections((p) => ({ ...p, price: p.price === false }))}>
                  <span>Price (KSh)</span>
                  <ChevronDown size={16} className={`filter-chevron ${openSections.price !== false ? 'open' : ''}`} />
                </button>
                {openSections.price !== false && (
                  <div className="filter-section-body">
                    {facets && facets.priceMax > 0 && (
                      <p className="filter-price-range">Range: KSh {facets.priceMin.toLocaleString()} - {facets.priceMax.toLocaleString()}</p>
                    )}
                    <div className="filter-price-inputs">
                      <input type="number" placeholder="Min" value={priceInputs.min} onChange={(e) => setPriceInputs((p) => ({ ...p, min: e.target.value }))} />
                      <span>-</span>
                      <input type="number" placeholder="Max" value={priceInputs.max} onChange={(e) => setPriceInputs((p) => ({ ...p, max: e.target.value }))} />
                    </div>
                    <button type="button" className="filter-apply" onClick={() => setScalar({ minPrice: priceInputs.min, maxPrice: priceInputs.max })}>Apply</button>
                  </div>
                )}
              </div>

              <div className="filter-section">
                <div className="filter-section-head static"><span>Discount Percentage</span></div>
                <div className="filter-section-body">
                  {DISCOUNTS.map((d) => (
                    <label key={d} className="filter-option">
                      <input type="radio" name="discount" checked={filters.minDiscount === String(d)} onChange={() => setScalar({ minDiscount: String(d) })} />
                      <span className="filter-option-label">{d}% or more</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-section-head static"><span>Product Rating</span></div>
                <div className="filter-section-body">
                  {[4, 3, 2, 1].map((r) => (
                    <label key={r} className="filter-option">
                      <input type="radio" name="rating" checked={filters.minRating === String(r)} onChange={() => setScalar({ minRating: String(r) })} />
                      <span className="filter-stars">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={12} className={i <= r ? 'filled' : ''} fill={i <= r ? 'currentColor' : 'none'} />
                        ))}
                      </span>
                      <span className="filter-option-label">&amp; above</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-section-head static"><span>Availability</span></div>
                <div className="filter-section-body">
                  <label className="filter-option">
                    <input type="checkbox" checked={filters.inStock} onChange={(e) => setScalar({ inStock: e.target.checked })} />
                    <span className="filter-option-label">In stock only</span>
                  </label>
                </div>
              </div>
            </aside>

            {showFilters && <div className="catalog-sidebar-backdrop" onClick={() => setShowFilters(false)} />}

            <main className="catalog-main">
              <div className="catalog-toolbar">
                <div className="catalog-toolbar-left">
                  <button type="button" className="catalog-filter-btn" onClick={() => setShowFilters(true)}>
                    <SlidersHorizontal size={16} /> Filters {activeCount > 0 && <span className="catalog-filter-badge">{activeCount}</span>}
                  </button>
                  <h1 className="catalog-heading">{heading}</h1>
                  {result && <span className="catalog-count">({result.total.toLocaleString()} products found)</span>}
                </div>
                <div className="catalog-sort">
                  <label htmlFor="sort">Sort by:</label>
                  <select id="sort" value={filters.sort} onChange={(e) => setScalar({ sort: e.target.value })}>
                    {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              {loading ? (
                <ProductGridSkeleton count={12} />
              ) : !result || result.products.length === 0 ? (
                <div className="catalog-empty">
                  <p className="catalog-empty-title">No products found</p>
                  <p>Try removing some filters or searching for something else.</p>
                  {activeCount > 0 && <button type="button" className="filter-apply" onClick={clearAll}>Clear all filters</button>}
                </div>
              ) : (
                <>
                  <div className="catalog-grid">
                    {result.products.map((p) => (
                      <ProductCard
                        key={p.productId}
                        product={p}
                        showWishlist={true}
                        isWishlisted={wishlistStatus[p.productId] || false}
                        onWishlistToggle={handleWishlistToggle}
                      />
                    ))}
                  </div>

                  {result.totalPages > 1 && (
                    <div className="catalog-pagination">
                      <button type="button" disabled={result.page <= 1} onClick={() => setScalar({ page: result.page - 1 })}>Prev</button>
                      {pagination[0] > 1 && <span className="page-ellipsis">...</span>}
                      {pagination.map((pageNum) => (
                        <button
                          type="button"
                          key={pageNum}
                          className={pageNum === result.page ? 'active' : ''}
                          onClick={() => setScalar({ page: pageNum })}
                        >
                          {pageNum}
                        </button>
                      ))}
                      {pagination[pagination.length - 1] < result.totalPages && <span className="page-ellipsis">...</span>}
                      <button type="button" disabled={result.page >= result.totalPages} onClick={() => setScalar({ page: result.page + 1 })}>Next</button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
