import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showPrice: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showPrice }) => {
  return (
    <div className="product-card bg-[#1e293b] rounded-lg p-6 flex flex-col items-center justify-center w-full max-w-xs h-full">
      <img src={product.imageUrl} alt={product.name} className="product-image w-40 h-40 object-cover rounded-full mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
      {showPrice && <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>}
      {!showPrice && (
        <>
          <p className="text-lg text-white">has</p>
          <p className="text-lg mt-2 text-white">price</p>
        </>
      )}
    </div>
  );
};

export default ProductCard;