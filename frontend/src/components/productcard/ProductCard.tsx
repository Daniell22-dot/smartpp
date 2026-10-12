import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../../Features/products/productsAPI';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (productId: number) => void;
}

export default function ProductCard({
  product,
  showWishlist = false,
  isWishlisted = false,
  onWishlistToggle
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.status === 'out_of_stock' || product.stock <= 0;
  const price = parseFloat(product.price);
  const comparePrice = product.comparePrice ? parseFloat(product.comparePrice) : 0;
  const discount = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const rating = product.rating ? parseFloat(product.rating) : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(product.productId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card-image-wrap">
        {product.featuredPhoto ? (
          <img src={product.featuredPhoto} alt={product.name} className="product-card-image" />
        ) : (
          <div className="product-card-placeholder"><span className="product-card-placeholder-text">No image</span></div>
        )}

        {discount > 0 && <span className="product-card-badge">-{discount}%</span>}

        {showWishlist && (
          <button
            className={`product-card-wishlist ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        {product.brand && <p className="product-card-brand">{product.brand}</p>}

        {rating > 0 && (
          <div className="product-card-rating">
            <span className="product-card-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} className={i <= Math.round(rating) ? 'filled' : ''} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} />
              ))}
            </span>
            <span className="product-card-review-count">({product.reviewCount})</span>
          </div>
        )}

        <div className="product-card-price-row">
          <p className="product-card-price">KSh {price.toLocaleString()}</p>
          {discount > 0 && <p className="product-card-old-price">KSh {comparePrice.toLocaleString()}</p>}
        </div>

        {isOutOfStock ? (
          <span className="product-card-outofstock">Out of Stock</span>
        ) : (
          <button className="product-card-add" onClick={handleAddToCart}>
            <ShoppingCart size={15} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        )}
      </div>
    </Link>
  );
}
