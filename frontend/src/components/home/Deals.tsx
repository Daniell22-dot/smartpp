import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import ProductCard from '../productcard/ProductCard';
import { productsAPI, type Product } from '../../Features/products/productsAPI';
import './Deals.css';

export default function Deals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const res = await productsAPI.getActive();
        if (res.success) {
          const discounted = res.data
            .filter((p) => {
              const price = parseFloat(p.price);
              const compare = p.comparePrice ? parseFloat(p.comparePrice) : 0;
              return compare > price;
            })
            .sort((a, b) => {
              const da = (parseFloat(a.comparePrice || '0') - parseFloat(a.price)) / parseFloat(a.comparePrice || '1');
              const db = (parseFloat(b.comparePrice || '0') - parseFloat(b.price)) / parseFloat(b.comparePrice || '1');
              return db - da;
            })
            .slice(0, 8);
          setProducts(discounted);
        }
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="deals-section" id="deals">
      <div className="container">
        <div className="deals-header">
          <div className="deals-heading">
            <span className="deals-title-badge">
              <Zap size={16} /> Flash Sale
            </span>
            <h2 className="deals-title">Today's Best Deals</h2>
          </div>
          <Link to="/shop" className="deals-view-all">View All →</Link>
        </div>
        <div className="deals-grid">
          {products.map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
