import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookieConsent'));

  if (!visible) return null;

  const decide = (choice: string) => {
    localStorage.setItem('cookieConsent', choice);
    setVisible(false);
  };

  return (
    <div className="cookie-banner">
      <div className="container cookie-inner">
        <p className="cookie-text">
          We use cookies to improve your shopping experience, remember your preferences and show
          relevant content. By continuing you agree to our <Link to="/privacy-policy">cookie policy</Link>.
        </p>
        <div className="cookie-actions">
          <button type="button" className="cookie-btn ghost" onClick={() => decide('declined')}>
            Decline
          </button>
          <button type="button" className="cookie-btn" onClick={() => decide('accepted')}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
