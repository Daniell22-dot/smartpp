import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock } from 'lucide-react';
import ProductCard from '../productcard/ProductCard';
import { productsAPI, type Product } from '../../Features/products/productsAPI';
import './Deals.css';

const FLASH_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function Deals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const progressRef = useRef(0);

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

    const timer = setInterval(() => {
      setElapsed((e) => Math.min(e + 1000, FLASH_DURATION_MS));
    }, 1000);
    progressRef.current = timer;

    fetchDeals();

    return () => clearInterval(progressRef.current);
  }, []);

  const remaining = Math.max(0, FLASH_DURATION_MS - elapsed);
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="deals-section" id="deals">
      <div className="container">
        <div className="deals-header">
          <div className="deals-progress-bar">
            <div
              className="deals-progress-fill"
              style={{ width: `${(100 * elapsed) / FLASH_DURATION_MS}%` }}
            />
          </div>
          <div className="deals-heading">
            <span className="deals-title-badge">
              <Zap size={16} /> Flash Sale
            </span>
            <h2 className="deals-title">Today's Best Deals</h2>
          </div>
          <div className="deals-timer">
            <Clock size={14} /> ends in {hours}h {minutes}m {seconds}s
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