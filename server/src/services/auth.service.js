import { ApiError } from '../utils/api-error.js';
import { signAuthToken } from '../utils/jwt.js';
import { User } from '../models/user.model.js';

function authResponse(user) {
  return {
    token: signAuthToken(user._id.toString()),
    user
  };
}

export async function registerUser(payload) {
  const existingUser = await User.findOne({ email: payload.email.toLowerCase().trim() });

  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const user = await User.create({
    name: payload.name.trim(),
    email: payload.email.toLowerCase().trim(),
    password: payload.password,
    avatarUrl: payload.avatarUrl || ''
  });

  return authResponse(user);
}

export async function loginUser(payload) {
  const user = await User.findOne({ email: payload.email.toLowerCase().trim() }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  user.password = undefined;
  return authResponse(user);
}

export async function getCurrentUser(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
}
