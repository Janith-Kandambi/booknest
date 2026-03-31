import { Router } from 'express';
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
} from '../controllers/book.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const bookRouter = Router();

bookRouter.use(requireAuth);

bookRouter.post('/', createBook);
bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBookById);
bookRouter.patch('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);

export default bookRouter;
