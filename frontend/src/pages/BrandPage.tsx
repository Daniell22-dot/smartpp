import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Catalog from '../components/catalog/Catalog';

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <Layout>
      <Catalog mode="brand" slug={slug} />
    </Layout>
  );
}
