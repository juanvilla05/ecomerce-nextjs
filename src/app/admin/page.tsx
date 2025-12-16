"use client";

import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { useState } from 'react';
import styles from './admin.module.scss';

export default function AdminPage() {
  const { user, isLoading, isAdmin } = useAuth({ requireAuth: true, requireAdmin: true });
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'electronics',
    image: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          price: parseFloat(productData.price)
        }),
      });

      const data = await response.json();
      setMessage(`✅ Producto creado exitosamente con ID: ${data.id}`);
      setProductData({
        title: '',
        price: '',
        description: '',
        category: 'electronics',
        image: ''
      });
    } catch (error) {
      setMessage('❌ Error al crear el producto');
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h1>⛔ Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>👑 Panel de Administración</h1>
      
      <div className={styles.welcomeCard}>
        <h2>Bienvenido, {user?.name}</h2>
        <p>Rol: <span className={styles.adminBadge}>Administrador</span></p>
      </div>

      <div className={styles.formCard}>
        <h2>Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Título del Producto</label>
            <input
              type="text"
              value={productData.title}
              onChange={(e) => setProductData({...productData, title: e.target.value})}
              required
              placeholder="Ej: Producto Increíble"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Precio</label>
            <input
              type="number"
              step="0.01"
              value={productData.price}
              onChange={(e) => setProductData({...productData, price: e.target.value})}
              required
              placeholder="99.99"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Categoría</label>
            <select
              value={productData.category}
              onChange={(e) => setProductData({...productData, category: e.target.value})}
            >
              <option value="electronics">Electrónicos</option>
              <option value="jewelery">Joyería</option>
              <option value="men's clothing">Ropa de Hombre</option>
              <option value="women's clothing">Ropa de Mujer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>URL de Imagen</label>
            <input
              type="url"
              value={productData.image}
              onChange={(e) => setProductData({...productData, image: e.target.value})}
              required
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              value={productData.description}
              onChange={(e) => setProductData({...productData, description: e.target.value})}
              required
              rows={4}
              placeholder="Descripción detallada del producto..."
            />
          </div>

          {message && (
            <div className={message.includes('✅') ? styles.successMessage : styles.errorMessage}>
              {message}
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
}