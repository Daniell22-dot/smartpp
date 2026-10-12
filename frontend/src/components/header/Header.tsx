import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Heart, Menu, X, LogOut, Search, TrendingUp } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { categoriesAPI, type Category } from "../../Features/categories/categoriesAPI";
import { productsAPI, type Product } from "../../Features/products/productsAPI";
import { BRANDS } from "../../config/brands";
import AnnouncementBar from "../announcement/AnnouncementBar";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { isAuthenticated, user, loading, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trending, setTrending] = useState<Product[]>([]);
  const [showTrending, setShowTrending] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff')) {
    return null;
  }

  useEffect(() => {
    categoriesAPI.getActive().then((res) => {
      if (res.success) setCategories(res.data);
    }).catch(console.error);
    productsAPI.getTrending(8).then((res) => {
      if (res.success) setTrending(res.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
        setShowTrending(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      setShowTrending(false);
      setIsSearching(true);
      productsAPI.search(query.trim())
        .then((res) => {
          if (res.success) {
            setSearchResults(res.data.slice(0, 6));
            setShowSearchResults(true);
          }
          setIsSearching(false);
        })
        .catch(() => {
          setIsSearching(false);
        });
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const goToSearch = (term: string) => {
    const q = term.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setShowSearchResults(false);
    setShowTrending(false);
    setSearchQuery("");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ((e as React.KeyboardEvent).key === "Enter" || (e as React.MouseEvent).type === "click") {
      goToSearch(searchQuery);
    }
  };

  const handleSearchResultClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      localStorage.clear();
      window.location.replace("/");
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Services', path: '/category/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/account?tab=support' },
  ];

  if (loading) {
    return (
      <div>
        <AnnouncementBar />
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="left-section">
                <Link to="/" className="logo"><img src="/2.png" alt="SMARTP" className="logo-image" /></Link>
              </div>
              <div className="right-section">
                <div className="loading-placeholder">Loading...</div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="left-section">
              <button
                className="menu-btn"
                onClick={() => setMegaMenuOpen((o) => !o)}
                aria-label="Open menu"
                aria-expanded={megaMenuOpen}
              >
                {megaMenuOpen ? <X size={22} /> : <Menu size={22} />}
                <span className="menu-btn-label">Menu</span>
              </button>
              <Link to="/" className="logo"><img src="/2.png" alt="SMARTP" className="logo-image" /></Link>
            </div>

            <div className="header-search" ref={searchRef}>
              <div className="search-bar-wrapper">
                <Search size={18} className="search-bar-icon" />
                <input
                  type="text"
                  placeholder="Search for phones, laptops, accessories..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearch}
                  className="search-bar-input"
                  onFocus={() => {
                    if (searchQuery.trim().length > 0 && searchResults.length > 0) {
                      setShowSearchResults(true);
                      setShowTrending(false);
                    } else if (searchQuery.trim().length === 0 && trending.length > 0) {
                      setShowTrending(true);
                    }
                  }}
                />
                <button className="search-bar-btn" onClick={handleSearch}>Search</button>
              </div>

              {showSearchResults && (
                <div className="search-results-dropdown">
                  {isSearching ? (
                    <div className="search-loading">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <div
                          key={product.productId}
                          className="search-result-item"
                          onClick={() => handleSearchResultClick(product.slug)}
                        >
                          <div className="search-result-image">
                            {product.featuredPhoto ? (
                              <img src={product.featuredPhoto} alt={product.name} />
                            ) : (
                              <span>📦</span>
                            )}
                          </div>
                          <div className="search-result-info">
                            <span className="search-result-name">{product.name}</span>
                            <span className="search-result-price">KSh {parseFloat(product.price).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                      <div className="search-result-view-all">
                        <button onClick={() => goToSearch(searchQuery)}>
                          View all results →
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="search-no-results">No products found</div>
                  )}
                </div>
              )}

              {showTrending && !showSearchResults && trending.length > 0 && (
                <div className="search-results-dropdown">
                  <div className="search-trending-title"><TrendingUp size={14} /> Trending searches</div>
                  {trending.map((product) => (
                    <div
                      key={product.productId}
                      className="search-result-item"
                      onClick={() => goToSearch(product.name)}
                    >
                      <div className="search-result-image">
                        {product.featuredPhoto ? (
                          <img src={product.featuredPhoto} alt={product.name} />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>
                      <div className="search-result-info">
                        <span className="search-result-name">{product.name}</span>
                        <span className="search-result-price">KSh {parseFloat(product.price).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="right-section">
              {isAuthenticated ? (
                <>
                  <span className="user-greeting desktop-only">Hi, {user?.fullName || 'User'}</span>
                  <button onClick={handleLogout} className="logout-button desktop-only" aria-label="Logout">
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <Link to="/login" className="login-button desktop-only">
                  <User size={18} /><span>Login</span>
                </Link>
              )}
              
              <Link to="/account" className="icon-button desktop-only">
                <User size={20} />
              </Link>
              
              <Link to="/wishlist" className="icon-button">
                <Heart size={20} />
                {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
              </Link>
              
              <Link to="/cart" className="icon-button">
                <ShoppingCart size={20} />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </Link>
              
              <button className="mobile-menu-trigger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {megaMenuOpen && (
          <div className="mega-menu">
            <div className="container mega-menu-inner">
              <div className="mega-col">
                <h4 className="mega-col-title">Shop by Category</h4>
                {categories.map((cat) => (
                  <Link key={cat.categoryId} to={`/category/${cat.slug}`} className="mega-link" onClick={() => setMegaMenuOpen(false)}>
                    {cat.icon || '📁'} {cat.name}
                  </Link>
                ))}
              </div>
              <div className="mega-col">
                <h4 className="mega-col-title">Top Brands</h4>
                {BRANDS.slice(0, 12).map((brand) => (
                  <Link key={brand.slug} to={`/brand/${brand.slug}`} className="mega-link" onClick={() => setMegaMenuOpen(false)}>
                    {brand.name}
                  </Link>
                ))}
              </div>
              <div className="mega-col">
                <h4 className="mega-col-title">Help &amp; Info</h4>
                <Link to="/how-to-order" className="mega-link" onClick={() => setMegaMenuOpen(false)}>How to Order</Link>
                <Link to="/faq" className="mega-link" onClick={() => setMegaMenuOpen(false)}>Help Center / FAQ</Link>
                <Link to="/corporate" className="mega-link" onClick={() => setMegaMenuOpen(false)}>Corporate &amp; Bulk Orders</Link>
                <Link to="/report-product" className="mega-link" onClick={() => setMegaMenuOpen(false)}>Report a Product</Link>
                <Link to="/about" className="mega-link" onClick={() => setMegaMenuOpen(false)}>About Us</Link>
                <Link to="/account?tab=support" className="mega-link" onClick={() => setMegaMenuOpen(false)}>Contact Us</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {megaMenuOpen && <div className="mega-menu-overlay" onClick={() => setMegaMenuOpen(false)} />}

      <div className="category-bar">
        <div className="container">
          <nav className="category-bar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`category-bar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <span className="category-bar-divider" />
            {categories.map((cat) => (
              <Link key={cat.categoryId} to={`/category/${cat.slug}`} className="category-bar-link">
                {cat.name}
              </Link>
            ))}
          </nav>
          <Link to="/shop" className="category-bar-deals">Deals</Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}><img src="/2.png" alt="SMARTP" className="logo-image" /></Link>
            <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div className="mobile-divider" />
            <p className="mobile-nav-title">Categories</p>
            {categories.map((cat) => (
              <Link key={cat.categoryId} to={`/category/${cat.slug}`} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                {cat.photo ? (
                  <span className="mobile-category-image-wrapper">
                    <img src={cat.photo} alt={cat.name} className="mobile-category-image" />
                  </span>
                ) : (
                  <span>{cat.icon || '📁'}</span>
                )}
                {cat.name}
              </Link>
            ))}
            <div className="mobile-divider" />
            {isAuthenticated ? (
              <>
                <span className="mobile-user">Hi, {user?.fullName}</span>
                <button onClick={handleLogout} className="mobile-nav-link logout-btn">Logout</button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
            <Link to="/account" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
            <Link to="/wishlist" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
          </nav>
        </div>
      )}
    </>
  );
}