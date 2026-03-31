export const BOOK_STATUS_OPTIONS = [
  { value: 'want_to_read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'completed', label: 'Completed' }
];

export const BOOK_STATUS_LABELS = {
  want_to_read: 'Want to Read',
  reading: 'Reading',
  completed: 'Completed'
};

export function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString();
}
