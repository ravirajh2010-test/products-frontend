import axios, { AxiosInstance } from 'axios';
import { Product, ListProductsParams, PaginatedResponse, Order, OrderItem, AuthResponse, LoginRequest, RegisterRequest } from '../types';

const API_BASE = 'http://localhost:8000/api/v1';

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage on init
    this.token = localStorage.getItem('access_token');
    if (this.token) {
      this.updateAuthHeader(this.token);
    }
  }

  private updateAuthHeader(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', credentials);
    
    // Store token
    this.token = response.data.access_token;
    localStorage.setItem('access_token', this.token);
    this.updateAuthHeader(this.token);
    
    return response.data;
  }

  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', credentials);
    
    // Store token
    this.token = response.data.access_token;
    localStorage.setItem('access_token', this.token);
    this.updateAuthHeader(this.token);
    
    return response.data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  getToken(): string | null {
    return this.token;
  }

  // Product endpoints
  async listProducts(params?: ListProductsParams) {
    const response = await this.client.get<PaginatedResponse<Product>>('/products', {
      params,
    });
    return response.data;
  }

  async getProduct(id: number) {
    const response = await this.client.get<Product>(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>) {
    const response = await this.client.post<Product>('/products', data);
    return response.data;
  }

  async updateProduct(
    id: number,
    data: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>>
  ) {
    const response = await this.client.put<Product>(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: number) {
    const response = await this.client.delete<Product>(`/products/${id}`);
    return response.data;
  }

  // Order endpoints (will be implemented after backend update)
  async createOrder(items: OrderItem[], userId: number) {
    const response = await this.client.post<Order>('/orders', {
      user_id: userId,
      items,
    });
    return response.data;
  }

  async getOrders(userId: number) {
    const response = await this.client.get<Order[]>(`/orders?user_id=${userId}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();
