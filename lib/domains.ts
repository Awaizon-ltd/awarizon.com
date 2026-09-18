// Canonical production hosts. Locally (or on preview deployments), none of
// these match window.location.hostname, so link helpers fall back to plain
// relative paths within the same app — matching how middleware.ts only
// rewrites on the real *.awarizon.com subdomains.
export const MAIN_HOST      = 'awarizon.com'
export const DASHBOARD_HOST = 'dashboard.awarizon.com'
export const DOCS_HOST      = 'sdks.awarizon.com'

function isKnownHost(hostname: string): boolean {
  return hostname === MAIN_HOST || hostname.endsWith(`.${MAIN_HOST}`)
}

function currentHost(): string {
  return typeof window !== 'undefined' ? window.location.hostname : ''
}

export function mainUrl(path = '/'): string {
  return isKnownHost(currentHost()) ? `https://${MAIN_HOST}${path}` : path
}

export function dashboardUrl(path = '/'): string {
  return isKnownHost(currentHost())
    ? `https://${DASHBOARD_HOST}${path}`
    : `/dashboard${path === '/' ? '' : path}`
}

export function docsUrl(path = '/'): string {
  return isKnownHost(currentHost())
    ? `https://${DOCS_HOST}${path}`
    : `/docs${path === '/' ? '' : path}`
}
