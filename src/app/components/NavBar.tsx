/**
 * Barra de Navegación Principal
 * Muestra el logo, menú y opciones según el estado de autenticación
 */
"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './NavBar.module.scss';

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  // Cierra sesión y redirige al login
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
  };

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.emoji}>🛍️</span> MyStore
          </Link>
        </div>
        <ul>
          <li>Cargando...</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      {/* Logo de la tienda */}
      <div className={styles.logo}>
        <Link href="/">
          <span className={styles.emoji}>🛍️</span> MyStore
        </Link>
      </div>
      
      <ul>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/cart">🛒 Carrito</Link></li>
        
        {/* Menú para usuarios autenticados */}
        {isAuthenticated ? (
          <>
            <li className={styles.userInfo}>
              <span className={styles.username}>👤 {session.user?.name}</span>
              {session.user?.role === 'admin' && (
                <span className={styles.badge}>Admin</span>
              )}
            </li>
            <li><Link href="/profile">Perfil</Link></li>
            {/* Mostrar opción Admin solo a administradores */}
            {session.user?.role === 'admin' && (
              <li><Link href="/admin">Admin</Link></li>
            )}
            <li>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          /* Menú para usuarios no autenticados */
          <>
            <li><Link href="/login">Iniciar Sesión</Link></li>
            <li>
              <Link href="/register" className={styles.registerLink}>
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}