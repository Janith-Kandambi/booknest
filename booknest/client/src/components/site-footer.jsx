import { BookOpenText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
            <span className="rounded-xl bg-accent/15 p-1.5 text-accent">
              <BookOpenText className="h-4 w-4" />
            </span>
            BookNest
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A premium personal reading companion for tracking progress, reflections, and momentum with clarity.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Navigation</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link className="transition-colors hover:text-foreground" to="/dashboard">Dashboard</Link>
            <Link className="transition-colors hover:text-foreground" to="/library">My Library</Link>
            <Link className="transition-colors hover:text-foreground" to="/books/new">Add Book</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Credits</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Created by Janith, a student of IU International University of Applied Sciences, Germany.
          </p>
          <p className="text-xs text-muted-foreground/85">© {year} BookNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
