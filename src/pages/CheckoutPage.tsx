import React from 'react';
import { Checkout } from '../components/Cart/Checkout';
import { Layout } from './Layout';

export const CheckoutPage: React.FC = () => {
  return (
    <Layout>
      <Checkout />
    </Layout>
  );
};
