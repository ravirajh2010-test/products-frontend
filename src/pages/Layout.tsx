import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { apiClient } from '../api/client';
import { CartSidebar } from '../components/Cart/CartSidebar';
import { ShoppingCart, LogOut, Plus } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    apiClient.logout();
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/products')}
              className="text-2xl font-bold text-red-600"
            >
              AliExpress
            </button>
          </div>

          <nav className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>

                {isAdmin && (
                  <button
                    onClick={() => navigate('/admin/create-product')}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                )}

                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCart size={24} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 AliExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
