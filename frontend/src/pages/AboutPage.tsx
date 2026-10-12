import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Headphones, BadgeCheck } from 'lucide-react';
import Layout from '../components/layout/Layout';
import InfoPage from '../components/common/InfoPage';

export default function AboutPage() {
  return (
    <Layout>
      <InfoPage
        title="About Us"
        subtitle="GM Business Solutions is a Kenyan technology marketplace delivering genuine devices, accessories and services nationwide."
        path="/about"
      >
        <section className="info-section">
          <h2>Who we are</h2>
          <p>
            GM Business Solutions (SMARTP) is your trusted online store for smartphones, laptops, audio
            devices, smart gadgets and professional tech services. We combine a curated marketplace with
            fast, reliable delivery across Kenya and a strong focus on genuine products and outstanding
            customer care.
          </p>
          <p>
            From students and professionals to businesses and institutions, thousands of customers rely on
            us for the right device at the right price — backed by real warranty and human support.
          </p>
        </section>

        <section className="info-section">
          <h2>What we stand for</h2>
          <ul className="info-list">
            <li><strong>Genuine products.</strong> Sourced from authorized distributors with full warranty.</li>
            <li><strong>Fair prices.</strong> Competitive pricing and frequent deals on top brands.</li>
            <li><strong>Fast delivery.</strong> Same-day options in Nairobi and swift countrywide shipping.</li>
            <li><strong>Real support.</strong> Friendly humans ready to help before and after you buy.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Why shop with us</h2>
          <div className="info-steps">
            <div className="info-step">
              <ShieldCheck size={22} color="#16a34a" />
              <div>
                <div className="info-step-title">Secure payments</div>
                <div className="info-step-text">M-PESA, Airtel Money and cards, all processed securely.</div>
              </div>
            </div>
            <div className="info-step">
              <Truck size={22} color="#16a34a" />
              <div>
                <div className="info-step-title">Reliable delivery</div>
                <div className="info-step-text">Fast dispatch with door delivery or pickup.</div>
              </div>
            </div>
            <div className="info-step">
              <BadgeCheck size={22} color="#16a34a" />
              <div>
                <div className="info-step-title">Warranty & returns</div>
                <div className="info-step-text">Manufacturer warranty and a 7-day return window.</div>
              </div>
            </div>
            <div className="info-step">
              <Headphones size={22} color="#16a34a" />
              <div>
                <div className="info-step-title">Dedicated support</div>
                <div className="info-step-text">Reach us by phone, email, WhatsApp or live chat.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Get in touch</h2>
          <p>
            Have a question or a bulk request? Visit our <Link to="/corporate">Corporate &amp; Bulk Orders</Link>{' '}
            page, browse the <Link to="/faq">Help Center</Link>, or <Link to="/account?tab=support">contact us</Link>.
          </p>
        </section>
      </InfoPage>
    </Layout>
  );
}
