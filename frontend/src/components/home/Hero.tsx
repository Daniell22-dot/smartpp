import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, ChevronRight, ShieldCheck, Truck, Smartphone } from 'lucide-react';
import { categoriesAPI, type Category } from '../../Features/categories/categoriesAPI';
import './Hero.css';

const BANNERS = [
  {
    title: 'Your Trusted Smart Device Partner',
    sub: '100% genuine smartphones, accessories and services at the best prices in Kenya.',
    cta: 'Shop Now',
    to: '/shop',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
  },
  {
    title: 'Flash Deals Are Live',
    sub: 'Save up to 40% on selected phones, laptops and accessories. Limited stock!',
    cta: 'View Deals',
    to: '/shop',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
  },
  {
    title: 'Pay Easily with M-Pesa',
    sub: 'Secure checkout and fast nationwide delivery straight to your door.',
    cta: 'Start Shopping',
    to: '/shop',
    gradient: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
  },
];

const TILES = [
  { title: '100% Genuine', text: 'Authentic products only', icon: ShieldCheck, to: '/shop', cls: 'hero-tile-green' },
  { title: 'Fast Delivery', text: 'Nationwide shipping', icon: Truck, to: '/shop', cls: 'hero-tile-orange' },
  { title: 'Smart Devices', text: 'Phones, laptops & more', icon: Smartphone, to: '/shop', cls: 'hero-tile-dark' },
];

export default function Hero() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    categoriesAPI.getActive()
      .then((res) => { if (res.success) setCategories(res.data.slice(0, 9)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % BANNERS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[slide];

  return (
    <section className="hero-market">
      <div className="container">
        <div className="hero-market-inner">
          <aside className="hero-cats">
            <div className="hero-cats-head">
              <LayoutGrid size={16} /> <span>All Categories</span>
            </div>
            <ul className="hero-cats-list">
              {categories.length === 0 ? (
                <li className="hero-cats-empty">Loading categories...</li>
              ) : (
                categories.map((cat) => (
                  <li key={cat.categoryId}>
                    <Link to={`/category/${cat.slug}`} className="hero-cat-link">
                      {cat.photo ? (
                        <img src={cat.photo} alt={cat.name} className="hero-cat-img" />
                      ) : (
                        <span className="hero-cat-icon">{cat.icon || '📁'}</span>
                      )}
                      <span className="hero-cat-name">{cat.name}</span>
                      <ChevronRight size={14} className="hero-cat-arrow" />
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </aside>

          <div className="hero-banner" style={{ background: banner.gradient }}>
            <h1 className="hero-banner-title">{banner.title}</h1>
            <p className="hero-banner-sub">{banner.sub}</p>
            <Link to={banner.to} className="hero-banner-btn">{banner.cta}</Link>
            <div className="hero-banner-dots">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hero-banner-dot ${i === slide ? 'active' : ''}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hero-tiles">
            {TILES.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link key={tile.title} to={tile.to} className={`hero-tile ${tile.cls}`}>
                  <span className="hero-tile-icon"><Icon size={20} /></span>
                  <span className="hero-tile-body">
                    <span className="hero-tile-title">{tile.title}</span>
                    <span className="hero-tile-text">{tile.text}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
