export interface CategoryTile {
  name: string;
  image: string;
  bg: string;
  to: string;
}

export const CATEGORY_TILES: CategoryTile[] = [
  { name: 'Android Phones', image: '/categories/android-phones.jpeg', bg: '#e9f7ee', to: '/search?q=Android' },
  { name: 'iPhones', image: '/categories/iphones.jpeg', bg: '#f2f2f2', to: '/search?q=iPhone' },
  { name: 'Feature Phones', image: '/categories/feature-phones.jpeg', bg: '#eef1fd', to: '/search?q=Feature' },
  { name: 'Tablets', image: '/categories/tablets.jpeg', bg: '#e8f6fe', to: '/search?q=Tablet' },
  { name: 'Laptops', image: '/categories/laptops.jpeg', bg: '#e6f3fa', to: '/search?q=Laptop' },
  { name: 'Earpods', image: '/categories/earpods.jpeg', bg: '#f3ecfd', to: '/search?q=Earpods' },
  { name: 'Headphones', image: '/categories/headphones.jpeg', bg: '#fff1e6', to: '/search?q=Headphone' },
  { name: 'Neckband Earphones', image: '/categories/neckband-earphones.jpeg', bg: '#e6f7f5', to: '/search?q=Earphone' },
  { name: 'Smartwatches', image: '/categories/smartwatches.jpeg', bg: '#e6f7f5', to: '/search?q=Smart Watch' },
  { name: 'Power Banks', image: '/categories/power-banks.jpeg', bg: '#fff8e6', to: '/search?q=Power Bank' },
  { name: 'Phone Stands', image: '/categories/phone-stands.jpeg', bg: '#fdecdf', to: '/search?q=Stand' },
  { name: 'Gaming', image: '/categories/gaming.jpeg', bg: '#eef0f3', to: '/search?q=Gaming' },
  { name: 'Cameras', image: '/categories/cameras.jpeg', bg: '#fde8ed', to: '/search?q=Camera' },
  { name: 'Microphones', image: '/categories/microphones.jpeg', bg: '#eef1fd', to: '/search?q=Microphone' },
];
