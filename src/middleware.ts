import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req: NextRequest) {
  const token = cookies().get('access_token')?.value;

  const isProtected = req.nextUrl.pathname.startsWith('/')

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}