import { Inbox } from 'lucide-react';

export function EmptyState({ title, description }) {
  return (
    <div className="section-shell border-dashed p-10 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/12 text-accent">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
