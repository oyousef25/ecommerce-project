import { Request, Response } from 'express';
import { products } from '../data';
import jwt from 'jsonwebtoken';

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const addProduct = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: Please log in to add products' });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    const { name, price, description } = req.body;

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};