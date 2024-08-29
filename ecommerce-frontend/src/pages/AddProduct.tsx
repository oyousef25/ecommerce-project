import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Navbar from '../components/Navbar';
import api from '../services/api';
import '../styles/FormStyles.css';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a product');
        return;
      }

      await api.post('/products', { name, price, description }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/products');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('You must be logged in to add a product');
      } else {
        console.error('Error adding product', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="auth-title">Add New Product</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAddProduct} className="auth-form">
          <FormInput
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <FormInput
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="button-container">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;