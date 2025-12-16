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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
  };

  if (isLoading) {
    return (
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">🛍️ MyStore</Link>
        </div>
        <ul>
          <li>Cargando...</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">🛍️ MyStore</Link>
      </div>
      
      <ul>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/cart">🛒 Carrito</Link></li>
        
        {isAuthenticated ? (
          <>
            <li className={styles.userInfo}>
              <span className={styles.username}>👤 {session.user?.name}</span>
              {session.user?.role === 'admin' && (
                <span className={styles.badge}>Admin</span>
              )}
            </li>
            <li><Link href="/profile">Perfil</Link></li>
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