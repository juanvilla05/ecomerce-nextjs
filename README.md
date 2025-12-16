# 🛍️ Plataforma de E-Commerce - Next.js

Aplicación de comercio electrónico moderna construida con Next.js 15, TypeScript, Redux y NextAuth.

## 🚀 Características Principales

### ✨ Funcionalidades Implementadas

- **🔐 Autenticación y Autorización**
  - Sistema completo con NextAuth v5
  - Login con credenciales (FakeStoreAPI)
  - Protección de rutas con middleware
  - Roles de usuario (Admin y User)
  - Sesiones JWT con duración de 30 días

- **🛒 Carrito de Compras**
  - Gestión de estado con Redux Toolkit
  - Agregar/eliminar productos
  - Actualización de cantidades
  - Cálculo de subtotal, IVA (19%) y total
  - Persistencia en localStorage

- **👤 Gestión de Usuarios**
  - Página de perfil protegida
  - Visualización de información del usuario
  - Indicadores de rol (Admin/User)
  - Logout seguro

- **🎨 Productos**
  - Catálogo de productos con paginación
  - Página de detalle individual por producto
  - Sistema de "Me gusta" persistente
  - Modal de vista rápida
  - Filtrado por categorías
  - Integración con FakeStoreAPI

- **⚙️ Panel de Administración**
  - Acceso exclusivo para administradores
  - Creación de nuevos productos
  - Interfaz intuitiva y moderna

## 🏗️ Tecnologías Utilizadas

