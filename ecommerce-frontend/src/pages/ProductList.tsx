import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { Product } from '../types/Product';
import '../styles/ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in again.');
        return;
      }
  
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setProducts(products.filter((product) => product.id !== id));
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Invalid or expired token.');
      } else {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="page-title">Product List</h2>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;