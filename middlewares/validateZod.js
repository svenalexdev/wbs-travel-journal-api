import { z } from 'zod/v4';

const validateZod = zodSchema => (req, res, next) => {
  const { error } = zodSchema.safeParse(req.body);
  return error ? next(new Error(z.prettifyError(error), { cause: 400 })) : next();
};

export default validateZod;
