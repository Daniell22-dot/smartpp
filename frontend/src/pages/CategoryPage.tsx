import Layout from '../components/layout/Layout';
import CategoryContent from '../components/category/CategoryContent';
import SEO from '../components/seo/SEO';

export default function CategoryPage() {
  return (
    <>
      <SEO
        title="Shop by Category"
        description="Browse products by category at GM Business Solutions. Find the best electronics, smartphones, laptops, and more."
        path="/category"
        type="website"
      />
      <Layout>
        <CategoryContent />
      </Layout>
    </>
  );
}