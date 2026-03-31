import mongoose from 'mongoose';

export const BOOK_STATUSES = ['want_to_read', 'reading', 'completed'];

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160
    },
    coverImageUrl: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: BOOK_STATUSES,
      default: 'want_to_read',
      index: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    review: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1200
    },
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 4000
    },
    startedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

bookSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

export const Book = mongoose.model('Book', bookSchema);
