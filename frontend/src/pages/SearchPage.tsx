import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Catalog from '../components/catalog/Catalog';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  return (
    <Layout>
      <Catalog mode="search" searchTerm={q} />
    </Layout>
  );
}
