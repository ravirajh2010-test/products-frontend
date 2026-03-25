import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedProduct, loading, error, getProduct } = useProductStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      getProduct(Number(id));
    }
  }, [id, getProduct]);

  if (loading) {
    return <div className="flex justify-center items-center py-12">Loading...</div>;
  }

  if (error || !selectedProduct) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm font-medium text-red-800">Error: {error || 'Product not found'}</p>
      </div>
    );
  }

  const discountedPrice = selectedProduct.price * (1 - selectedProduct.discount / 100);

  const handleAddToCart = () => {
    addItem(selectedProduct, quantity);
    navigate('/checkout');
  };

  return (
    <div>
      <button
        onClick={() => navigate('/products')}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
            {selectedProduct.thumbnail_url ? (
              <img
                src={selectedProduct.thumbnail_url}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
              <p className="text-gray-600 mb-4">SKU: {selectedProduct.sku}</p>
              <p className="text-lg text-gray-600 mb-6">{selectedProduct.category}</p>

              <div className="mb-6">
                <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {selectedProduct.discount > 0 ? (
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    <span className="text-lg font-semibold text-red-600">
                      {selectedProduct.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Availability */}
              <div className="mb-6">
                {selectedProduct.stock_quantity > 0 ? (
                  <p className="text-green-600 font-medium">In Stock ({selectedProduct.stock_quantity} available)</p>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>
            </div>

            {/* Actions */}
            {selectedProduct.stock_quantity > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.stock_quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
                >
                  <ShoppingCart size={20} />
                  Add to Cart & Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
