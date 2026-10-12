import Layout from '../components/layout/Layout';
import Catalog from '../components/catalog/Catalog';

export default function ShopPage() {
  return (
    <Layout>
      <Catalog mode="all" />
    </Layout>
  );
}
