import { Router } from 'express';
import validateZod from '../middlewares/validateZod';
import { userSchema } from '../zod/schemas';
import { signInSchema } from '../zod/schemas';

const authRouter = Router();

authRouter.route('/signup').post(validateZod(userSchema));
authRouter.route('/signin').post(validateZod(signInSchema));
authRouter.route('/me').get();
