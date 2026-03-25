import React from 'react';
import { LoginForm } from '../components/Auth/LoginForm';
import { Layout } from './Layout';

export const LoginPage: React.FC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};
