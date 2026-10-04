import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Highlights from '../components/home/Highlights';
import Categories from '../components/home/Categories';
import Products from '../components/home/Products';
import BestSellers from '../components/home/BestSellers';
import SEO from '../components/seo/SEO';

export default function HomePage() {
  return (
    <>
      <SEO
        title="GM Business Solutions"
        description="Shop smartphones, laptops, audio devices, solar products, and more at GM Business Solutions. Fast delivery across Kenya, M-Pesa payments, and excellent customer service."
        path="/"
        type="website"
      />
      <Layout>
        <Hero />
        <Categories />
        <Products />
        <Highlights />
        <BestSellers />
      </Layout>
    </>
  );
}