export type BrandGroup = 'phones' | 'audio' | 'laptops' | 'watches' | 'accessories';

export interface Brand {
  name: string;
  slug: string;
  group: BrandGroup;
  color: string;
  bg: string;
  logo?: string;
}

export const BRAND_GROUPS: { key: BrandGroup; label: string }[] = [
  { key: 'phones', label: 'Phones' },
  { key: 'audio', label: 'Audio' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'watches', label: 'Watches' },
  { key: 'accessories', label: 'Accessories' },
];

export const BRANDS: Brand[] = [
  { name: 'Samsung', slug: 'samsung', group: 'phones', color: '#1428a0', bg: '#eef1fd' },
  { name: 'Infinix', slug: 'infinix', group: 'phones', color: '#00a651', bg: '#e9f8ef' },
  { name: 'Tecno', slug: 'tecno', group: 'phones', color: '#0057b8', bg: '#eaf2fb' },
  { name: 'Xiaomi', slug: 'xiaomi', group: 'phones', color: '#ff6900', bg: '#fff1e6' },
  { name: 'Redmi', slug: 'redmi', group: 'phones', color: '#ff6900', bg: '#fff1e6' },
  { name: 'Itel', slug: 'itel', group: 'phones', color: '#e30613', bg: '#fdecec' },
  { name: 'Oppo', slug: 'oppo', group: 'phones', color: '#1d9a3f', bg: '#e9f7ee' },
  { name: 'Vivo', slug: 'vivo', group: 'phones', color: '#415fff', bg: '#eef1ff' },
  { name: 'Apple', slug: 'apple', group: 'phones', color: '#111111', bg: '#f2f2f2' },
  { name: 'iPhone', slug: 'iphone', group: 'phones', color: '#111111', bg: '#f2f2f2' },
  { name: 'Nokia', slug: 'nokia', group: 'phones', color: '#124191', bg: '#eaeef7' },
  { name: 'Huawei', slug: 'huawei', group: 'phones', color: '#d81e06', bg: '#fdecea' },
  { name: 'OnePlus', slug: 'oneplus', group: 'phones', color: '#eb0028', bg: '#fdecdf' },
  { name: 'Realme', slug: 'realme', group: 'phones', color: '#fbbf24', bg: '#fff8e6' },
  { name: 'Google', slug: 'google', group: 'phones', color: '#4285f4', bg: '#eaf1fe' },
  { name: 'Oraimo', slug: 'oraimo', group: 'audio', color: '#ff5a00', bg: '#fff0e6' },
  { name: 'JBL', slug: 'jbl', group: 'audio', color: '#ff6600', bg: '#fff1e6' },
  { name: 'U&i', slug: 'ui', group: 'audio', color: '#1f2937', bg: '#eef0f3' },
  { name: 'Ofia', slug: 'ofia', group: 'audio', color: '#7c3aed', bg: '#f3ecfd' },
  { name: 'Amay', slug: 'amay', group: 'audio', color: '#0ea5e9', bg: '#e8f6fe' },
  { name: 'Anker', slug: 'anker', group: 'audio', color: '#00a7e1', bg: '#e6f7fc' },
  { name: 'Sony', slug: 'sony', group: 'audio', color: '#111111', bg: '#f2f2f2' },
  { name: 'Beats', slug: 'beats', group: 'audio', color: '#e11d48', bg: '#fde8ed' },
  { name: 'Dell', slug: 'dell', group: 'laptops', color: '#007db8', bg: '#e6f3fa' },
  { name: 'HP', slug: 'hp', group: 'laptops', color: '#0096d6', bg: '#e6f6fc' },
  { name: 'Lenovo', slug: 'lenovo', group: 'laptops', color: '#e2231a', bg: '#fdecea' },
  { name: 'Asus', slug: 'asus', group: 'laptops', color: '#00539b', bg: '#e6eef7' },
  { name: 'Acer', slug: 'acer', group: 'laptops', color: '#83b81a', bg: '#f1f8e6' },
  { name: 'MSI', slug: 'msi', group: 'laptops', color: '#b91c1c', bg: '#fdeaea' },
  { name: 'AMD Ryzen', slug: 'amd-ryzen', group: 'laptops', color: '#ed1c24', bg: '#fdeaea' },
  { name: 'Intel', slug: 'intel', group: 'laptops', color: '#0068b5', bg: '#e6f2fa' },
  { name: 'Amazfit', slug: 'amazfit', group: 'watches', color: '#00b0a0', bg: '#e6f7f5' },
  { name: 'Fitbit', slug: 'fitbit', group: 'watches', color: '#00b0b9', bg: '#e6f7f8' },
  { name: 'Garmin', slug: 'garmin', group: 'watches', color: '#007cc2', bg: '#e6f3fa' },
];

export const getBrandByName = (name: string | null | undefined): Brand | undefined => {
  if (!name) return undefined;
  const lower = name.toLowerCase().trim();
  return BRANDS.find((b) => b.name.toLowerCase() === lower || b.slug === lower);
};

export const getBrandBySlug = (slug: string | null | undefined): Brand | undefined => {
  if (!slug) return undefined;
  const lower = slug.toLowerCase().trim();
  return BRANDS.find((b) => b.slug === lower);
};
