import { useState } from 'react';
import Layout from '../components/layout/Layout';
import InfoPage from '../components/common/InfoPage';

export default function ReportProductPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ product: '', link: '', issue: '', details: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ product: '', link: '', issue: '', details: '', email: '' });
  };

  return (
    <Layout>
      <InfoPage
        title="Report a Product"
        subtitle="Help us keep the marketplace safe and accurate. Report incorrect listings, counterfeit items or suspicious sellers."
        path="/report-product"
      >
        <section className="info-section">
          <h2>What you can report</h2>
          <ul className="info-list">
            <li>Incorrect product information, pricing or images.</li>
            <li>Suspected counterfeit or fake products.</li>
            <li>Prohibited or restricted items.</li>
            <li>Misleading descriptions or misleading sellers.</li>
            <li>Stock or availability issues.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Submit a report</h2>
          <p>Your report is confidential. Our team reviews every submission and takes appropriate action.</p>
          {sent ? (
            <div className="info-success">
              Thank you for your report. Our marketplace team will review it and take action where necessary.
            </div>
          ) : (
            <form className="info-form" onSubmit={handleSubmit}>
              <div className="info-field">
                <label>Product name</label>
                <input name="product" value={form.product} onChange={handleChange} required placeholder="Name of the product" />
              </div>
              <div className="info-field">
                <label>Product link (optional)</label>
                <input name="link" value={form.link} onChange={handleChange} placeholder="Paste the product URL" />
              </div>
              <div className="info-field">
                <label>Type of issue</label>
                <select name="issue" value={form.issue} onChange={handleChange} required>
                  <option value="">Select an issue</option>
                  <option value="incorrect-info">Incorrect product information</option>
                  <option value="counterfeit">Suspected counterfeit</option>
                  <option value="prohibited">Prohibited item</option>
                  <option value="misleading">Misleading description</option>
                  <option value="availability">Stock / availability issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="info-field">
                <label>Describe the issue</label>
                <textarea name="details" value={form.details} onChange={handleChange} rows={4} required placeholder="Tell us what you noticed" />
              </div>
              <div className="info-field">
                <label>Your email (optional)</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="So we can follow up if needed" />
              </div>
              <button type="submit" className="info-cta">Submit report</button>
            </form>
          )}
        </section>
      </InfoPage>
    </Layout>
  );
}
