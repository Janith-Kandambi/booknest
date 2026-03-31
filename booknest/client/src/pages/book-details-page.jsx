import { motion } from 'framer-motion';
import { CalendarDays, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingState } from '@/components/loading-state';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/book';
import { useBooks } from '@/store/book-context';

export function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, deleteBook } = useBooks();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    getBookById(id)
      .then(nextBook => {
        setBook(nextBook);
        setError('');
      })
      .catch(requestError => {
        setError(requestError.message || 'Failed to load book');
      })
      .finally(() => setLoading(false));
  }, [getBookById, id]);

  async function handleDelete() {
    try {
      await deleteBook(id);
      navigate('/library');
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete book');
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        {loading && <LoadingState text="Loading book profile..." variant="skeleton" rows={4} />}
        {!loading && error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && book && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Card className="section-shell overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-orange-100/80 via-amber-100/70 to-slate-100/70" />

              <CardHeader className="-mt-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-3xl font-extrabold tracking-tight">{book.title}</CardTitle>
                  <StatusBadge status={book.status} />
                </div>
                <p className="text-muted-foreground">by {book.author}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-3 rounded-xl border bg-white/75 p-4 text-sm sm:grid-cols-2">
                  <p className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-accent" /> Rating: {book.rating || '-'}</p>
                  <p className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" /> Started: {formatDate(book.startedAt)}</p>
                  <p>Completed: {formatDate(book.completedAt)}</p>
                  <p>Updated: {formatDate(book.updatedAt)}</p>
                </div>

                {book.review && (
                  <div className="space-y-2 rounded-xl border bg-white/70 p-4">
                    <p className="text-sm font-semibold">Review</p>
                    <p className="text-sm text-muted-foreground">{book.review}</p>
                  </div>
                )}

                {book.notes && (
                  <div className="space-y-2 rounded-xl border bg-white/70 p-4">
                    <p className="text-sm font-semibold">Notes</p>
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{book.notes}</p>
                  </div>
                )}

                {book.coverImageUrl && (
                  <div className="space-y-2 rounded-xl border bg-white/70 p-4">
                    <p className="text-sm font-semibold">Cover URL</p>
                    <p className="break-all text-sm text-muted-foreground">{book.coverImageUrl}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="secondary">
                    <Link to={`/books/${book._id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="outline" onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/library">Back to Library</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
