import { create } from 'zustand';
import { Product, ListProductsParams } from '../types';
import { apiClient } from '../api/client';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  total: number;
  loading: boolean;
  error: string | null;
  listProducts: (params?: ListProductsParams) => Promise<void>;
  getProduct: (id: number) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  total: 0,
  loading: false,
  error: null,

  listProducts: async (params?: ListProductsParams) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient.listProducts(params);
      set({
        products: data.items,
        total: data.total,
      });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  getProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const product = await apiClient.getProduct(id);
      set({ selectedProduct: product });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
