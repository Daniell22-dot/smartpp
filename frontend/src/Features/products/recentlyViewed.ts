import type { Product } from './productsAPI';

const KEY = 'recentlyViewed';
const MAX = 12;

export function getRecentlyViewed(): Product[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(product: Product) {
  if (!product || !product.productId) return;
  try {
    const list = getRecentlyViewed().filter((p) => p.productId !== product.productId);
    list.unshift(product);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {
    /* ignore quota errors */
  }
}
