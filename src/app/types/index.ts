import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
  }
}

// Interfaces de Usuario
export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'user' | 'admin';
  image?: string;
  createdAt?: Date;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Interfaces de Producto
export interface Product {
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

export interface ProductFormData {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

// Interfaces de Carrito
export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id?: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}

// Interfaces de Estado de Redux
export interface CartState {
  items: CartItem[];
}

export interface LikesState {
  likedProducts: number[];
}

export interface RootState {
  cart: CartState;
  likes: LikesState;
}

// Tipos de Autenticación
export type AuthRole = 'admin' | 'user';

// Tipos de Respuesta de API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  id: number;
}