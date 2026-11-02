export function getAppUrl(): URL {
  const configuredUrl = process.env.APP_URL?.trim();
  const deploymentHost = process.env.VERCEL_URL?.trim();
  const fallbackUrl = deploymentHost
    ? `https://${deploymentHost}`
    : "http://localhost:3000";

  return new URL(configuredUrl || fallbackUrl);
}