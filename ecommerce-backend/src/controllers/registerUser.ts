import { Request, Response } from 'express';
import { users } from '../data';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = {
    id: users.length + 1, // Incremental user ID
    name,
    email,
    password: hashedPassword, // Store the hashed password
  };

  // Store the new user in the in-memory users array
  users.push(newUser);

  // Generate a JWT token
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h', // Token expires in 1 hour
  });

  // Respond with the token
  res.status(201).json({ token });
};