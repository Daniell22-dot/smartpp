export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "product" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  productData?: {
    price?: string;
    availability?: "in_stock" | "out_of_stock" | "preorder";
    brand?: string;
    sku?: string;
  };
}
