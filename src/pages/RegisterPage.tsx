import React from 'react';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { Layout } from './Layout';

export const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};
