import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../productcard/ProductCard';
import { getRecentlyViewed } from '../../Features/products/recentlyViewed';
import type { Product } from '../../Features/products/productsAPI';
import './RecentlyViewed.css';

interface RecentlyViewedProps {
  excludeId?: number;
  title?: string;
}

export default function RecentlyViewed({ excludeId, title = 'Recently Viewed' }: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const list = getRecentlyViewed().filter((p) => p.productId !== excludeId);
    setProducts(list.slice(0, 8));
  }, [excludeId]);

  if (products.length === 0) return null;

  return (
    <section className="recently-viewed">
      <div className="container">
        <div className="recently-viewed-head">
          <h2 className="recently-viewed-title">{title}</h2>
          <Link to="/shop" className="recently-viewed-all">Browse all products →</Link>
        </div>
        <div className="recently-viewed-grid">
          {products.map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
