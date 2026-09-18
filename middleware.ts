import { NextRequest, NextResponse } from 'next/server'

/**
 * Subdomain routing:
 *   dashboard.awarizon.com/* → /dashboard/*
 *   sdks.awarizon.com/*      → /docs/*
 *
 * DNS: dashboard.awarizon.com and sdks.awarizon.com are CNAMEs to the same
 * Hostinger-hosted app as the main site (see hPanel → Websites → Domains → Subdomains).
 */
export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') ?? ''
  const { pathname } = req.nextUrl

  // Skip Next.js internals and API routes — they must always resolve verbatim.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')   ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // dashboard.awarizon.com → /dashboard/*
  if (hostname.startsWith('dashboard.') && !pathname.startsWith('/dashboard')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/dashboard' : `/dashboard${pathname}`
    return NextResponse.rewrite(url)
  }

  // sdks.awarizon.com → /docs/*
  if (hostname.startsWith('sdks.') && !pathname.startsWith('/docs')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/docs' : `/docs${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all paths except Next.js static assets.
  matcher: ['/((?!_next/static|_next/image).*)'],
}
