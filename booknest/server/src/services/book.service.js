import { Book, BOOK_STATUSES } from '../models/book.model.js';
import { ApiError } from '../utils/api-error.js';

function toSortOption(sort) {
  return sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
}

export async function createBookForUser(userId, payload) {
  const book = await Book.create({
    user: userId,
    title: payload.title.trim(),
    author: payload.author.trim(),
    coverImageUrl: payload.coverImageUrl || '',
    status: payload.status || 'want_to_read',
    rating: payload.rating === '' ? null : (payload.rating ?? null),
    review: payload.review || '',
    notes: payload.notes || '',
    startedAt: payload.startedAt === '' ? null : (payload.startedAt || null),
    completedAt: payload.completedAt === '' ? null : (payload.completedAt || null)
  });

  return book;
}

export async function listBooksForUser(userId, query = {}) {
  const filter = { user: userId };

  if (query.status && BOOK_STATUSES.includes(query.status)) {
    filter.status = query.status;
  }

  if (query.search) {
    const safeSearch = query.search.trim();

    if (safeSearch) {
      filter.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { author: { $regex: safeSearch, $options: 'i' } }
      ];
    }
  }

  const books = await Book.find(filter).sort(toSortOption(query.sort));
  return books;
}

export async function getBookByIdForUser(userId, bookId) {
  const book = await Book.findOne({ _id: bookId, user: userId });

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  return book;
}

export async function updateBookForUser(userId, bookId, payload) {
  const nextData = {
    ...payload,
    title: payload.title?.trim(),
    author: payload.author?.trim(),
    coverImageUrl: payload.coverImageUrl ?? undefined,
    review: payload.review ?? undefined,
    notes: payload.notes ?? undefined,
    rating: payload.rating === '' ? null : payload.rating,
    startedAt: payload.startedAt === '' ? null : payload.startedAt,
    completedAt: payload.completedAt === '' ? null : payload.completedAt
  };

  const book = await Book.findOneAndUpdate(
    { _id: bookId, user: userId },
    nextData,
    {
      new: true,
      runValidators: true
    }
  );

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  return book;
}

export async function deleteBookForUser(userId, bookId) {
  const book = await Book.findOneAndDelete({ _id: bookId, user: userId });

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }
}
