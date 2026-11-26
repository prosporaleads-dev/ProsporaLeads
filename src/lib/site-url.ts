export function getAppUrl(): URL {
  const configuredUrl =
    process.env.APP_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const deploymentHost = process.env.VERCEL_URL?.trim();
  const fallbackUrl = deploymentHost
    ? `https://${deploymentHost}`
    : process.env.NODE_ENV === "production"
      ? "https://prosporaleads.com"
      : "http://localhost:3000";

  return new URL(configuredUrl || fallbackUrl);
}
