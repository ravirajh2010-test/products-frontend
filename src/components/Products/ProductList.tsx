import React, { useEffect, useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { ProductCard } from './ProductCard';
import { Filters } from './Filters';
import { ListProductsParams } from '../../types';

export const ProductList: React.FC = () => {
  const { products, loading, error, listProducts } = useProductStore();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<ListProductsParams>({});

  useEffect(() => {
    listProducts({
      limit: 10,
      offset: page * 10,
      ...filters,
    });
  }, [page, filters, listProducts]);

  const handleFilter = (newFilters: ListProductsParams) => {
    setFilters(newFilters);
    setPage(0);
  };

  if (loading && products.length === 0) {
    return <div className="flex justify-center items-center py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm font-medium text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <Filters onFilter={handleFilter} />

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="py-2">Page {page + 1}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