- **Framework:** Next.js 15.5.9 (App Router)
- **Lenguaje:** TypeScript 5
- **Estado Global:** Redux Toolkit 2.11.2
- **Autenticación:** NextAuth 5.0.0-beta.30
- **Estilos:** SCSS Modules + Sass
- **Runtime:** React 19
- **API Externa:** FakeStoreAPI (https://fakestoreapi.com)

## 📁 Estructura del Proyecto

```
prueba/
├── src/
│   ├── app/                    # Rutas de la aplicación (App Router)
│   │   ├── admin/              # Panel de administración (solo admin)
│   │   ├── api/                # Rutas API
│   │   │   ├── auth/           # Endpoints de NextAuth
│   │   │   └── products/       # API de productos
│   │   ├── cart/               # Carrito de compras
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── NavBar.tsx      # Barra de navegación
│   │   │   ├── ProductCard.tsx # Tarjeta de producto
│   │   │   ├── ProductModal.tsx # Modal de vista rápida
│   │   │   └── ...
│   │   ├── hooks/              # Custom hooks
│   │   ├── login/              # Página de inicio de sesión
│   │   ├── product/[id]/       # Detalle de producto (ruta dinámica)
│   │   ├── profile/            # Perfil de usuario
│   │   ├── register/           # Registro de usuarios
│   │   ├── slices/             # Redux slices
│   │   │   ├── cartSlice.ts    # Estado del carrito
│   │   │   └── likesSlice.ts   # Estado de "me gusta"
│   │   ├── types/              # Tipos TypeScript
│   │   └── store.ts            # Configuración Redux store
│   └── lib/
│       └── auth.ts             # Configuración de NextAuth
├── middleware.ts               # Middleware de protección de rutas
├── .env.local                  # Variables de entorno (NO subir a git)
├── .env.example                # Ejemplo de variables de entorno
└── package.json                # Dependencias del proyecto
```

## 🚦 Inicio Rápido

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/juanvilla05/ecomerce-nextjs.git
cd prueba
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo de ejemplo y configura tus variables:
```bash
cp .env.example .env.local
```

El archivo `.env.local` debe contener:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=QwTvF4Nz7ZeyOEa0d69+9tExjCyRsk1VHeut0Ik4KSM=
```

> **⚠️ Importante:** El archivo `.env.local` NO debe subirse a git (ya está en `.gitignore`)

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**

Abre [http://localhost:3000](http://localhost:3000) y disfruta de la aplicación.

## 🔑 Credenciales de Prueba

### Usuario Administrador
- **Usuario:** `mor_2314`
- **Contraseña:** `83r5^_`
- **Permisos:** Acceso completo + Panel de administración

### Usuarios Regulares
- **Usuario:** `johnd` | **Contraseña:** `m38rmF$`
- **Usuario:** `derek` | **Contraseña:** `jklg*_56`
- **Usuario:** `david_r` | **Contraseña:** `3478*#54`
- **Permisos:** Acceso a perfil y carrito

## 📋 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo (puerto 3000)
npm run build    # Compilar para producción
npm start        # Ejecutar build de producción
npm run lint     # Ejecutar ESLint
```

## 🛣️ Rutas de la Aplicación

### Rutas Públicas (accesibles sin login)
- `/` - Página principal (catálogo de productos)
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios
- `/product/[id]` - Detalle de producto

### Rutas Protegidas (requieren autenticación)
- `/profile` - Perfil del usuario autenticado
- `/cart` - Carrito de compras
- `/admin` - Panel de administración **(solo usuarios con rol admin)**

## 🔒 Seguridad

- ✅ Protección de rutas con middleware de NextAuth
- ✅ Sesiones JWT firmadas y encriptadas
- ✅ Validación de roles (Admin/User)
- ✅ Variables de entorno para secretos
- ✅ Contraseñas nunca almacenadas en el frontend
- ✅ CSRF protection incluido

## 🎨 Optimizaciones Implementadas

### 1. Rendimiento
- Server-side rendering (SSR) para SEO
- Static generation para páginas estáticas
- Code splitting automático por Next.js
- Lazy loading de componentes
- Middleware eficiente para protección de rutas

### 2. Imágenes
- Uso de `next/image` para optimización automática
- Lazy loading de imágenes
- Configuración de dominios remotos permitidos
- Compresión automática

### 3. Estado Global
- Redux Toolkit para gestión eficiente
- Persistencia en localStorage
- Sincronización entre pestañas
- DevTools para debugging

### 4. Estilos
- SCSS Modules para encapsulación
- Variables CSS para temas
- Soporte para modo oscuro
- Diseño responsive

## 📚 Documentación Adicional

- **[ENDPOINTS.md](./ENDPOINTS.md)** - Documentación completa de la API
- **[postman_collection.json](./postman_collection.json)** - Colección de Postman para pruebas

## 🧪 Testing

El proyecto está preparado para testing. Puedes agregar tests con:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev cypress  # Para tests E2E
```

## 🐛 Troubleshooting

### Error: "Invalid credentials"
- Verifica que estés usando las credenciales correctas de la sección **Credenciales de Prueba**
- Asegúrate de que el archivo `.env.local` existe y tiene las variables correctas

### Error: "NEXTAUTH_SECRET missing"
- Copia el archivo `.env.example` a `.env.local`
- Asegúrate de que `NEXTAUTH_SECRET` tiene un valor

### La aplicación no inicia
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

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

**Juan Camilo Villa Zapata** - Desarrollo completo del proyecto

## 🌟 Características Destacadas

- ✅ **100% TypeScript** - Type-safe en todo el proyecto
- ✅ **App Router** - Utiliza el nuevo App Router de Next.js 15
- ✅ **Server Components** - Optimización de rendimiento
- ✅ **Middleware** - Protección de rutas eficiente
- ✅ **Redux Toolkit** - Estado global moderno
- ✅ **NextAuth v5** - Autenticación robusta
- ✅ **SCSS Modules** - Estilos encapsulados
- ✅ **Responsive** - Funciona en todos los dispositivos
- ✅ **0 Vulnerabilidades** - Dependencias seguras

## 📖 Recursos de Aprendizaje

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [FakeStore API Documentation](https://fakestoreapi.com/)
- [SCSS Documentation](https://sass-lang.com/documentation/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**¡Desarrollado con ❤️ usando Next.js 15 y TypeScript!**
