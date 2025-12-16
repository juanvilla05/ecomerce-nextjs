/**
 * Tarjeta de Producto
 * Muestra info del producto con opciones de like y agregar al carrito
 */
"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../slices/cartSlice';
import { toggleLike } from '../slices/likesSlice';
import { RootState } from '../store';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import ProductModal from './ProductModal';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, description, price, image } = product;
  const dispatch = useDispatch();
  const likedProducts = useSelector((state: RootState) => state.likes.likedProducts);
  const isLiked = likedProducts.includes(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Agrega el producto al carrito
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addItem({ id, name: title, quantity: 1, price }));
    alert(`${title} añadido al carrito.`);
  };

  // Marca/desmarca el producto como favorito y sincroniza con localStorage
  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(id));
    const currentLikes = JSON.parse(localStorage.getItem('likes') || '[]');
    if (isLiked) {
      const filtered = currentLikes.filter((productId: number) => productId !== id);
      localStorage.setItem('likes', JSON.stringify(filtered));
    } else {
      currentLikes.push(id);
      localStorage.setItem('likes', JSON.stringify(currentLikes));
    }
  };

  // Abre el modal con detalles del producto
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={styles.imageContainer}>
          <Image src={image} alt={title} width={200} height={200} className={styles.image} />
          {/* Botón de like con estado visual */}
          <button 
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
            onClick={handleToggleLike}
            title={isLiked ? 'Quitar me gusta' : 'Me gusta'}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description.substring(0, 100)}...</p>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <button className={styles.cartButton} onClick={handleAddToCart}>
          🛒 Añadir al carrito
        </button>
      </div>
      
      {/* Modal que se abre al hacer click en la tarjeta */}
      <ProductModal 
        productId={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}