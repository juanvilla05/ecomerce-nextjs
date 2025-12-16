/**
 * Configuración de autenticación con NextAuth v5
 * Maneja login con credenciales contra FakeStoreAPI
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // Valida credenciales contra FakeStoreAPI y retorna datos del usuario
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Por favor ingresa usuario y contraseña');
        }

        try {
          console.log('🔐 Intentando autenticar:', credentials.username);
          
          // Llamada a la API de FakeStore para validar credenciales
          const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          console.log('📡 Respuesta API:', response.status);

          if (!response.ok) {
            throw new Error('Credenciales inválidas');
          }

          const data = await response.json();

          if (data.token) {
            // Asignar rol: 'mor_2314' es admin, los demás son users
            const role = credentials.username === 'mor_2314' ? 'admin' : 'user';
            
            console.log('✅ Login exitoso, rol:', role);
            
            // Retornar objeto de usuario que se guardará en la sesión
            return {
              id: credentials.username as string,
              name: credentials.username as string,
              email: `${credentials.username}@example.com`,
              role: role,
              accessToken: data.token,
            };
          }

          throw new Error('No se recibió token de autenticación');
        } catch (error) {
          console.error('❌ Error en autenticación:', error);
          if (error instanceof Error) {
            throw error;
          }
          throw new Error('Error al iniciar sesión');
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Ruta personalizada de login
  },
  callbacks: {
    // Agrega información personalizada al JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // Hace disponible la info del JWT en la sesión del cliente
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Usar tokens JWT en lugar de DB
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Exportar handlers para rutas API y funciones de autenticación
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);