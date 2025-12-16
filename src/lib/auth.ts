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
        console.log('🔐 Authorize called with username:', credentials?.username);
        
        if (!credentials?.username || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        try {
          console.log('🌐 Calling FakeStoreAPI...');
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

          console.log('📡 API Response status:', response.status);

          if (!response.ok) {
            console.log('❌ API returned non-ok status:', response.status);
            return null;
          }

          const data = await response.json();
          console.log('✅ API Response received, has token:', !!data.token);

          if (data.token) {
            // Determinar el rol basado en el usuario
            const role = credentials.username === 'mor_2314' ? 'admin' : 'user';
            
            console.log('✅ User authenticated successfully, role:', role);
            
            return {
              id: credentials.username as string,
              name: credentials.username as string,
              email: `${credentials.username}@example.com`,
              role: role,
              accessToken: data.token,
            };
          }

          console.log('❌ No token in response');
          return null;
        } catch (error) {
          console.error('💥 Error en autenticación:', error);
          return null;
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
  trustHost: true, // Importante para Vercel
  debug: true, // Habilitar debug en producción temporalmente
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
