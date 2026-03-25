import React from 'react';
import { ProductDetail } from '../components/Products/ProductDetail';
import { Layout } from './Layout';

export const ProductDetailPage: React.FC = () => {
  return (
    <Layout>
      <ProductDetail />
    </Layout>
  );
};
