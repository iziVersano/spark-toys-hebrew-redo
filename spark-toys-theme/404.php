<?php defined('ABSPATH') || exit; get_header(); ?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
  <div class="max-w-md mx-auto">
    <h1 class="text-8xl font-extrabold text-coral mb-4">404</h1>
    <h2 class="text-3xl font-extrabold text-navy mb-4">הדף לא נמצא</h2>
    <p class="text-muted-foreground text-lg mb-8">מצטערים, הדף שחיפשתם אינו קיים.</p>
    <a href="<?php echo esc_url(home_url('/')); ?>"
       class="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-navy text-white font-bold hover:shadow-pop transition-all">
      חזרה לדף הבית
    </a>
  </div>
</main>
<?php get_footer(); ?>
