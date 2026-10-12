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
  { name: 'Samsung', slug: 'samsung', group: 'phones', color: '#1428a0', bg: '#eef1fd', logo: '/brands/samsung.svg' },
  { name: 'Infinix', slug: 'infinix', group: 'phones', color: '#00a651', bg: '#e9f8ef', logo: '/brands/infinix.png' },
  { name: 'Tecno', slug: 'tecno', group: 'phones', color: '#0057b8', bg: '#eaf2fb', logo: '/brands/tecno.png' },
  { name: 'Xiaomi', slug: 'xiaomi', group: 'phones', color: '#ff6900', bg: '#fff1e6', logo: '/brands/xiaomi.svg' },
  { name: 'Redmi', slug: 'redmi', group: 'phones', color: '#ff6900', bg: '#fff1e6', logo: '/brands/redmi.png' },
  { name: 'Itel', slug: 'itel', group: 'phones', color: '#e30613', bg: '#fdecec', logo: '/brands/itel.png' },
  { name: 'Oppo', slug: 'oppo', group: 'phones', color: '#1d9a3f', bg: '#e9f7ee', logo: '/brands/oppo.svg' },
  { name: 'Vivo', slug: 'vivo', group: 'phones', color: '#415fff', bg: '#eef1ff', logo: '/brands/vivo.svg' },
  { name: 'Apple', slug: 'apple', group: 'phones', color: '#111111', bg: '#f2f2f2', logo: '/brands/apple.svg' },
  { name: 'iPhone', slug: 'iphone', group: 'phones', color: '#111111', bg: '#f2f2f2', logo: '/brands/apple.svg' },
  { name: 'Nokia', slug: 'nokia', group: 'phones', color: '#124191', bg: '#eaeef7', logo: '/brands/nokia.svg' },
  { name: 'Huawei', slug: 'huawei', group: 'phones', color: '#d81e06', bg: '#fdecea', logo: '/brands/huawei.svg' },
  { name: 'OnePlus', slug: 'oneplus', group: 'phones', color: '#eb0028', bg: '#fdecdf', logo: '/brands/oneplus.svg' },
  { name: 'Realme', slug: 'realme', group: 'phones', color: '#fbbf24', bg: '#fff8e6', logo: '/brands/realme.png' },
  { name: 'Google', slug: 'google', group: 'phones', color: '#4285f4', bg: '#eaf1fe', logo: '/brands/google.svg' },
  { name: 'Oraimo', slug: 'oraimo', group: 'audio', color: '#ff5a00', bg: '#fff0e6', logo: '/brands/oraimo.png' },
  { name: 'JBL', slug: 'jbl', group: 'audio', color: '#ff6600', bg: '#fff1e6', logo: '/brands/jbl.svg' },
  { name: 'U&i', slug: 'ui', group: 'audio', color: '#1f2937', bg: '#eef0f3' },
  { name: 'Ofia', slug: 'ofia', group: 'audio', color: '#7c3aed', bg: '#f3ecfd' },
  { name: 'Amay', slug: 'amay', group: 'audio', color: '#0ea5e9', bg: '#e8f6fe' },
  { name: 'Anker', slug: 'anker', group: 'audio', color: '#00a7e1', bg: '#e6f7fc', logo: '/brands/anker.png' },
  { name: 'Sony', slug: 'sony', group: 'audio', color: '#111111', bg: '#f2f2f2', logo: '/brands/sony.svg' },
  { name: 'Beats', slug: 'beats', group: 'audio', color: '#e11d48', bg: '#fde8ed', logo: '/brands/beats.svg' },
  { name: 'Dell', slug: 'dell', group: 'laptops', color: '#007db8', bg: '#e6f3fa', logo: '/brands/dell.svg' },
  { name: 'HP', slug: 'hp', group: 'laptops', color: '#0096d6', bg: '#e6f6fc', logo: '/brands/hp.svg' },
  { name: 'Lenovo', slug: 'lenovo', group: 'laptops', color: '#e2231a', bg: '#fdecea', logo: '/brands/lenovo.svg' },
  { name: 'Asus', slug: 'asus', group: 'laptops', color: '#00539b', bg: '#e6eef7', logo: '/brands/asus.svg' },
  { name: 'Acer', slug: 'acer', group: 'laptops', color: '#83b81a', bg: '#f1f8e6', logo: '/brands/acer.svg' },
  { name: 'MSI', slug: 'msi', group: 'laptops', color: '#b91c1c', bg: '#fdeaea', logo: '/brands/msi.svg' },
  { name: 'AMD Ryzen', slug: 'amd-ryzen', group: 'laptops', color: '#ed1c24', bg: '#fdeaea', logo: '/brands/amd.svg' },
  { name: 'Intel', slug: 'intel', group: 'laptops', color: '#0068b5', bg: '#e6f2fa', logo: '/brands/intel.svg' },
  { name: 'Amazfit', slug: 'amazfit', group: 'watches', color: '#00b0a0', bg: '#e6f7f5', logo: '/brands/amazfit.png' },
  { name: 'Fitbit', slug: 'fitbit', group: 'watches', color: '#00b0b9', bg: '#e6f7f8', logo: '/brands/fitbit.svg' },
  { name: 'Garmin', slug: 'garmin', group: 'watches', color: '#007cc2', bg: '#e6f3fa', logo: '/brands/garmin.svg' },
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
