export interface User {
  id: number;
  email: string;
  is_admin: boolean;
  is_active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  thumbnail_url?: string;
  price: number;
  discount: number;
  sku: string;
  stock_quantity: number;
  is_available: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: number;
  items: OrderItem[];
  total_price: number;
  status: string;
  created_at: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
}

export interface ListProductsParams {
  limit?: number;
  offset?: number;
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}
