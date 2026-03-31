import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '@/components/book-card';
import { EmptyState } from '@/components/empty-state';
import { LoadingState } from '@/components/loading-state';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';
import { BOOK_STATUS_OPTIONS } from '@/lib/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBooks } from '@/store/book-context';

export function LibraryPage() {
  const { books, loading, error, fetchBooks, deleteBook } = useBooks();
  const [filters, setFilters] = useState({ status: 'all', search: '', sort: 'newest' });

  useEffect(() => {
    fetchBooks(filters).catch(() => {});
  }, [fetchBooks, filters]);

  function onDelete(bookId) {
    deleteBook(bookId, filters).catch(() => {});
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">My Library</h1>
            <p className="mt-1 text-sm text-muted-foreground">Browse, filter, and refine your personal reading map.</p>
          </div>
          <Button asChild>
            <Link to="/books/new">Add Book</Link>
          </Button>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="section-shell grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                className="pl-9"
                placeholder="Search by title or author"
                value={filters.search}
                onChange={event => setFilters(prev => ({ ...prev, search: event.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={filters.status}
              onChange={event => setFilters(prev => ({ ...prev, status: event.target.value }))}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All statuses</option>
              {BOOK_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort">Sort</Label>
            <select
              id="sort"
              value={filters.sort}
              onChange={event => setFilters(prev => ({ ...prev, sort: event.target.value }))}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </motion.section>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {loading && <LoadingState text="Refreshing your personal library..." variant="skeleton" rows={5} />}

        {!loading && books.length === 0 && (
          <EmptyState
            title="No books match these filters"
            description="Try a broader search or add a new title to keep your shelf growing."
          />
        )}

        {!loading && books.length > 0 && (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {books.map(book => (
              <BookCard key={book._id} book={book} onDelete={onDelete} />
            ))}
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
