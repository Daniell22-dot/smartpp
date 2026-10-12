import { useState } from 'react';
import Layout from '../components/layout/Layout';
import InfoPage from '../components/common/InfoPage';

export default function CorporatePage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ company: '', contact: '', email: '', phone: '', needs: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ company: '', contact: '', email: '', phone: '', needs: '' });
  };

  return (
    <Layout>
      <InfoPage
        title="Corporate & Bulk Orders"
        subtitle="Special pricing, dedicated account management and priority delivery for businesses, schools, NGOs and resellers."
        path="/corporate"
      >
        <section className="info-section">
          <h2>Why buy from us</h2>
          <ul className="info-list">
            <li>Volume discounts on bulk purchases of phones, laptops, accessories and smart devices.</li>
            <li>Dedicated account manager for your organisation.</li>
            <li>Priority processing and scheduled deliveries.</li>
            <li>Official invoices, LPO support and flexible payment terms.</li>
            <li>Genuine products with full manufacturer warranty.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Request a quote</h2>
          <p>Tell us what you need and our corporate team will get back to you within one business day.</p>
          {sent ? (
            <div className="info-success">
              Thank you! Your request has been received. Our corporate team will contact you shortly.
            </div>
          ) : (
            <form className="info-form" onSubmit={handleSubmit}>
              <div className="info-form-row">
                <div className="info-field">
                  <label>Company / Organisation</label>
                  <input name="company" value={form.company} onChange={handleChange} required placeholder="e.g. Acme Ltd" />
                </div>
                <div className="info-field">
                  <label>Contact person</label>
                  <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Full name" />
                </div>
              </div>
              <div className="info-form-row">
                <div className="info-field">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" />
                </div>
                <div className="info-field">
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="07xx xxx xxx" />
                </div>
              </div>
              <div className="info-field">
                <label>What do you need?</label>
                <textarea name="needs" value={form.needs} onChange={handleChange} rows={4} required placeholder="List the products and quantities you are interested in" />
              </div>
              <button type="submit" className="info-cta">Submit request</button>
            </form>
          )}
        </section>
      </InfoPage>
    </Layout>
  );
}
