import { Link } from 'react-router-dom';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/book';

export function BookCard({ book, onDelete }) {
  return (
    <Card className="section-shell group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_45px_-24px_rgba(15,23,42,0.45)]">
      <div className="h-24 bg-gradient-to-r from-orange-100/75 via-amber-100/65 to-slate-100/75" />

      <CardHeader className="-mt-8 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-2 text-xl leading-tight">{book.title}</CardTitle>
          <StatusBadge status={book.status} />
        </div>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Rating: {book.rating || '-'}</p>
          <p>Updated: {formatDate(book.updatedAt)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="secondary">
            <Link to={`/books/${book._id}`}>View</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to={`/books/${book._id}/edit`}>Edit</Link>
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(book._id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
