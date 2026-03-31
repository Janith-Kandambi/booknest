import { BOOK_STATUS_LABELS } from '@/lib/book';
import { cn } from '@/lib/utils';

const statusStyles = {
  want_to_read: 'border-slate-200/80 bg-slate-100/80 text-slate-700',
  reading: 'border-amber-200/80 bg-amber-100/80 text-amber-800',
  completed: 'border-emerald-200/80 bg-emerald-100/80 text-emerald-800'
};

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm',
        statusStyles[status] || statusStyles.want_to_read
      )}
    >
      {BOOK_STATUS_LABELS[status] || BOOK_STATUS_LABELS.want_to_read}
    </span>
  );
}
