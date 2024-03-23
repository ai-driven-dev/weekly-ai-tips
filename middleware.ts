import { authMiddleware, redirectToLogin } from "next-firebase-auth-edge";
import { NextRequest } from "next/server";

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
  throw new Error("One or more environment variables are undefined.");
}

export const config = {
  matcher: ["/api/login", "/api/logout", "/api/entities/:path*"],
};

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret1", "secret2"],
    // debug: NODE_ENV !== "production",
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: NODE_ENV === "production", // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    handleInvalidToken: async (reason) => {
      console.error("Missing or malformed credentials", { reason });

      return redirectToLogin(request, {
        path: "/",
        publicPaths: ["/"],
      });
    },
    serviceAccount: {
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: FIREBASE_CLIENT_EMAIL!,
      privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")!,
    },
  });
}
