import { useMemo, useState } from 'react';
import { BOOK_STATUS_OPTIONS } from '@/lib/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const defaultValues = {
  title: '',
  author: '',
  coverImageUrl: '',
  status: 'want_to_read',
  rating: '',
  review: '',
  notes: '',
  startedAt: '',
  completedAt: ''
};

function normalizePayload(values) {
  return {
    ...values,
    title: values.title.trim(),
    author: values.author.trim(),
    coverImageUrl: values.coverImageUrl.trim(),
    review: values.review.trim(),
    notes: values.notes.trim(),
    rating: values.rating === '' ? null : Number(values.rating),
    startedAt: values.startedAt || null,
    completedAt: values.completedAt || null
  };
}

function validate(values) {
  if (!values.title.trim()) {
    return 'Title is required';
  }

  if (!values.author.trim()) {
    return 'Author is required';
  }

  if (values.rating !== '') {
    const rating = Number(values.rating);

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return 'Rating must be between 1 and 5';
    }
  }

  return '';
}

export function BookForm({
  initialValues,
  onSubmit,
  submitLabel,
  loading,
  error
}) {
  const mergedInitialValues = useMemo(
    () => ({ ...defaultValues, ...initialValues }),
    [initialValues]
  );

  const [values, setValues] = useState(mergedInitialValues);
  const [validationError, setValidationError] = useState('');

  function updateField(key, value) {
    setValues(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextError = validate(values);

    if (nextError) {
      setValidationError(nextError);
      return;
    }

    setValidationError('');
    await onSubmit(normalizePayload(values));
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={values.title}
            onChange={event => updateField('title', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={values.author}
            onChange={event => updateField('author', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="coverImageUrl">Cover Image URL</Label>
          <Input
            id="coverImageUrl"
            type="url"
            value={values.coverImageUrl}
            onChange={event => updateField('coverImageUrl', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={values.status}
            onChange={event => updateField('status', event.target.value)}
            disabled={loading}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {BOOK_STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={values.rating}
            onChange={event => updateField('rating', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startedAt">Started At</Label>
          <Input
            id="startedAt"
            type="date"
            value={values.startedAt}
            onChange={event => updateField('startedAt', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="completedAt">Completed At</Label>
          <Input
            id="completedAt"
            type="date"
            value={values.completedAt}
            onChange={event => updateField('completedAt', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="review">Short Review</Label>
          <Textarea
            id="review"
            value={values.review}
            onChange={event => updateField('review', event.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={values.notes}
            onChange={event => updateField('notes', event.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      {(validationError || error) && (
        <p className="text-sm text-red-600">{validationError || error}</p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </Button>

      {!loading && !validationError && !error && (
        <p className="text-xs text-muted-foreground">Your updates save instantly to your private library.</p>
      )}
    </form>
  );
}
