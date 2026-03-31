import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';
import { useAuth } from '@/store/auth-context';

function validateLogin(values) {
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    return 'Please enter a valid email address';
  }

  if (!values.password) {
    return 'Password is required';
  }

  return '';
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated, initializing } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formDisabled = useMemo(() => loading || initializing, [loading, initializing]);

  if (!initializing && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const validationError = validateLogin(values);

    if (validationError) {
      setError(validationError);
      setSuccess('');
      return;
    }

    try {
      setError('');
      setSuccess('');
      await login(values);
      setSuccess('Login successful. Redirecting to your dashboard...');
      setTimeout(() => navigate('/dashboard'), 450);
    } catch (submitError) {
      setSuccess('');
      setError(submitError.message || 'Login failed');
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 via-background to-background">
      <SiteNavbar />
      <main className="mx-auto grid w-full max-w-md flex-1 px-5 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome back to BookNest.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={event => setValues(prev => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  disabled={formDisabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={event => setValues(prev => ({ ...prev, password: event.target.value }))}
                  placeholder="••••••••"
                  disabled={formDisabled}
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-emerald-700">{success}</p>}

              <Button type="submit" className="w-full" disabled={formDisabled}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="mt-4 text-sm text-muted-foreground">
              No account yet?{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
