import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge';
import { GetTokensOptions } from 'next-firebase-auth-edge/lib/next/tokens';
import { NextRequest, NextResponse } from 'next/server';
import { QUERY_PARAM_NAME } from './src/constants/Query';

const {
  NODE_ENV,
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
} = process.env;

if (
  !NEXT_PUBLIC_FIREBASE_API_KEY ||
  !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !FIREBASE_CLIENT_EMAIL ||
  !FIREBASE_PRIVATE_KEY
) {
  throw new Error('One or more environment variables are undefined.');
}

const COOKIE_NAME = 'AuthToken';

const PROTECTED_PATHS = [
  '/dashboard',
  '/api/login',
  '/api/logout',
  '/api/entities',
];

export const config = {
  matcher: ['/:path*'],
};

export const options: GetTokensOptions = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY!,
  cookieName: COOKIE_NAME,
  serviceAccount: {
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: FIREBASE_CLIENT_EMAIL!,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
  },
  cookieSignatureKeys: ['secret1', 'secret2'],
};

export async function middleware(request: NextRequest) {
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  const currentURL = request.url;
  const currentPath = new URL(currentURL).pathname;
  requestHeaders.set('x-path', currentPath);

  // Public middleware.
  if (!PROTECTED_PATHS.includes(currentPath)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Private middleware.
  return authMiddleware(request, {
    ...options,
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    // debug: NODE_ENV !== 'production',
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: NODE_ENV === 'production', // Set this to true on HTTPS environments
      sameSite: 'lax' as const,
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    handleValidToken: async ({ decodedToken: { email } }, headers) => {
      if (!email || !allowedEmails.includes(email)) {
        console.error('Unauthorized access', { email });
        return redirectToLogin(request, {
          path: '/login',
          publicPaths: ['/login'],
          redirectParamKeyName: QUERY_PARAM_NAME,
        });
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.error('Missing or malformed credentials', { reason });

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: ['/login'],
      });
    },
  });
}
