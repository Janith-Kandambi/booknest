import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookForm } from '@/components/book-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBooks } from '@/store/book-context';

export function AddBookPage() {
  const navigate = useNavigate();
  const { createBook } = useBooks();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(payload) {
    try {
      setSaving(true);
      setError('');
      await createBook(payload);
      navigate('/library');
    } catch (requestError) {
      setError(requestError.message || 'Unable to create book right now. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 via-background to-background">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <Card className="section-shell">
          <CardHeader>
            <CardTitle>Add Book</CardTitle>
            <p className="text-sm text-muted-foreground">Capture the essentials now. You can refine details anytime.</p>
          </CardHeader>
          <CardContent>
            <BookForm
              submitLabel="Create Book"
              loading={saving}
              error={error}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
