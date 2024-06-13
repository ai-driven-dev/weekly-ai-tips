'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import { QUERY_PARAM_NAME } from '@/src/constants/Query';
import { AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useUserAuthentication } from '../../userManagement/hooks/useUserAuthentication';

export default function Login() {
  const { login } = useUserAuthentication();
  const searchParams = useSearchParams();
  const isForbidden = !!searchParams.get(QUERY_PARAM_NAME);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <Title>Sign in to continue</Title>
            {isForbidden ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  You are not allowed to access the dashboard, ask for
                  whitelisting.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <p className="pb-6 text-sm">
                  Sign in to access your dashboard and manage your tips, drafts,
                  and more.
                </p>
                <Button
                  onClick={login}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ChromeIcon />
                  Sign in with Google
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}
