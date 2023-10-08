import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // workaround for forbid mockServiceWorker.js access on production environment
  if (request.nextUrl.pathname === '/mockServiceWorker.js' && process.env.NODE_ENV !== 'development') {
    return NextResponse.redirect(request.nextUrl.origin);
  }
  NextResponse.next();
}

export const config = {
  matcher: ['/mockServiceWorker.js'],
};
