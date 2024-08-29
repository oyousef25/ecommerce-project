import React from 'react';
import { Product } from '../types/Product';
import '../styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p className="price">${product.price}</p>
    <p>{product.description}</p>
    <button onClick={() => onDelete(product.id)}>Delete</button>
  </div>
);

export default ProductCard;