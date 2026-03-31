import { motion } from 'framer-motion';
import { BookMarked, CircleCheckBig, Clock3, LibraryBig } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '@/components/book-card';
import { EmptyState } from '@/components/empty-state';
import { LoadingState } from '@/components/loading-state';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBooks } from '@/store/book-context';

function StatCard({ label, value, icon: Icon, accentClass }) {
  return (
    <Card className="section-shell h-full transition duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
        <span className={`rounded-lg p-2 ${accentClass}`}>
          <Icon className="h-4 w-4" />
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-extrabold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const { books, loading, error, fetchBooks, deleteBook } = useBooks();

  useEffect(() => {
    fetchBooks({ sort: 'newest' }).catch(() => {});
  }, [fetchBooks]);

  const summary = useMemo(() => {
    const total = books.length;
    const wantToRead = books.filter(book => book.status === 'want_to_read').length;
    const reading = books.filter(book => book.status === 'reading').length;
    const completed = books.filter(book => book.status === 'completed').length;

    return { total, wantToRead, reading, completed };
  }, [books]);

  const recentBooks = useMemo(() => books.slice(0, 4), [books]);

  function handleDelete(bookId) {
    deleteBook(bookId, { sort: 'newest' }).catch(() => {});
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">A premium view of your personal reading velocity.</p>
          </div>
          <Button asChild>
            <Link to="/books/new">Add Book</Link>
          </Button>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard label="Total Books" value={summary.total} icon={LibraryBig} accentClass="bg-slate-100 text-slate-700" />
          <StatCard label="Want to Read" value={summary.wantToRead} icon={BookMarked} accentClass="bg-orange-100 text-orange-700" />
          <StatCard label="Reading" value={summary.reading} icon={Clock3} accentClass="bg-amber-100 text-amber-700" />
          <StatCard label="Completed" value={summary.completed} icon={CircleCheckBig} accentClass="bg-emerald-100 text-emerald-700" />
        </motion.section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Recent Books</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/library">Open My Library</Link>
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {loading && <LoadingState text="Preparing your latest reading snapshot..." variant="skeleton" rows={4} />}

          {!loading && recentBooks.length === 0 && (
            <EmptyState
              title="Your library is ready"
              description="Add your first title to populate dashboard insights and recent activity."
            />
          )}

          {!loading && recentBooks.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {recentBooks.map(book => (
                <BookCard key={book._id} book={book} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
