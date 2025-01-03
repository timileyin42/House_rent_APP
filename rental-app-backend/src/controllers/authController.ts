import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Function to handle user registration
export const registerUser  = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User  already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword, role });

    // Generate a JWT token with role included
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Include role in the token
      process.env.JWT_SECRET || '',
      { expiresIn: '30d' }
    );

    // Respond with the user details and the token
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Function to handle user login
export const loginUser  = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with role included
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Include role in the token
      process.env.JWT_SECRET || '',
      { expiresIn: '30d' }
    );

    // Respond with the user details and the token
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
