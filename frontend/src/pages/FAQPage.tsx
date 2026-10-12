import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InfoPage from '../components/common/InfoPage';

const FAQS = [
  {
    q: 'How do I place an order?',
    a: 'Browse or search for a product, add it to your cart, then proceed to checkout. Enter your delivery details and choose a payment method (M-PESA, Airtel Money, or card). You will receive an order confirmation by email and SMS.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept M-PESA, Airtel Money, and major debit/credit cards via secure payment partners. All transactions are encrypted and processed securely.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders within Nairobi are typically delivered within 24 hours. Deliveries to other towns in Kenya take 1–3 business days depending on your location.',
  },
  {
    q: 'Can I return a product?',
    a: 'Yes. If you receive a defective or incorrect item, you may request a return within 7 days of delivery, provided the item is in its original packaging. Free returns are available for eligible items.',
  },
  {
    q: 'Are your products genuine?',
    a: 'Absolutely. We source from authorized distributors and every product carries the stated manufacturer warranty. Warranty details are shown on the product page.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is shipped you will receive tracking updates by SMS and email. You can also track your order anytime from the Track Order page.',
  },
  {
    q: 'Do you offer bulk or corporate orders?',
    a: 'Yes. We supply organizations and resellers at discounted rates. Visit our Corporate & Bulk Orders page or contact us for a tailored quote.',
  },
  {
    q: 'How do I contact customer support?',
    a: 'You can reach us via the Help button on any page, WhatsApp, phone, or email. Our support team responds within business hours (Mon–Sat, 8am–6pm).',
  },
];

export default function FAQPage() {
  return (
    <Layout>
      <InfoPage
        title="Help Center & FAQ"
        subtitle="Answers to the most common questions about ordering, payment, delivery, warranty and returns."
        path="/faq"
      >
        <section className="info-section">
          <h2>Frequently Asked Questions</h2>
          {FAQS.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </section>

        <section className="info-section">
          <h2>Still need help?</h2>
          <p>
            Our team is happy to assist. Reach out via the floating Help button, email us at{' '}
            <a href="mailto:info@smartp.co.ke">info@smartp.co.ke</a>, or use our{' '}
            <Link to="/account?tab=support">contact form</Link>. You can also review our{' '}
            <Link to="/how-to-order">How to Order</Link> guide.
          </p>
        </section>
      </InfoPage>
    </Layout>
  );
}
