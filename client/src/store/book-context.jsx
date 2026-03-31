import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/store/auth-context';
import { bookService } from '@/services/book-service';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setBooks([]);
      setError('');
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchBooks = useCallback(async (filters = {}) => {
    if (!isAuthenticated || !token) {
      setBooks([]);
      return [];
    }

    setLoading(true);
    setError('');

    try {
      const nextBooks = await bookService.getBooks(token, filters);
      setBooks(nextBooks);
      return nextBooks;
    } catch (requestError) {
      const message = requestError.message || 'Failed to fetch books';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  const createBook = useCallback(async (payload, refreshFilters = {}) => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    const book = await bookService.createBook(token, payload);
    await fetchBooks(refreshFilters);
    return book;
  }, [fetchBooks, token]);

  const getBookById = useCallback(async id => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    return bookService.getBookById(token, id);
  }, [token]);

  const updateBook = useCallback(async (id, payload, refreshFilters = {}) => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    const book = await bookService.updateBook(token, id, payload);
    await fetchBooks(refreshFilters);
    return book;
  }, [fetchBooks, token]);

  const deleteBook = useCallback(async (id, refreshFilters = {}) => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    await bookService.deleteBook(token, id);
    await fetchBooks(refreshFilters);
  }, [fetchBooks, token]);

  const value = useMemo(() => ({
    books,
    loading,
    error,
    fetchBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook
  }), [books, loading, error, fetchBooks, createBook, getBookById, updateBook, deleteBook]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }

  return context;
}
