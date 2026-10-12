import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InfoPage from '../components/common/InfoPage';

const STEPS = [
  { title: 'Find your product', text: 'Browse categories, use the top search bar, or filter by brand, price, and rating to find exactly what you need.' },
  { title: 'Add to cart', text: 'Open the product page and tap "Add to Cart". You can keep shopping and add more items to your cart.' },
  { title: 'Review your cart', text: 'Go to your cart to confirm items, quantities, and prices before checking out.' },
  { title: 'Checkout', text: 'Enter your delivery details and select your preferred payment method — M-PESA, Airtel Money, or card.' },
  { title: 'Choose delivery or pickup', text: 'Have it delivered to your doorstep or pick it up at our Nairobi location.' },
  { title: 'Receive & enjoy', text: 'Get order and shipping notifications by email and SMS, then track your order until it arrives.' },
];

export default function HowToOrderPage() {
  return (
    <Layout>
      <InfoPage
        title="How to Order"
        subtitle="Shopping with GM Business Solutions is quick, safe and convenient. Follow these simple steps."
        path="/how-to-order"
      >
        <section className="info-section">
          <h2>Order in 6 easy steps</h2>
          <div className="info-steps">
            {STEPS.map((step, i) => (
              <div className="info-step" key={step.title}>
                <div className="info-step-num">{i + 1}</div>
                <div>
                  <div className="info-step-title">{step.title}</div>
                  <div className="info-step-text">{step.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>Payment methods</h2>
          <ul className="info-list">
            <li>M-PESA — fast and secure mobile money payment.</li>
            <li>Airtel Money — pay directly from your Airtel wallet.</li>
            <li>Debit / Credit card — Visa and Mastercard accepted.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Delivery information</h2>
          <ul className="info-list">
            <li>Nairobi: same-day or next-day delivery.</li>
            <li>Other regions: 1–3 business days.</li>
            <li>Pickup available at our Nairobi pickup station.</li>
            <li>Free delivery on qualifying orders — see the cart for details.</li>
          </ul>
          <p>
            Ready to start? <Link to="/shop">Shop all products →</Link>
          </p>
        </section>
      </InfoPage>
    </Layout>
  );
}
