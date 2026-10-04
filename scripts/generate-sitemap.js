#!/usr/bin/env node
// Dynamic sitemap generator for GM Business Solutions
// Run at build time: node scripts/generate-sitemap.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = process.env.SITE_URL || "https://gmnex.com";
const OUTPUT_PATH = path.resolve(__dirname, "../frontend/public/sitemap.xml");

const STATIC_ROUTES = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/shop", changefreq: "daily", priority: 0.9 },
  { path: "/privacy-policy", changefreq: "monthly", priority: 0.7 },
  { path: "/terms-of-service", changefreq: "monthly", priority: 0.7 },
];

async function fetchDynamicRoutes() {
  const apiUrl = process.env.API_URL || "http://localhost:5000/api";
  
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${apiUrl}/products/active`),
      fetch(`${apiUrl}/categories/active`),
    ]);

    const routes = [];

    if (productsRes.ok) {
      const productsData = await productsRes.json();
      if (productsData.success && productsData.data) {
        for (const product of productsData.data) {
          routes.push({
            path: `/product/${product.slug}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: product.updatedAt || new Date().toISOString(),
          });
        }
      }
    }

    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      if (categoriesData.success && categoriesData.data) {
        for (const category of categoriesData.data) {
          routes.push({
            path: `/category/${category.slug}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: category.updatedAt || new Date().toISOString(),
          });
        }
      }
    }

    return routes;
  } catch (error) {
    console.warn("Failed to fetch dynamic routes for sitemap:", error.message);
    return [];
  }
}

function generateSitemap(routes) {
  const urlEntries = routes.map(route => {
    const lastmod = route.lastmod ? `<lastmod>${new Date(route.lastmod).toISOString().split("T")[0]}</lastmod>` : "";
    return `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    ${lastmod}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;
}

async function main() {
  console.log("Generating sitemap...");
  
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];
  
  const sitemap = generateSitemap(allRoutes);
  
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`Sitemap generated at ${OUTPUT_PATH} with ${allRoutes.length} URLs`);
}

main().catch(console.error);