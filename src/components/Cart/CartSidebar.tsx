import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { Trash2, X } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const discountedPrice = item.product.price * (1 - item.product.discount / 100);
                return (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-gray-200 rounded">
                      {item.product.thumbnail_url && (
                        <img
                          src={item.product.thumbnail_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">${discountedPrice.toFixed(2)} x {item.quantity}</p>
                      <p className="font-semibold text-gray-900">
                        ${(discountedPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};
