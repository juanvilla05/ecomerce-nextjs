"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeItem, clearCart } from '../slices/cartSlice';
import { useAuth } from '../hooks/useAuth';
import { CartItem } from '../types';
import styles from './CartPage.module.scss';

export default function CartPage() {
  const { isLoading } = useAuth({ requireAuth: true });
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para finalizar la compra');
      return;
    }

    try {
      const response = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: cartItems.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      console.log('Carrito enviado:', data);
      alert('¡Compra realizada con éxito!');
      dispatch(clearCart());
    } catch (err) {
      console.error('Error al procesar la compra:', err);
      alert('Error al procesar la compra');
    }
  };

  const subtotal = cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.19; // IVA del 19%
  const totalPrice = subtotal + tax;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando carrito...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛒 Mi Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛍️</div>
          <p className={styles.emptyMessage}>Tu carrito está vacío</p>
          <p className={styles.emptySubtext}>¡Agrega productos para comenzar a comprar!</p>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.itemsSection}>
            <h2 className={styles.sectionTitle}>Productos ({cartItems.length})</h2>
            <div className={styles.itemList}>
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <div className={styles.itemDetails}>
                      <div className={styles.detailRow}>
                        <span className={styles.label}>Precio unitario:</span>
                        <span className={styles.value}>${item.price.toFixed(2)}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.label}>Cantidad:</span>
                        <span className={styles.quantityBadge}>{item.quantity}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.label}>Subtotal:</span>
                        <span className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)} 
                    className={styles.removeButton}
                    title="Eliminar producto"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Resumen de Compra</h2>
              
              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal:</span>
                  <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>IVA (19%):</span>
                  <span className={styles.summaryValue}>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.summaryRow + ' ' + styles.totalRow}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalValue}>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button onClick={handleCheckout} className={styles.checkoutButton}>
                  💳 Finalizar Compra
                </button>
                <button onClick={handleClearCart} className={styles.clearButton}>
                  🗑️ Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}