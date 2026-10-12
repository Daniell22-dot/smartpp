import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, X, MessageCircle, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import './HelpButton.css';

export default function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="help-widget">
      {open && (
        <div className="help-panel">
          <div className="help-panel-head">
            <span>Need help?</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close help">
              <X size={16} />
            </button>
          </div>
          <Link to="/how-to-order" className="help-item" onClick={() => setOpen(false)}>
            <Truck size={16} /> How to order
          </Link>
          <Link to="/faq" className="help-item" onClick={() => setOpen(false)}>
            <HelpCircle size={16} /> Help Center / FAQ
          </Link>
          <Link to="/track-order" className="help-item" onClick={() => setOpen(false)}>
            <RotateCcw size={16} /> Track order &amp; returns
          </Link>
          <Link to="/report-product" className="help-item" onClick={() => setOpen(false)}>
            <ShieldCheck size={16} /> Report a product
          </Link>
          <Link to="/account?tab=support" className="help-item" onClick={() => setOpen(false)}>
            <MessageCircle size={16} /> Contact support
          </Link>
        </div>
      )}
      <button
        type="button"
        className="help-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Help"
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <HelpCircle size={22} />}
      </button>
    </div>
  );
}
