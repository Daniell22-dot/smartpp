export function transformProductImage(
  url: string | null,
  cloudName?: string
): string | null {
  if (!url) return null
  // If a Cloudinary name is configured, build a Cloudinary transformation URL
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_400,h_300,c_fill/${encodeURIComponent(
      url
    )}`
  }
  // Otherwise return the original URL unchanged
  return url
}