import Layout from '../components/layout/Layout';
import ShopContent from '../components/shop/ShopContent';
import SEO from '../components/seo/SEO';

export default function ShopPage() {
  return (
    <>
      <SEO
        title="Shop All Products"
        description="Browse our full catalog of electronics, smartphones, laptops, audio devices, and more. Free delivery on orders over KSh 600."
        path="/shop"
        type="website"
      />
      <Layout>
        <ShopContent />
      </Layout>
    </>
  );
}