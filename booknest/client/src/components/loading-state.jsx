import { Loader2 } from 'lucide-react';

export function LoadingState({ text = 'Loading...', variant = 'spinner', rows = 3 }) {
  if (variant === 'skeleton') {
    return (
      <div className="section-shell space-y-3 p-6" aria-live="polite" aria-busy="true">
        <div className="h-5 w-40 animate-pulse rounded-md bg-slate-200/80" />
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-16 animate-pulse rounded-xl bg-slate-200/65" />
        ))}
        <p className="pt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    );
  }

  return (
    <div className="section-shell p-10 text-center text-sm text-muted-foreground">
      <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-accent" />
      {text}
    </div>
  );
}
