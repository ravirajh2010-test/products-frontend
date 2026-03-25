import React from 'react';
import { ProductList } from '../components/Products/ProductList';
import { Layout } from './Layout';

export const ProductsPage: React.FC = () => {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};
