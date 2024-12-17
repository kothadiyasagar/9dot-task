import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET as string;


export const registerUser = async (email: string, password: string , name:string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword ,name });
  await newUser.save();
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};


export const getCurrentUser = async (userId: string) => {
  return await User.findById(userId).select('-password');
};
