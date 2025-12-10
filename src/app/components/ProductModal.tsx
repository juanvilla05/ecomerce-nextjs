"use client";

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';
import Image from 'next/image';
import styles from './ProductModal.module.scss';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ productId, isOpen, onClose }: ProductModalProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && productId) {
      setLoading(true);
      setError(null);
      
      fetch(`/api/products/${productId}`)
        .then(res => {
          if (!res.ok) throw new Error('Error al cargar el producto');
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isOpen, productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ 
        id: product.id, 
        name: product.title, 
        quantity: 1, 
        price: product.price 
      }));
      alert(`${product.title} añadido al carrito.`);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        {loading && (
          <div className={styles.loading}>Cargando...</div>
        )}
        
        {error && (
          <div className={styles.error}>Error: {error}</div>
        )}
        
        {product && !loading && (
          <div className={styles.productDetails}>
            <div className={styles.imageSection}>
              <Image 
                src={product.image} 
                alt={product.title} 
                width={400} 
                height={400} 
                className={styles.productImage}
              />
            </div>
            
            <div className={styles.infoSection}>
              <span className={styles.category}>{product.category}</span>
              <h2 className={styles.title}>{product.title}</h2>
              
              <div className={styles.rating}>
                <span className={styles.stars}>⭐ {product.rating.rate}</span>
                <span className={styles.reviews}>({product.rating.count} reseñas)</span>
              </div>
              
              <p className={styles.description}>{product.description}</p>
              
              <div className={styles.priceSection}>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
              </div>
              
              <button className={styles.addToCartButton} onClick={handleAddToCart}>
                🛒 Añadir al carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
