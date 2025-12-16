# Documentación de Endpoints - FakeStoreAPI

## 🔐 Autenticación

### 1. Login
**POST** `https://fakestoreapi.com/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "username": "mor_2314",
  "password": "83r5^_"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👤 Usuarios

### 2. Obtener todos los usuarios
**GET** `https://fakestoreapi.com/users`

**Sin headers especiales**

**Respuesta:**
```json
[
  {
    "id": 1,
    "email": "john@gmail.com",
    "username": "johnd",
    "password": "m38rmF$",
    "name": {
      "firstname": "john",
      "lastname": "doe"
    },
    "address": {
      "city": "kilcoole",
      "street": "7835 new road",
      "number": 3,
      "zipcode": "12926-3874",
      "geolocation": {
        "lat": "-37.3159",
        "long": "81.1496"
      }
    },
    "phone": "1-570-236-7033"
  }
]
```

### 3. Obtener un usuario específico
**GET** `https://fakestoreapi.com/users/1`

**Respuesta:** Objeto de usuario individual

### 4. Crear usuario (Registro)
**POST** `https://fakestoreapi.com/users`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "password": "mypassword123",
  "name": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "address": {
    "city": "New York",
    "street": "5th Avenue",
    "number": 123,
    "zipcode": "10001",
    "geolocation": {
      "lat": "40.7128",
      "long": "-74.0060"
    }
  },
  "phone": "1-234-567-8900"
}
```

**Respuesta:**
```json
{
  "id": 11,
  "email": "test@example.com",
  "username": "testuser",
  ...
}
```

### 5. Actualizar usuario
**PUT** `https://fakestoreapi.com/users/1`

**Headers:**
```
Content-Type: application/json
```

**Body:** Similar al de crear usuario

### 6. Eliminar usuario
**DELETE** `https://fakestoreapi.com/users/1`

---

## 🛍️ Productos

### 7. Obtener todos los productos
**GET** `https://fakestoreapi.com/products`

**Parámetros opcionales:**
- `?limit=5` - Limitar resultados
- `?sort=desc` - Ordenar descendente

**Ejemplos:**
- `https://fakestoreapi.com/products?limit=5`
- `https://fakestoreapi.com/products?sort=desc`

### 8. Obtener un producto específico
**GET** `https://fakestoreapi.com/products/1`

**Respuesta:**
```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

### 9. Crear producto (Admin)
**POST** `https://fakestoreapi.com/products`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "title": "Nuevo Producto",
  "price": 99.99,
  "description": "Descripción del producto",
  "category": "electronics",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}
```

**Respuesta:**
```json
{
  "id": 21,
  "title": "Nuevo Producto",
  "price": 99.99,
  ...
}
```

### 10. Actualizar producto (Admin)
**PUT** `https://fakestoreapi.com/products/1`

**Headers:**
```
Content-Type: application/json
```

**Body:** Similar al de crear producto

### 11. Eliminar producto (Admin)
**DELETE** `https://fakestoreapi.com/products/1`

**Respuesta:**
```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  ...
}
```

### 12. Obtener categorías
**GET** `https://fakestoreapi.com/products/categories`

**Respuesta:**
```json
[
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]
```

### 13. Productos por categoría
**GET** `https://fakestoreapi.com/products/category/electronics`

---

## 🛒 Carrito

### 14. Obtener todos los carritos
**GET** `https://fakestoreapi.com/carts`

**Parámetros opcionales:**
- `?limit=5`
- `?sort=desc`
- `?startdate=2019-12-10&enddate=2020-10-10`

### 15. Obtener un carrito específico
**GET** `https://fakestoreapi.com/carts/1`

**Respuesta:**
```json
{
  "id": 1,
  "userId": 1,
  "date": "2020-03-02T00:00:00.000Z",
  "products": [
    {
      "productId": 1,
      "quantity": 4
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

### 16. Obtener carritos de un usuario
**GET** `https://fakestoreapi.com/carts/user/1`

### 17. Crear carrito (Checkout)
**POST** `https://fakestoreapi.com/carts`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "userId": 1,
  "date": "2024-12-15",
  "products": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 5,
      "quantity": 1
    }
  ]
}
```

**Respuesta:**
```json
{
  "id": 11,
  "userId": 1,
  "date": "2024-12-15",
  "products": [...]
}
```

### 18. Actualizar carrito
**PUT** `https://fakestoreapi.com/carts/1`

**Headers:**
```
Content-Type: application/json
```

**Body:** Similar al de crear carrito

### 19. Eliminar carrito
**DELETE** `https://fakestoreapi.com/carts/1`

---

## 📝 Notas Importantes

### Credenciales de Prueba:
```
Usuario: mor_2314
Contraseña: 83r5^_
```

### Otros usuarios disponibles:
```
johnd / m38rmF$
derek / jklg*_56
david_r / 3478*#54
```

### Categorías disponibles:
- electronics
- jewelery
- men's clothing
- women's clothing

### Importante:
⚠️ **FakeStoreAPI es una API de prueba:** Los métodos POST, PUT y DELETE funcionan pero NO guardan los datos realmente. Solo simulan la respuesta.

---

## 🚀 Cómo usar en Postman

1. **Crear una nueva colección** llamada "TiendaApp - FakeStoreAPI"

2. **Para cada endpoint:**
   - Crea una nueva request
   - Selecciona el método HTTP (GET, POST, PUT, DELETE)
   - Pega la URL
   - Si es POST/PUT, ve a la pestaña "Body"
   - Selecciona "raw" y elige "JSON" en el dropdown
   - Pega el JSON del body
   - Click en "Send"

3. **Variables de entorno (opcional):**
   - Crea un entorno llamado "FakeStore"
   - Variable: `base_url` = `https://fakestoreapi.com`
   - Usa: `{{base_url}}/products`

4. **Guardar el token (para simular autenticación):**
   - Después del login, copia el token
   - En otras requests, agrega en Headers:
     ```
     Authorization: Bearer {tu-token-aqui}
     ```

---

## 📦 Importar a Postman

Puedes crear un archivo JSON para importar toda la colección directamente.
