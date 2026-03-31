import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import { validateLoginInput, validateRegisterInput } from '../utils/validation.js';
import { getCurrentUser, loginUser, registerUser } from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const errors = validateRegisterInput(req.body);

  if (errors.length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }

  const data = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data
  });
});

export const login = asyncHandler(async (req, res) => {
  const errors = validateLoginInput(req.body);

  if (errors.length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }

  const data = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data
  });
});

export const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.authUserId);

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});
