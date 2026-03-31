export function validateRegisterInput(payload = {}) {
  const errors = [];

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email)) {
    errors.push('A valid email is required');
  }

  if (!payload.password || payload.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
}

export function validateLoginInput(payload = {}) {
  const errors = [];

  if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email)) {
    errors.push('A valid email is required');
  }

  if (!payload.password) {
    errors.push('Password is required');
  }

  return errors;
}

const BOOK_STATUSES = ['want_to_read', 'reading', 'completed'];

function isValidDateInput(value) {
  if (value === null || value === undefined || value === '') {
    return true;
  }

  return !Number.isNaN(Date.parse(value));
}

export function validateBookCreateInput(payload = {}) {
  const errors = [];

  if (!payload.title || payload.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!payload.author || payload.author.trim().length === 0) {
    errors.push('Author is required');
  }

  if (payload.status && !BOOK_STATUSES.includes(payload.status)) {
    errors.push('Status must be one of: want_to_read, reading, completed');
  }

  if (payload.rating !== undefined && payload.rating !== null && payload.rating !== '') {
    const numericRating = Number(payload.rating);

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      errors.push('Rating must be between 1 and 5');
    }
  }

  if (payload.review && payload.review.length > 1200) {
    errors.push('Review must be 1200 characters or fewer');
  }

  if (payload.notes && payload.notes.length > 4000) {
    errors.push('Notes must be 4000 characters or fewer');
  }

  if (!isValidDateInput(payload.startedAt)) {
    errors.push('startedAt must be a valid date');
  }

  if (!isValidDateInput(payload.completedAt)) {
    errors.push('completedAt must be a valid date');
  }

  return errors;
}

export function validateBookPatchInput(payload = {}) {
  const errors = [];
  const allowedFields = [
    'title',
    'author',
    'coverImageUrl',
    'status',
    'rating',
    'review',
    'notes',
    'startedAt',
    'completedAt'
  ];
  const keys = Object.keys(payload);

  if (keys.length === 0) {
    errors.push('At least one field is required for update');
    return errors;
  }

  for (const key of keys) {
    if (!allowedFields.includes(key)) {
      errors.push(`Unsupported field: ${key}`);
    }
  }

  if (payload.title !== undefined && !String(payload.title).trim()) {
    errors.push('Title cannot be empty');
  }

  if (payload.author !== undefined && !String(payload.author).trim()) {
    errors.push('Author cannot be empty');
  }

  if (payload.status !== undefined && !BOOK_STATUSES.includes(payload.status)) {
    errors.push('Status must be one of: want_to_read, reading, completed');
  }

  if (payload.rating !== undefined && payload.rating !== null && payload.rating !== '') {
    const numericRating = Number(payload.rating);

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      errors.push('Rating must be between 1 and 5');
    }
  }

  if (payload.review !== undefined && payload.review.length > 1200) {
    errors.push('Review must be 1200 characters or fewer');
  }

  if (payload.notes !== undefined && payload.notes.length > 4000) {
    errors.push('Notes must be 4000 characters or fewer');
  }

  if (payload.startedAt !== undefined && !isValidDateInput(payload.startedAt)) {
    errors.push('startedAt must be a valid date');
  }

  if (payload.completedAt !== undefined && !isValidDateInput(payload.completedAt)) {
    errors.push('completedAt must be a valid date');
  }

  return errors;
}

export function validateBookFilters(query = {}) {
  const errors = [];

  if (query.status && !BOOK_STATUSES.includes(query.status)) {
    errors.push('status filter must be one of: want_to_read, reading, completed');
  }

  if (query.sort && !['newest', 'oldest'].includes(query.sort)) {
    errors.push('sort filter must be newest or oldest');
  }

  return errors;
}
