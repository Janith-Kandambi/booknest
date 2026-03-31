import { apiRequest } from './api-client';

export const authService = {
  async register(payload) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: payload
    });

    return response.data;
  },

  async login(payload) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: payload
    });

    return response.data;
  },

  async me(token) {
    const response = await apiRequest('/auth/me', {
      method: 'GET',
      token
    });

    return response.data;
  }
};
