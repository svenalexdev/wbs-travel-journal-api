import ErrorResponse from '../utils/ErrorResponse.js';

const validateZod = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    return error ? next(new ErrorResponse(error.message, 400)) : next();
};

export default validateZod;
