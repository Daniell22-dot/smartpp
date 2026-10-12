import './AnnouncementBar.css';

const MESSAGES = [
  "Welcome to SMARTP KENYA — Your Trusted Smart Device Store",
  "100% Genuine Smartphones, Laptops & Accessories at the Best Prices",
  "Order Today and Pay via M-Pesa — Fast Nationwide Delivery",
  "Free Pickup from 50+ Stations Across Kenya",
  "Latest Smart Devices, Audio & Solar Products In Stock",
  "24/7 Customer Support — Call or WhatsApp 0712 345 678",
];

export default function AnnouncementBar() {
  return (
    <div className="top-marquee">
      <div className="top-marquee-content">
        <div className="top-marquee-track">
          {MESSAGES.map((msg, index) => (
            <span key={index} className="top-marquee-msg">
              {msg}
              <span className="top-marquee-sep">✦</span>
            </span>
          ))}
          {MESSAGES.map((msg, index) => (
            <span key={`dup-${index}`} className="top-marquee-msg">
              {msg}
              <span className="top-marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
