import { isValidObjectId } from 'mongoose';
import User from '../models/User';

const me = async (req, res) => {
  const { userId } = req;

  if (!isValidObjectId(userId)) throw new Error('Invalid id', { cause: 400 });

  const user = await User.findById(userId).lean();

  if (!user) throw new Error('User not found', { cause: 404 });

  res.json(user);
};

export default me;
