"use client";

import './globals.css';
import NavBar from './components/NavBar';
import SessionProvider from './components/SessionProvider';
import { Provider } from 'react-redux';
import { store } from './store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <Provider store={store}>
            <header>
              <NavBar />
            </header>
            <main>{children}</main>
            <footer>
              <p>© 2025 Plataforma de Productos</p>
            </footer>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
