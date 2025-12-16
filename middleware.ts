/**
 * Middleware de protección de rutas
 * Ejecuta la autenticación de NextAuth antes de acceder a rutas protegidas
 */
export { auth as middleware } from "@/lib/auth";

// Define qué rutas requieren autenticación
export const config = {
  matcher: [
    '/profile/:path*',  // Perfil del usuario
    '/admin/:path*',    // Panel de administración
    '/cart/:path*',     // Carrito de compras
  ],
};
