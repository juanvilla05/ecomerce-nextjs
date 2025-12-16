"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '../../slices/cartSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import styles from './ProductDetail.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ 
        id: product.id, 
        name: product.title, 
        quantity: quantity, 
        price: product.price 
      }));
      alert(`✅ ${quantity} x ${product.title} añadido${quantity > 1 ? 's' : ''} al carrito`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;
  if (!product) return <ErrorMessage message="Producto no encontrado" />;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className={styles.starFull}>★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className={styles.starHalf}>★</span>);
      } else {
        stars.push(<span key={i} className={styles.starEmpty}>☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Volver
      </button>

      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image 
              src={product.image} 
              alt={product.title} 
              width={500} 
              height={500}
              className={styles.productImage}
              priority
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.categoryBadge}>{product.category}</div>
          
          <h1 className={styles.title}>{product.title}</h1>
          
          {product.rating && (
            <div className={styles.rating}>
              <div className={styles.stars}>
                {renderStars(product.rating.rate)}
              </div>
              <span className={styles.ratingText}>
                {product.rating.rate.toFixed(1)} ({product.rating.count} reseñas)
              </span>
            </div>
          )}

          <div className={styles.priceSection}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.priceLabel}>Precio por unidad</span>
          </div>

          <div className={styles.description}>
            <h3>Descripción del producto</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.quantitySection}>
            <label className={styles.quantityLabel}>Cantidad:</label>
            <div className={styles.quantityControls}>
              <button 
                onClick={decrementQuantity} 
                className={styles.quantityBtn}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className={styles.quantityBtn}
              >
                +
              </button>
            </div>
            <span className={styles.totalPrice}>
              Total: ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          <div className={styles.actions}>
            <button onClick={handleAddToCart} className={styles.addToCartBtn}>
              🛒 Añadir al Carrito
            </button>
            <button onClick={handleBuyNow} className={styles.buyNowBtn}>
              💳 Comprar Ahora
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Envío gratis en compras mayores a $50</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Garantía de 30 días</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Devoluciones fáciles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}