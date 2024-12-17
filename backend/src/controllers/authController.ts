import { Request, Response } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password , name } = req.body;
    await registerUser(email, password, name);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {

    res.status(500).json({ message: (error as Error).message || 'Something went wrong' });
  }
};



export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
 
      const token = await loginUser(email, password);
  
      res.json({ token });
    } catch (error) {
  
      if ((error as Error).message === 'User not found') {
     
        res.status(202).json({ message: 'User not found' });
      } else {
      
        res.status(400).json({ message: (error as Error).message || 'Invalid credentials' });
      }
    }
  };

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await getCurrentUser(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || 'Unable to fetch user data' });
  }
};
