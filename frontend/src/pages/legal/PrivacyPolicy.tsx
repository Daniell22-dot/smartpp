import Layout from '../components/layout/Layout';
import SEO from '../components/seo/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how GM Business Solutions collects, uses, and protects your personal information."
        path="/privacy-policy"
        type="website"
      />
      <Layout>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          <h1>Privacy Policy</h1>
          <p><strong>Last updated:</strong> October 4, 2026</p>
          
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Account information: name, email, phone number, password</li>
            <li>Order information: shipping address, billing address, payment details</li>
            <li>Communication preferences and support interactions</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfill orders</li>
            <li>Send order confirmations and updates</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li>Payment processors (M-Pesa, etc.) to process payments</li>
            <li>Shipping partners to deliver orders</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at:</p>
          <p>Email: info@gmnex.com<br/>
          Phone: 0712 345 678<br/>
          Address: Nairobi, Kenya</p>
        </div>
      </Layout>
    </>
  );
}