<?php defined('ABSPATH') || exit; get_header(); ?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
  <h1 class="text-4xl font-extrabold text-navy mb-10"><?php the_archive_title(); ?></h1>
  <div class="grid gap-6">
    <?php while (have_posts()) : the_post(); ?>
    <article class="bg-cream rounded-2xl p-6 border border-border/50">
      <h2 class="text-xl font-bold text-navy mb-2"><a href="<?php the_permalink(); ?>" class="hover:text-coral transition-colors"><?php the_title(); ?></a></h2>
      <p class="text-sm text-muted-foreground mb-3"><?php the_date(); ?></p>
      <div class="text-navy/80"><?php the_excerpt(); ?></div>
    </article>
    <?php endwhile; ?>
  </div>
</main>
<?php get_footer(); ?>
