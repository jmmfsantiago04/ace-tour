import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Matches the locales we have in Payload config
let locales = ['en', 'ko']
let defaultLocale = 'en'

function getLocale(request: NextRequest) {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Skip locale redirect for admin paths
    if (pathname.startsWith('/admin')) {
        return
    }

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // But include /admin in the matcher so we can explicitly skip it in the middleware
        '/((?!_next|api|_vercel|.*\\..*).*)',
    ],
} 