import express from "express";
import { db } from "../Drizzle/db";
import { products, categories } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const siteUrl = process.env.SITE_URL || "https://gmnex.com";
    
    const staticRoutes = [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/shop", changefreq: "daily", priority: 0.9 },
      { path: "/privacy-policy", changefreq: "monthly", priority: 0.7 },
      { path: "/terms-of-service", changefreq: "monthly", priority: 0.7 },
    ];

    const [productsData, categoriesData] = await Promise.all([
      db.query.products.findMany({
        where: eq(products.status, "in_stock"),
        columns: { slug: true, updatedAt: true },
      }),
      db.query.categories.findMany({
        where: eq(categories.isActive, true),
        columns: { slug: true, updatedAt: true },
      }),
    ]);

    const productRoutes = productsData.map(p => ({
      path: `/product/${p.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: p.updatedAt,
    }));

    const categoryRoutes = categoriesData.map(c => ({
      path: `/category/${c.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: c.updatedAt,
    });

    const allRoutes = [...staticRoutes, ...productRoutes, ...categoryRoutes];

    const urlEntries = allRoutes.map(route => {
      const lastmod = route.lastmod ? `<lastmod>${new Date(route.lastmod).toISOString().split("T")[0]}</lastmod>` : "";
      return `  <url>
    <loc>${process.env.SITE_URL || "https://gmnex.com"}${route.path}</loc>
    ${lastmod}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;