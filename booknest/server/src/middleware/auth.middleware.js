import { ApiError } from '../utils/api-error.js';
import { verifyAuthToken } from '../utils/jwt.js';

export function requireAuth(req, _res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Authentication token is missing'));
  }

  try {
    const payload = verifyAuthToken(token);
    req.authUserId = payload.sub;
    return next();
  } catch {
    return next(new ApiError(401, 'Invalid or expired authentication token'));
  }
}
