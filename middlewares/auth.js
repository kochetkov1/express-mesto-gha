import jwt from 'jsonwebtoken';

import { errorMessages } from '../utils/errorMessages.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

// export const auth = (req, res, next) => {
//   const { authorization = '' } = req.headers;
//   if (!authorization) {
//     next(new UnauthorizedError(errorMessages.needAuthorize));
//   } else {
//     const token = authorization.replace(/^Bearer*\s*/i, '');
//     try {
//       const decoded = jwt.verify(token, 'super-secret-key');
//       req.user = { _id: decoded._id };
//       next();
//     } catch (err) {
//       next(new UnauthorizedError(err.message));
//     }
//   }
// };

export const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.params);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('yoyoyo');
    return next(new UnauthorizedError(errorMessages.needAuthorize));
  }

  const token = authorization.replace(/^Bearer\s/i, '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    console.log('hohoho');
    next(new UnauthorizedError(err.message));
  }

  req.user = payload;
  return next();
};
