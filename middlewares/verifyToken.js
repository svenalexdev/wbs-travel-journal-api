import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  if (!req.headers.cookie) {
    next(new Error('Unauthorized, please sign in', { cause: 401 }));
  }
  //console.log(req.headers.cookie)

  const cookies = req.headers.cookie?.split('; ');
  // console.log(cookies);

  const cookieArray = cookies.map
};
