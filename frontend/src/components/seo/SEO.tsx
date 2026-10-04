import { Helmet } from "react-helmet-async";
import type { SeoProps } from "./types";

const SITE_NAME = "GM Business Solutions";
const SITE_URL = "https://gmnex.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  productData,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: path.split("/").filter(Boolean).map((segment, index, arr) => {
      const itemPath = "/" + arr.slice(0, index + 1).join("/");
      return {
        "@type": "ListItem",
        position: index + 1,
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        item: `${SITE_URL}${itemPath}`,
      };
    }),
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description,
  };

  const productJsonLd =
    type === "product" && productData
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: title,
          description,
          image,
          brand: productData.brand ? { "@type": "Brand", name: productData.brand } : undefined,
          sku: productData.sku,
          offers: {
            "@type": "Offer",
            price: productData.price,
            priceCurrency: "KES",
            availability:
              productData.availability === "in_stock"
                ? "https://schema.org/InStock"
                : productData.availability === "out_of_stock"
                  ? "https://schema.org/OutOfStock"
                  : "https://schema.org/PreOrder",
          },
        }
      : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {type === "product" && productData?.price && (
        <meta name="product:price:amount" content={productData.price} />
      )}
      {type === "product" && productData?.availability && (
        <meta name="product:availability" content={productData.availability} />
      )}
      {type === "product" && productData?.brand && (
        <meta name="product:brand" content={productData.brand} />
      )}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_KE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      {productJsonLd && <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>}
    </Helmet>
  );
}
