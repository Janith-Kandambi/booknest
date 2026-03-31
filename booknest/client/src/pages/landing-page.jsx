import { motion } from 'framer-motion';
import { ArrowRight, BookMarked, LibraryBig, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroCanvas } from '@/components/hero-canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketingLayout } from '@/layouts/marketing-layout';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.55, ease: 'easeOut' }
};

export function LandingPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-foreground/80">
            <Sparkles className="h-4 w-4 text-accent" />
            Personal reading command center
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Give every book a
            <span className="block text-accent">clear place in your life.</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            BookNest is the lightweight reading command center for ambitious readers: capture your queue, track active reads, and turn finished books into usable insights.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="min-w-[145px]">
              <Link to="/register">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[145px]">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.08 }}>
          <Card className="section-shell overflow-hidden border-orange-100/80">
            <CardHeader className="pb-4">
              <CardTitle>Elegant reading cockpit</CardTitle>
              <CardDescription>Lightweight Three.js accent inspired by book forms and calm motion.</CardDescription>
            </CardHeader>
            <CardContent>
              <HeroCanvas />
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <motion.section {...reveal} className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-20 sm:px-6 md:grid-cols-3">
        <Card className="section-shell">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><BookMarked className="h-5 w-5 text-accent" /> Thoughtful Tracking</CardTitle>
            <CardDescription>Keep titles, status, ratings, and reflections in one focused place.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="section-shell">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><LibraryBig className="h-5 w-5 text-accent" /> Organized Library</CardTitle>
            <CardDescription>Filter by reading stage and find any book instantly with search.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="section-shell">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-accent" /> Demo-Ready UI</CardTitle>
            <CardDescription>Polished interactions, responsive layout, and clean visual hierarchy.</CardDescription>
          </CardHeader>
        </Card>
      </motion.section>
    </MarketingLayout>
  );
}
