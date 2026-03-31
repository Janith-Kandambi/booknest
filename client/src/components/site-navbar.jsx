import { BookOpenText, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/auth-context';
import { Button } from '@/components/ui/button';

export function SiteNavbar() {
  const { isAuthenticated, logout, initializing } = useAuth();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = useMemo(() => {
    if (isAuthenticated) {
      return [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'My Library', to: '/library' },
        { label: 'Add Book', to: '/books/new' }
      ];
    }

    return [
      { label: 'Login', to: '/login' },
      { label: 'Register', to: '/register' }
    ];
  }, [isAuthenticated]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function isActiveLink(path) {
    if (path === '/library') {
      return pathname === '/library' || pathname.startsWith('/books/');
    }

    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }

    return pathname === path;
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="group flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="rounded-xl bg-accent/15 p-1.5 text-accent transition group-hover:scale-105">
            <BookOpenText className="h-4 w-4" />
          </span>
          <span>BookNest</span>
        </Link>

        {!initializing && (
          <>
            <nav className="hidden items-center gap-2 md:flex">
              {navigationItems.map(item => (
                <Button key={item.to} asChild variant={isActiveLink(item.to) ? 'secondary' : 'ghost'} size="sm">
                  <Link to={item.to}>{item.label}</Link>
                </Button>
              ))}
              {isAuthenticated && (
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              )}
            </nav>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </>
        )}
      </div>

      {!initializing && mobileMenuOpen && (
        <nav className="border-t border-white/60 px-4 py-3 md:hidden sm:px-6">
          <div className="section-shell space-y-2 rounded-xl p-2">
            {navigationItems.map(item => (
              <Button
                key={item.to}
                asChild
                variant={isActiveLink(item.to) ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <Link to={item.to}>{item.label}</Link>
              </Button>
            ))}
            {isAuthenticated && (
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
