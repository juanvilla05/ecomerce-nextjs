# 🚀 Guía de Despliegue en Vercel

## ✅ Aplicación Desplegada

**URL de Producción:** https://ecomerce-nextjs-one.vercel.app

**Repositorio GitHub:** https://github.com/juanvilla05/ecomerce-nextjs

---

## 📋 Variables de Entorno Configuradas

### En Vercel (Settings → Environment Variables):

```env
NEXTAUTH_URL=https://ecomerce-nextjs-one.vercel.app
NEXTAUTH_SECRET=QwTvF4Nz7ZeyOEa0d69+9tExjCyRsk1VHeut0Ik4KSM=
```

### En Local (.env.local):

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=QwTvF4Nz7ZeyOEa0d69+9tExjCyRsk1VHeut0Ik4KSM=
```

---

## 🔐 Credenciales de Prueba

### Usuario Administrador
- **Usuario:** `mor_2314`
- **Contraseña:** `83r5^_`
- **Permisos:** Acceso completo + Panel Admin

### Usuarios Regulares
- **Usuario:** `johnd` | **Contraseña:** `m38rmF$`
- **Usuario:** `derek` | **Contraseña:** `jklg*_56`
- **Usuario:** `david_r` | **Contraseña:** `3478*#54`
- **Permisos:** Acceso a perfil y carrito

---

## 🛠️ Tecnologías Desplegadas

- **Framework:** Next.js 15.5.9 (App Router)
- **Autenticación:** NextAuth 5.0.0-beta.30
- **Estado Global:** Redux Toolkit 2.11.2
- **Estilos:** SCSS Modules + Sass
- **Lenguaje:** TypeScript 5
- **Runtime:** React 18.3.1
- **Hosting:** Vercel

---

## 📦 Características Desplegadas

✅ **Sistema de Autenticación Completo**
- Login/Logout con NextAuth
- Protección de rutas con middleware
- Roles de usuario (Admin/User)
- Sesiones JWT con duración de 30 días

✅ **Catálogo de Productos**
- Integración con FakeStoreAPI
- Página de detalle de productos
- Sistema de "me gusta" persistente
- Modal de vista rápida

✅ **Carrito de Compras**
- Gestión con Redux Toolkit
- Agregar/eliminar productos
- Actualización de cantidades
- Cálculo automático de subtotal, IVA (19%) y total
- Envío del carrito a endpoint externo

✅ **Panel de Administración**
- Acceso exclusivo para administradores
- Creación de nuevos productos
- Interfaz moderna y responsive

✅ **Rutas Protegidas**
- `/profile` - Perfil de usuario
- `/cart` - Carrito de compras
- `/admin` - Panel de administración (solo admin)

---

## 🔄 Proceso de Despliegue Continuo

### Despliegue Automático

Cada vez que haces `git push` a la rama `main`:
1. ✅ Vercel detecta el cambio automáticamente
2. ✅ Ejecuta `npm install`
3. ✅ Ejecuta `npm run build`
4. ✅ Despliega la nueva versión
5. ✅ Actualiza la URL de producción

### Despliegue Manual

Si necesitas hacer un redeploy manual:
1. Ve a tu proyecto en Vercel
2. Click en "Deployments"
3. Click en los 3 puntos (...) del deployment
4. Selecciona "Redeploy"

---

## 🐛 Solución de Problemas

### Error: "npm run build exited with 1"

**Causa:** Falta alguna dependencia o hay errores de compilación

**Solución:**
```bash
# Local
npm run build

# Si falla, revisa los errores y corrígelos
# Luego haz commit y push
```

### Error: NextAuth no funciona en producción

**Causa:** `NEXTAUTH_URL` no está configurada correctamente

**Solución:**
1. Ve a Vercel → Settings → Environment Variables
2. Asegúrate de que `NEXTAUTH_URL` sea: `https://ecomerce-nextjs-one.vercel.app`
3. Verifica que `NEXTAUTH_SECRET` esté configurado
4. Haz un Redeploy

### Error: "Cannot find module sass"

**Causa:** Falta instalar el paquete `sass`

**Solución:**
```bash
npm install sass
git add package.json package-lock.json
git commit -m "Add sass dependency"
git push origin main
```

---

## 📊 Monitoreo y Analytics

### Ver logs de Vercel

1. Ve a tu proyecto en Vercel
2. Click en un deployment
3. Click en "Functions" o "View Function Logs"
4. Revisa los logs en tiempo real

### Métricas de rendimiento

Vercel te proporciona automáticamente:
- ✅ Core Web Vitals
- ✅ Tiempo de carga
- ✅ Requests por segundo
- ✅ Edge cache hits

---

## 🔒 Seguridad en Producción

✅ **Variables de entorno seguras** - No se suben a GitHub
✅ **HTTPS automático** - Vercel proporciona SSL gratis
✅ **Protección CSRF** - NextAuth incluye protección
✅ **Sesiones JWT firmadas** - Con NEXTAUTH_SECRET
✅ **Validación de roles** - Middleware protege rutas sensibles

---

## 📝 Actualizaciones Futuras

Para actualizar la aplicación en producción:

1. **Hacer cambios localmente**
   ```bash
   # Desarrolla y prueba localmente
   npm run dev
   ```

2. **Verificar que compile**
   ```bash
   npm run build
   ```

3. **Hacer commit y push**
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```

4. **Vercel desplegará automáticamente** 🚀

---

## 🎯 Próximos Pasos Recomendados

### Mejoras Opcionales

- [ ] Agregar dominio personalizado (ej: `mitienda.com`)
- [ ] Configurar analytics con Vercel Analytics
- [ ] Agregar tests con Jest y React Testing Library
- [ ] Implementar CI/CD con GitHub Actions
- [ ] Agregar SEO mejorado con Metadata API de Next.js
- [ ] Implementar caché de API con SWR o React Query
- [ ] Agregar base de datos real (PostgreSQL, MongoDB)

### Configurar Dominio Personalizado

1. Ve a Vercel → Settings → Domains
2. Click en "Add Domain"
3. Ingresa tu dominio
4. Sigue las instrucciones para configurar DNS
5. Actualiza `NEXTAUTH_URL` con el nuevo dominio

---

## 📞 Soporte

- **Documentación de Vercel:** https://vercel.com/docs
- **Documentación de Next.js:** https://nextjs.org/docs
- **Documentación de NextAuth:** https://next-auth.js.org

---

**✅ Tu aplicación está completamente desplegada y funcionando en producción!** 🎉
