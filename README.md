# 🛍️ Plataforma de E-Commerce - Next.js

Aplicación de comercio electrónico moderna construida con Next.js 15, TypeScript, Redux y NextAuth.

🔗 **Demo en vivo:** https://ecomerce-nextjs-one.vercel.app  
📦 **Repositorio:** https://github.com/juanvilla05/ecomerce-nextjs
📄 **Guía de Deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🚀 Características Principales

### ✨ Funcionalidades Implementadas

- **🔐 Autenticación y Autorización**
  - Sistema completo con NextAuth
  - Login con credenciales (FakeStoreAPI)
  - Protección de rutas con middleware
  - Roles de usuario (Admin y User)
  - Sesiones JWT con duración de 30 días

- **🛒 Carrito de Compras**
  - Gestión de estado con Redux Toolkit
  - Agregar/eliminar productos
  - Actualización de cantidades
  - Cálculo de subtotal, IVA (19%) y total
  - Envío del carrito a endpoint externo

- **👤 Gestión de Usuarios**
  - Página de perfil protegida
  - Visualización de información del usuario
  - Indicadores de rol (Admin/User)

- **🎨 Productos**
  - Catálogo de productos con paginación
  - Página de detalle individual por producto
  - Sistema de "Me gusta" persistente
  - Modal de vista rápida
  - Filtrado por categorías

- **⚙️ Panel de Administración**
  - Acceso exclusivo para administradores
  - Creación de nuevos productos
  - Interfaz intuitiva y moderna

## 🏗️ Tecnologías Utilizadas

- **Framework:** Next.js 16.0.10 (App Router)
- **Lenguaje:** TypeScript 5
- **Estado Global:** Redux Toolkit 2.11.2
- **Autenticación:** NextAuth 5.0.0-beta.30
- **Estilos:** SCSS Modules + CSS Custom Properties
- **UI:** React 19.2.1
- **API:** FakeStoreAPI (https://fakestoreapi.com)

## 📁 Estructura del Proyecto

```
prueba/
├── src/
│   ├── app/                    # Rutas de la aplicación
│   │   ├── admin/              # Panel de administración
│   │   ├── api/                # Rutas API
│   │   │   └── auth/           # Endpoints de NextAuth
│   │   ├── cart/               # Carrito de compras
│   │   ├── components/         # Componentes reutilizables
│   │   ├── hooks/              # Custom hooks
│   │   ├── login/              # Página de inicio de sesión
│   │   ├── product/[id]/       # Detalle de producto (ruta dinámica)
│   │   ├── profile/            # Perfil de usuario
│   │   ├── register/           # Registro de usuarios
│   │   ├── slices/             # Redux slices
│   │   ├── types/              # Tipos TypeScript
│   │   └── store.ts            # Redux store
│   └── lib/
│       └── auth.ts             # Configuración de NextAuth
├── middleware.ts               # Middleware de protección de rutas
├── .env.local                  # Variables de entorno (no subir a git)
└── .env.example                # Ejemplo de variables de entorno
```

## 🚦 Inicio Rápido

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

### Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd prueba
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secreto-super-seguro-aqui
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔑 Credenciales de Prueba

### Usuario Administrador
- **Usuario:** `mor_2314`
- **Contraseña:** `83r5^_`
- **Permisos:** Acceso completo + Panel Admin

### Usuarios Regulares
- **Usuario:** `johnd`, `derek`, `david_r`
- **Contraseñas:** Ver [ENDPOINTS.md](./ENDPOINTS.md)
- **Permisos:** Acceso a perfil y carrito

## 📋 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Compilar para producción
npm start        # Ejecutar build de producción
npm run lint     # Ejecutar linter
```

## 🛣️ Rutas de la Aplicación

### Rutas Públicas
- `/` - Página principal (catálogo de productos)
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios
- `/product/[id]` - Detalle de producto

### Rutas Protegidas (requieren autenticación)
- `/profile` - Perfil del usuario
- `/cart` - Carrito de compras
- `/admin` - Panel de administración (solo admin)

## 🔒 Seguridad

- ✅ Protección de rutas con middleware de NextAuth
- ✅ Sesiones JWT firmadas y encriptadas
- ✅ Validación de roles (Admin/User)
- ✅ Variables de entorno para secretos
- ✅ HTTPS recomendado en producción

## 🎨 Optimizaciones Implementadas

1. **Imágenes Optimizadas**
   - Uso de `next/image` para carga lazy y optimización automática
   - Configuración de dominios remotos permitidos

2. **Code Splitting**
   - División automática de código por Next.js
   - Lazy loading de componentes

3. **Rendimiento**
   - Server-side rendering (SSR)
   - Static generation para páginas estáticas
   - Middleware para protección eficiente de rutas

4. **Estado Global**
   - Redux Toolkit para gestión eficiente del estado
   - Persistencia de "me gusta" en localStorage

## 📦 Despliegue en Vercel

### Configuración Rápida

1. **Conectar con GitHub:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Importa el repositorio `ecomerce-nextjs`

2. **Variables de Entorno Requeridas:**
   ```env
   NEXTAUTH_URL=https://tu-dominio.vercel.app
   NEXTAUTH_SECRET=tu-secreto-generado
   ```

3. **Generar NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy:**
   - Vercel desplegará automáticamente
   - El despliegue toma 2-3 minutos
   - Cada push a `main` despliega automáticamente

### Actualizar NEXTAUTH_URL después del primer despliegue

Después del primer despliegue, Vercel te dará una URL (ej: `https://ecomerce-nextjs-xyz.vercel.app`):

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Edita `NEXTAUTH_URL` con la URL real que te dio Vercel
4. Redeploy el proyecto

### Despliegues Automáticos

✅ Cada `git push` a la rama `main` despliega automáticamente  
✅ Preview deployments para Pull Requests  
✅ Rollback instantáneo a versiones anteriores

## 📚 Documentación Adicional

- [ENDPOINTS.md](./ENDPOINTS.md) - Documentación completa de la API
- [postman_collection.json](./postman_collection.json) - Colección de Postman

## 🧪 Testing

El proyecto está preparado para testing. Puedes agregar tests con:
- Jest para tests unitarios
- React Testing Library para tests de componentes
- Cypress para tests E2E

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

- Juan Camilo Villa Zapata - Desarrollo inicial

##  Documentacion oficial

- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [FakeStoreAPI](https://fakestoreapi.com/)
