import mongoose from 'mongoose';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import {
  validateBookCreateInput,
  validateBookFilters,
  validateBookPatchInput
} from '../utils/validation.js';
import {
  createBookForUser,
  deleteBookForUser,
  getBookByIdForUser,
  listBooksForUser,
  updateBookForUser
} from '../services/book.service.js';

function assertValidObjectId(value) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new ApiError(400, 'Invalid resource id');
  }
}

export const createBook = asyncHandler(async (req, res) => {
  const errors = validateBookCreateInput(req.body);

  if (errors.length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }

  const book = await createBookForUser(req.authUserId, req.body);

  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: { book }
  });
});

export const getBooks = asyncHandler(async (req, res) => {
  const errors = validateBookFilters(req.query);

  if (errors.length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }

  const books = await listBooksForUser(req.authUserId, req.query);

  res.status(200).json({
    success: true,
    data: { books }
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id);

  const book = await getBookByIdForUser(req.authUserId, req.params.id);

  res.status(200).json({
    success: true,
    data: { book }
  });
});

export const updateBook = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id);

  const errors = validateBookPatchInput(req.body);

  if (errors.length > 0) {
    throw new ApiError(400, 'Validation failed', errors);
  }

  const book = await updateBookForUser(req.authUserId, req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: { book }
  });
});

export const deleteBook = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id);

  await deleteBookForUser(req.authUserId, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully'
  });
});
