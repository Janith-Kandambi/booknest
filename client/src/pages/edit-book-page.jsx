import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookForm } from '@/components/book-form';
import { LoadingState } from '@/components/loading-state';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBooks } from '@/store/book-context';

function toFormDate(dateValue) {
  if (!dateValue) {
    return '';
  }

  return new Date(dateValue).toISOString().split('T')[0];
}

export function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, updateBook } = useBooks();
  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoadingBook(true);
    getBookById(id)
      .then(nextBook => {
        setBook(nextBook);
        setError('');
      })
      .catch(requestError => {
        setError(requestError.message || 'Unable to load this book right now.');
      })
      .finally(() => setLoadingBook(false));
  }, [getBookById, id]);

  const initialValues = useMemo(() => {
    if (!book) {
      return null;
    }

    return {
      title: book.title,
      author: book.author,
      coverImageUrl: book.coverImageUrl || '',
      status: book.status,
      rating: book.rating || '',
      review: book.review || '',
      notes: book.notes || '',
      startedAt: toFormDate(book.startedAt),
      completedAt: toFormDate(book.completedAt)
    };
  }, [book]);

  async function handleSubmit(payload) {
    try {
      setSaving(true);
      setError('');
      await updateBook(id, payload);
      navigate(`/books/${id}`);
    } catch (requestError) {
      setError(requestError.message || 'Unable to save changes right now. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 via-background to-background">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        {loadingBook && <LoadingState text="Preparing book editor..." variant="skeleton" rows={4} />}

        {!loadingBook && error && <p className="text-sm text-red-600">{error}</p>}

        {!loadingBook && initialValues && (
          <Card className="section-shell">
            <CardHeader>
              <CardTitle>Edit Book</CardTitle>
              <p className="text-sm text-muted-foreground">Fine-tune details before your next reading session.</p>
            </CardHeader>
            <CardContent>
              <BookForm
                initialValues={initialValues}
                submitLabel="Save Changes"
                loading={saving}
                error={error}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
