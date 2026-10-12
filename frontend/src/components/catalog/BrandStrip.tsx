import { Link } from 'react-router-dom';
import { BRANDS, type BrandGroup } from '../../config/brands';
import './Catalog.css';

interface BrandStripProps {
  group?: BrandGroup;
  title?: string;
}

export default function BrandStrip({ group, title = 'Shop by Brand' }: BrandStripProps) {
  const list = group ? BRANDS.filter((b) => b.group === group) : BRANDS;

  return (
    <section className="brand-strip">
      <div className="brand-strip-head">
        <h2 className="brand-strip-title">{title}</h2>
        <Link to="/shop" className="brand-strip-all">See all</Link>
      </div>
      <div className="brand-strip-scroll">
        {list.map((brand) => (
          <Link
            key={brand.slug}
            to={`/brand/${brand.slug}`}
            className="brand-tile"
            style={{ background: brand.bg }}
            title={`Shop ${brand.name}`}
          >
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="brand-tile-logo" />
            ) : (
              <span className="brand-tile-name" style={{ color: brand.color }}>{brand.name}</span>
            )}
            <span className="brand-tile-sub" style={{ color: brand.color }}>Shop now</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
