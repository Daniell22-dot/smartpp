import Layout from '../components/layout/Layout';
import SEO from '../components/seo/SEO';

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms and conditions for using GM Business Solutions services."
        path="/terms-of-service"
        type="website"
      />
      <Layout>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          <h1>Terms of Service</h1>
          <p><strong>Last updated:</strong> October 4, 2026</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using GM Business Solutions ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>

          <h2>2. Use of the Service</h2>
          <p>You must be at least 18 years old to use this Service. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.</p>

          <h2>3. Orders and Payments</h2>
          <p>All orders are subject to availability. Prices are in Kenyan Shillings (KES) and include applicable taxes. Payment is processed via M-Pesa or other approved methods. We reserve the right to refuse or cancel any order at our discretion.</p>

          <h2>4. Delivery and Pickup</h2>
          <p>Delivery times are estimates and not guaranteed. Free delivery is available for orders over KSh 600 within Kenya. Pickup is available from designated stations. Risk of loss transfers to you upon delivery or pickup.</p>

          <h2>5. Returns and Refunds</h2>
          <p>We accept returns within 7 days of delivery for defective or incorrect items. Returns must be in original condition with all packaging. Refunds are processed to the original payment method within 5-10 business days.</p>

          <h2>6. Intellectual Property</h2>
          <p>All content, trademarks, and intellectual property on this Service belong to GM Business Solutions or its licensors. You may not reproduce, distribute, or create derivative works without written permission.</p>

          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, GM Business Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.</p>

          <h2>7. Governing Law</h2>
          <p>These Terms shall be governed by the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi.</p>

          <h2>8. Changes to Terms</h2>
          <p>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>

          <h2>9. Contact Us</h2>
          <p>If you have questions about these Terms, contact us at:</p>
          <p>Email: info@gmnex.com<br/>
          Phone: 0712 345 678<br/>
          Address: Nairobi, Kenya</p>
        </div>
      </Layout>
    </>
  );
}