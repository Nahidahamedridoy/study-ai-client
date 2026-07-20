import { NextResponse } from 'next/server';

// ─── Route Configuration ──────────────────────────────────────────────────────

/**
 * Path prefixes that require an authenticated session.
 * Any route starting with one of these will be gated.
 */
const PRIVATE_PREFIXES = ['/dashboard', '/profile'];

/**
 * Exact paths where authenticated users should NOT linger.
 * Visiting /login or /register while logged in redirects to the dashboard.
 */
const AUTH_ROUTES = ['/login', '/register'];

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Better Auth writes the session under this cookie name.
    // A "__Secure-" prefixed variant is used on HTTPS (production).
    const sessionToken =
        request.cookies.get('better-auth.session_token')?.value ||
        request.cookies.get('__Secure-better-auth.session_token')?.value;

    const isAuthenticated = Boolean(sessionToken);
    const isPrivateRoute = PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    // ── Guard: redirect unauthenticated users away from private routes ──
    if (isPrivateRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ── Guard: redirect already-authenticated users away from auth pages ──
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// ─── Matcher ──────────────────────────────────────────────────────────────────
// Run on all paths EXCEPT:
//   • /api/*          — API routes (auth endpoints live here)
//   • /_next/static   — compiled JS / CSS
//   • /_next/image    — Next.js image optimisation
//   • /favicon.ico    — browser tab icon
//   • static assets   — svg, png, jpg, jpeg, gif, webp

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
