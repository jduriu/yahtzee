import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest){
  // Check user info and redirect to an oops page or just back to the homepage
  return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
  // List of routes which invoke the middleware to execute
  matcher: [
    '/play/:path*',
    '/save/:path*'
  ],
}
