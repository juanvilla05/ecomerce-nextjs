"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseAuthOptions {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { requireAuth = false, requireAdmin = false, redirectTo = '/login' } = options;
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.push('/');
      return;
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAuth, requireAdmin, redirectTo, router]);

  return {
    session,
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
  };
}