import { Link } from 'react-router-dom';
import { CATEGORY_TILES } from '../../config/categoryTiles';
import './Catalog.css';

interface CategoryTilesNavProps {
  title?: string;
}

export default function CategoryTilesNav({ title = 'Shop by Category' }: CategoryTilesNavProps) {
  return (
    <section className="cat-tiles">
      <div className="cat-tiles-head">
        <h2 className="cat-tiles-title">{title}</h2>
      </div>
      <div className="cat-tiles-grid">
        {CATEGORY_TILES.map((tile) => (
          <Link key={tile.name} to={tile.to} className="cat-tile">
            <span className="cat-tile-image" style={{ background: tile.bg }}>{tile.emoji}</span>
            <span className="cat-tile-name">{tile.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
