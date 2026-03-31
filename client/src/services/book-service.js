import { apiRequest } from './api-client';

function toQueryString(filters = {}) {
  const params = new URLSearchParams();

  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.sort) {
    params.set('sort', filters.sort);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export const bookService = {
  async createBook(token, payload) {
    const response = await apiRequest('/books', {
      method: 'POST',
      token,
      body: payload
    });

    return response.data.book;
  },

  async getBooks(token, filters) {
    const response = await apiRequest(`/books${toQueryString(filters)}`, {
      method: 'GET',
      token
    });

    return response.data.books;
  },

  async getBookById(token, id) {
    const response = await apiRequest(`/books/${id}`, {
      method: 'GET',
      token
    });

    return response.data.book;
  },

  async updateBook(token, id, payload) {
    const response = await apiRequest(`/books/${id}`, {
      method: 'PATCH',
      token,
      body: payload
    });

    return response.data.book;
  },

  async deleteBook(token, id) {
    await apiRequest(`/books/${id}`, {
      method: 'DELETE',
      token
    });
  }
};
