// Dedicated public-site counters/contact store; keep private-access credentials separate.
export function siteStoreCredentials() {
  const dedicatedUrl = process.env.SITE_DATA_KV_REST_API_URL;
  const dedicatedToken = process.env.SITE_DATA_KV_REST_API_TOKEN;
  if (dedicatedUrl || dedicatedToken) return { url: dedicatedUrl, token: dedicatedToken };
  return { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN };
}
