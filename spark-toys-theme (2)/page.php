<?php defined('ABSPATH') || exit; get_header(); ?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
  <?php while (have_posts()) : the_post(); ?>
  <article class="prose prose-lg max-w-none text-right">
    <h1 class="text-4xl font-extrabold text-navy mb-8"><?php the_title(); ?></h1>
    <?php the_content(); ?>
  </article>
  <?php endwhile; ?>
</main>
<?php get_footer(); ?>
