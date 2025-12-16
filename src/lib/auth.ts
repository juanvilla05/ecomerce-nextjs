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
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Por favor ingresa usuario y contraseña');
        }

        try {
          console.log('🔐 Intentando autenticar:', credentials.username);
          
          // Autenticación con FakeStoreAPI
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
            // Determinar el rol basado en el usuario
            const role = credentials.username === 'mor_2314' ? 'admin' : 'user';
            
            console.log('✅ Login exitoso, rol:', role);
            
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
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
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
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
