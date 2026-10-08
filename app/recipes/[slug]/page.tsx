import { notFound } from 'next/navigation';
import Link from 'next/link';
import { recipes, getRecipeBySlug } from '@/lib/recipes';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Users,
  ChefHat,
  Lightbulb,
  UtensilsCrossed,
} from 'lucide-react';

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return { title: 'Recipe Not Found — Saveur' };
  return {
    title: `${recipe.title} — Saveur`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.title} — Saveur`,
      description: recipe.description,
      images: [{ url: recipe.image }],
    },
  };
}

export default function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  const difficultyColor =
    recipe.difficulty === 'Easy'
      ? 'bg-success/15 text-success border-success/20'
      : recipe.difficulty === 'Medium'
      ? 'bg-warning/15 text-warning border-warning/20'
      : 'bg-destructive/15 text-destructive border-destructive/20';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ChefHat className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Saveur</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to recipes
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-5xl px-4 pb-6 sm:px-6 sm:pb-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge className="border-0 bg-white/90 text-foreground shadow-sm">
                {recipe.cuisine}
              </Badge>
              <Badge className="border-0 bg-white/90 text-foreground shadow-sm">
                {recipe.category}
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-5xl">
              {recipe.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-lg text-muted-foreground">{recipe.description}</p>

        {/* Stats Bar */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Prep Time</p>
              <p className="text-sm font-semibold">{recipe.prepTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
            <Flame className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Cook Time</p>
              <p className="text-sm font-semibold">{recipe.cookTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
            <Users className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Servings</p>
              <p className="text-sm font-semibold">{recipe.servings}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
            <Star className="h-5 w-5 shrink-0 fill-accent text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="text-sm font-semibold">{recipe.rating} / 5</p>
            </div>
          </div>
        </div>

        {/* Difficulty + Calories */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${difficultyColor}`}
          >
            <ChefHat className="mr-1.5 h-3 w-3" />
            {recipe.difficulty}
          </span>
          <span className="text-sm text-muted-foreground">
            {recipe.calories} calories per serving
          </span>
        </div>

        <Separator className="my-8" />

        {/* Ingredients + Instructions */}
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Ingredients */}
          <div>
            <div className="sticky top-24">
              <div className="mb-4 flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Ingredients</h2>
              </div>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border/40 bg-card p-3 text-sm transition-colors hover:border-primary/30"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Instructions</h2>
            </div>
            <ol className="space-y-5">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    {i < recipe.instructions.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <p className="pb-2 pt-1.5 text-sm leading-relaxed text-foreground/90">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {/* Tips */}
            {recipe.tips.length > 0 && (
              <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Chef&apos;s Tips</h3>
                </div>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 border-t border-border/60 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
