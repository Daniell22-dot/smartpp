export interface CategoryTile {
  name: string;
  emoji: string;
  bg: string;
  to: string;
}

export const CATEGORY_TILES: CategoryTile[] = [
  { name: 'Android Phones', emoji: '📱', bg: '#e9f7ee', to: '/search?q=Android' },
  { name: 'Feature Phones', emoji: '📟', bg: '#eef1fd', to: '/search?q=Feature' },
  { name: 'iPhones', emoji: '📱', bg: '#f2f2f2', to: '/search?q=iPhone' },
  { name: 'Tablets', emoji: '📲', bg: '#e8f6fe', to: '/search?q=Tablet' },
  { name: 'Earpods', emoji: '🎧', bg: '#f3ecfd', to: '/search?q=Earpods' },
  { name: 'Headphones', emoji: '🎧', bg: '#fff1e6', to: '/search?q=Headphone' },
  { name: 'Smartwatches', emoji: '⌚', bg: '#e6f7f5', to: '/search?q=Smart Watch' },
  { name: 'Power Banks', emoji: '🔋', bg: '#fff8e6', to: '/search?q=Power Bank' },
  { name: 'Cases', emoji: '🛡️', bg: '#fdecea', to: '/search?q=Case' },
  { name: 'Phone Stands', emoji: '🧲', bg: '#fdecdf', to: '/search?q=Stand' },
  { name: 'Chargers', emoji: '🔌', bg: '#eef0f3', to: '/search?q=Charger' },
  { name: 'Speakers', emoji: '🔊', bg: '#fde8ed', to: '/search?q=Speaker' },
];
