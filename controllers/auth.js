import { isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const secret = process.env.JWT_SECRET;
const tokenOptions = { expiresIn: '7d' };

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'None' : 'Lax',
  secure: isProduction
};

const signup = async (req, res) => {
  const { email, password } = req.sanitizedBody;

  const found = await User.findOne({ email });

  if (found) throw new Error('Email already exists', { cause: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ ...req.sanitizedBody, password: hashedPassword });

  const payload = { userId: user._id };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie('token', token, cookieOptions);
  res.status(201).json({ success: 'Welcome' });
};

const signin = async (req, res) => {
  const { email, password } = req.sanitizedBody;

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new Error('User not found', { cause: 404 });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) throw new Error('Invalid email or password', { cause: 401 });

  const payload = { userId: user._id };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie('token', token, cookieOptions);

  res.status(201).json({ success: 'Welcome back' });
};

const me = async (req, res) => {
    
};
