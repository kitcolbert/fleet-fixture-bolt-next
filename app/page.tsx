'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { recipes } from '@/lib/recipes';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Clock,
  Flame,
  Star,
  ChefHat,
  UtensilsCrossed,
} from 'lucide-react';

const categories = [
  'All',
  'Breakfast',
  'Main',
  'Pasta',
  'Pizza',
  'Salad',
  'Soup',
  'Dessert',
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesQuery =
        query === '' ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        r.ingredients.some((i) =>
          i.toLowerCase().includes(query.toLowerCase())
        );
      const matchesCategory =
        activeCategory === 'All' || r.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ChefHat className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Saveur</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
            <Link href="/" className="transition-colors hover:text-foreground">
              Recipes
            </Link>
            <a
              href="#browse"
              className="transition-colors hover:text-foreground"
            >
              Browse
            </a>
            <a
              href="#about"
              className="transition-colors hover:text-foreground"
            >
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 border-primary/20 bg-primary/10 text-primary"
            >
              <UtensilsCrossed className="mr-1.5 h-3 w-3" />
              {recipes.length} recipes & counting
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Cook something{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                delicious
              </span>{' '}
              tonight
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Browse our collection of tested recipes from around the world.
              Find your next meal in seconds.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-lg">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, cuisine, or ingredient..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 border-border/80 bg-card pl-12 pr-4 text-base shadow-sm transition-all focus-visible:ring-primary/40"
                aria-label="Search recipes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section
        id="browse"
        className="sticky top-[65px] z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            {activeCategory === 'All' ? 'All Recipes' : activeCategory}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No recipes found</h3>
            <p className="mt-1 text-muted-foreground">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe, idx) => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group block animate-fade-up"
                style={{
                  animationDelay: `${idx * 60}ms`,
                  opacity: 0,
                }}
              >
                <Card className="overflow-hidden border-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className="border-0 bg-white/90 text-foreground shadow-sm">
                        {recipe.cuisine}
                      </Badge>
                    </div>
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {recipe.rating}
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs font-medium text-white">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5" />
                        {recipe.cookTime}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold leading-snug transition-colors group-hover:text-primary">
                      {recipe.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {recipe.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
                      <span className="text-xs text-muted-foreground">
                        {recipe.calories} cal · {recipe.servings} servings
                      </span>
                      <span className="text-xs font-medium text-primary transition-transform group-hover:translate-x-0.5">
                        View recipe →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <ChefHat className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Tested & Trusted</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Every recipe is kitchen-tested so you can cook with confidence.
              </p>
            </div>
            <div>
              <Clock className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Quick to Find</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Search by ingredient, cuisine, or dish name to find exactly what
                you need.
              </p>
            </div>
            <div>
              <Star className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Community Favorites</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Recipes rated by home cooks so you know which ones to try first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          <p>
            Saveur — A recipe browser for home cooks. Photos courtesy of Pexels.
          </p>
        </div>
      </footer>
    </div>
  );
}
