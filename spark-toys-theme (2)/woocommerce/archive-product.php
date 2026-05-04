<?php
defined('ABSPATH') || exit;

$bg_cycle  = ['bg-sky-soft', 'bg-mint-soft', 'bg-sun-soft', 'bg-lilac-soft', 'bg-coral-soft'];
$tmpl_dir  = get_template_directory_uri();

$current_cat_slug = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : '';

$all_cats = get_terms([
    'taxonomy'   => 'product_cat',
    'hide_empty' => true,
    'orderby'    => 'count',
    'order'      => 'DESC',
    'number'     => 20,
]);
$main_cats = [];
if (!is_wp_error($all_cats)) {
    foreach ($all_cats as $c) {
        if (!in_array($c->slug, ['none', 'developmental-toys', 'learning-toys', 'uncategorized']) && $c->count > 0) {
            $main_cats[] = $c;
        }
    }
}

get_header();
?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

  <!-- Breadcrumb -->
  <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-8">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-coral transition-colors">בית</a>
    <span>/</span>
    <span class="text-navy font-semibold">כל המוצרים</span>
  </nav>

  <div class="mb-10">
    <h1 class="text-4xl sm:text-5xl font-extrabold text-navy">כל המוצרים</h1>
  </div>

  <div class="flex flex-col lg:flex-row gap-10">

    <!-- Sidebar -->
    <aside class="lg:w-56 shrink-0">
      <h2 class="text-base font-extrabold text-navy mb-4">קטגוריות</h2>
      <nav class="flex flex-row lg:flex-col flex-wrap gap-2">
        <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
           class="px-4 py-2 rounded-full text-sm font-semibold transition-colors <?php echo !$current_cat_slug ? 'bg-navy text-white' : 'bg-cream text-navy hover:bg-navy/10'; ?>">
          הכל
        </a>
        <?php foreach ($main_cats as $cat) :
            $active = ($current_cat_slug === $cat->slug); ?>
        <a href="<?php echo esc_url(get_post_type_archive_link('product') . '?category=' . urlencode($cat->slug)); ?>"
           class="px-4 py-2 rounded-full text-sm font-semibold transition-colors <?php echo $active ? 'bg-navy text-white' : 'bg-cream text-navy hover:bg-navy/10'; ?>">
          <?php echo esc_html($cat->name); ?>
          <span class="mr-1.5 text-xs opacity-60">(<?php echo esc_html($cat->count); ?>)</span>
        </a>
        <?php endforeach; ?>
      </nav>
    </aside>

    <!-- Product grid -->
    <div class="flex-1">
      <?php
      woocommerce_product_loop_start();
      if (woocommerce_product_loop()) :
          $i = 0;
          while (have_posts()) :
              the_post();
              global $product;
              $product_id = $product->get_id();
              $img_id     = $product->get_image_id();
              $img_src    = $img_id ? wp_get_attachment_image_url($img_id, 'medium') : '';
              $bg         = $bg_cycle[$i % count($bg_cycle)];
              $i++;
      ?>
      <article class="group bg-cream rounded-3xl p-4 border border-border/50 hover:shadow-card transition-all hover:-translate-y-1">
        <a href="<?php echo esc_url(get_permalink($product_id)); ?>">
          <div class="relative aspect-square rounded-2xl <?php echo esc_attr($bg); ?> mb-4 overflow-hidden">
            <?php if ($img_src) : ?>
            <img src="<?php echo esc_url($img_src); ?>" alt="<?php echo esc_attr($product->get_name()); ?>" loading="lazy"
                 class="object-contain p-3 w-full h-full transition-transform duration-500 group-hover:scale-110 drop-shadow-md">
            <?php else : ?>
            <div class="w-full h-full flex items-center justify-center text-4xl">🧸</div>
            <?php endif; ?>
          </div>
          <h3 class="text-sm sm:text-base font-bold text-navy line-clamp-2 leading-snug min-h-[40px]">
            <?php echo esc_html($product->get_name()); ?>
          </h3>
          <p class="text-xs text-muted-foreground mt-1 line-clamp-2 leading-snug min-h-[32px]">
            <?php echo esc_html(wp_strip_all_tags($product->get_short_description())); ?>
          </p>
        </a>
        <div class="mt-3 flex items-center justify-between">
          <div class="text-navy font-extrabold text-lg"><?php echo wp_kses_post($product->get_price_html()); ?></div>
          <?php if ($product->is_purchasable() && $product->is_in_stock()) : ?>
          <button data-product-id="<?php echo esc_attr($product_id); ?>"
                  data-product-name="<?php echo esc_attr($product->get_name()); ?>"
                  aria-label="<?php echo esc_attr('הוסף לעגלה: ' . $product->get_name()); ?>"
                  class="add-to-cart-btn h-9 w-9 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
          <?php endif; ?>
        </div>
      </article>
      <?php endwhile;
      else : ?>
      <div class="text-center py-20 text-muted-foreground">לא נמצאו מוצרים</div>
      <?php endif;
      woocommerce_product_loop_end(); ?>

      <!-- Pagination -->
      <?php woocommerce_pagination(); ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>
