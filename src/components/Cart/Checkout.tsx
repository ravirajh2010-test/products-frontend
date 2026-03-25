import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { ArrowLeft } from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Razorpay payment options
      const options = {
        key: 'rzp_test_1DP5jI8Tx2YJ0e', // Test key (replace with your actual key)
        amount: Math.round(totalPrice * 100), // Amount in paise (convert to paise)
        currency: 'INR',
        name: 'AliExpress',
        description: 'Purchase Order',
        order_id: `ORD-${Date.now()}-${user.id}`, // Unique order ID
        handler: async function (response: any) {
          // Handle successful payment
          try {
            setSuccessMessage(
              `Payment Successful! Transaction ID: ${response.razorpay_payment_id}`
            );
            
            // TODO: Convert cart items to order items and send to backend
            // const orderItems = items.map((item) => ({
            //   product_id: item.product.id,
            //   quantity: item.quantity,
            //   price: item.product.price,
            //   discount: item.product.discount,
            // }));
            // const order = await apiClient.createOrder(orderItems, user.id);

            clearCart();

            setTimeout(() => {
              navigate('/products');
            }, 3000);
          } catch (err: any) {
            setError('Payment recorded but order creation failed. Please contact support.');
          }
        },
        prefill: {
          name: user.email.split('@')[0],
          email: user.email,
          contact: '9999999999', // Dummy contact
        },
        theme: {
          color: '#dc2626', // Red color (AliExpress theme)
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('Payment cancelled. Please try again.');
          },
        },
      };

      // Open Razorpay checkout
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      setLoading(false);
    }
  };

  if (items.length === 0 && !successMessage) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 hover:text-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/products')}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {successMessage && (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {items.map((item) => {
              const discountedPrice = item.product.price * (1 - item.product.discount / 100);
              return (
                <div key={item.product.id} className="flex justify-between pb-4 border-b">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${discountedPrice.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(discountedPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Checkout Panel */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Proceed to Payment</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {!user && (
            <div className="rounded-md bg-blue-50 p-4 mb-6">
              <p className="text-sm text-blue-800">Please log in to complete your purchase</p>
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading || !user}
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Proceed to Razorpay'}
          </button>

          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="w-full mt-3 border border-red-600 text-red-600 py-2 rounded font-semibold hover:bg-red-50"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
