import { z } from 'zod/v4';
import ErrorResponse from '../utils/ErrorResponse.js';

const validateZod = (zodSchema) => (req, res, next) => {
    const { error } = zodSchema.safeParse(req.body);
    return error
        ? next(new ErrorResponse(z.prettifyError(error), 400))
        : next();
};

export default validateZod;
