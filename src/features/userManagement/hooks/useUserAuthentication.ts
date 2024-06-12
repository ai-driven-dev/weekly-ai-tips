import { auth } from '@/firebaseClient';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useUserAuthentication = () => {
  // TODO: Use EntityUser instead of User from Firebase
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const shouldRedirectTo = searchParams.get('redirect');

  /**
   * @param {User | null} firebaseUser - The authenticated user object from Firebase
   */
  const handleIdTokenChanged = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const idTokenResult = await firebaseUser.getIdTokenResult();

      // Send a request to the server to set authenticated user cookies
      const isLogged = await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });

      if (isLogged.status !== 200 || shouldRedirectTo) {
        return push('/dashboard');
      }

      setLoading(false);
      setUser(firebaseUser);
      return;
    }

    // Send a request to the server to remove authenticated user cookies
    await fetch('/api/logout');

    setUser(null);
    setLoading(false);
  };

  /**
   * Log in the user using GoogleAuthProvider
   */
  const login = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    setLoading(false);
  };

  /**
   * Log out the user
   */
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  /**
   * Sync user data with the server if the user is not null.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    fetch('/api/entities/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
  }, [user]);

  /**
   * Subscribe to the ID token changes
   */
  useEffect(() => {
    const subscription = onIdTokenChanged(getAuth(), handleIdTokenChanged);

    return () => subscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};
