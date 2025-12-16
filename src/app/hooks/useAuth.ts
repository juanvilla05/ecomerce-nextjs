/**
 * Hook personalizado de autenticación
 * Proporciona información de la sesión y protección de rutas
 * Redirige automáticamente según los permisos del usuario
 */
"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseAuthOptions {
  requireAuth?: boolean;    // Requiere estar autenticado
  requireAdmin?: boolean;   // Requiere rol de administrador
  redirectTo?: string;      // Ruta de redirección si no cumple los requisitos
}

export function useAuth(options: UseAuthOptions = {}) {
  const { requireAuth = false, requireAdmin = false, redirectTo = '/login' } = options;
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  // Redirige automáticamente si no cumple los requisitos
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