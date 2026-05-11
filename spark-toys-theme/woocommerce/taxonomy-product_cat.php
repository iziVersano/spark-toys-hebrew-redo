<?php
defined('ABSPATH') || exit;

$bg_cycle = ['bg-sky-soft', 'bg-mint-soft', 'bg-sun-soft', 'bg-lilac-soft', 'bg-coral-soft'];
$term     = get_queried_object();

get_header();
?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

  <!-- Breadcrumb -->
  <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-8">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-coral transition-colors">בית</a>
    <span>/</span>
    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="hover:text-coral transition-colors">כל המוצרים</a>
    <span>/</span>
    <span class="text-navy font-semibold"><?php echo esc_html($term->name); ?></span>
  </nav>

  <div class="mb-10">
    <h1 class="text-4xl sm:text-5xl font-extrabold text-navy"><?php echo esc_html($term->name); ?></h1>
    <?php if ($term->description) : ?>
    <p class="mt-2 text-muted-foreground text-lg"><?php echo esc_html($term->description); ?></p>
    <?php endif; ?>
    <p class="mt-1 text-muted-foreground"><?php echo (int) $term->count; ?> מוצרים</p>
  </div>

  <?php if (!have_posts()) : ?>
  <div class="text-center py-20">
    <p class="text-muted-foreground text-lg mb-6">לא נמצאו מוצרים בקטגוריה זו</p>
    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
       class="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-navy text-white font-bold">
      לכל המוצרים
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    </a>
  </div>
  <?php else : ?>
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    <?php
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
        <p class="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[32px]">
          <?php echo esc_html(wp_strip_all_tags($product->get_short_description())); ?>
        </p>
      </a>
      <div class="mt-3 flex items-center justify-between">
        <div class="text-navy font-extrabold text-lg"><?php echo wp_kses_post($product->get_price_html()); ?></div>
        <?php if ($product->is_purchasable() && $product->is_in_stock()) : ?>
        <button data-product-id="<?php echo esc_attr($product_id); ?>"
                data-product-name="<?php echo esc_attr($product->get_name()); ?>"
                class="add-to-cart-btn h-9 w-9 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </button>
        <?php endif; ?>
      </div>
    </article>
    <?php endwhile; ?>
  </div>

  <?php
  global $wp_query;
  $pages = $wp_query && $wp_query->max_num_pages ? (int) $wp_query->max_num_pages : 1;
  if ($pages > 1) :
      $current = max(1, get_query_var('paged'));
      $links = paginate_links([
          'base'      => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),
          'format'    => '?paged=%#%',
          'current'   => $current,
          'total'     => $pages,
          'mid_size'  => 1,
          'end_size'  => 1,
          'prev_text' => '→',
          'next_text' => '←',
          'type'      => 'array',
      ]);
  ?>
  <nav dir="rtl" class="mt-12 flex justify-center" aria-label="ניווט בעמודים">
    <ul class="inline-flex flex-wrap items-center gap-2">
      <?php
      $base_cls = 'inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-full text-sm font-bold transition-colors';
      foreach ((array) $links as $link) :
          $is_current = strpos($link, 'current') !== false;
          $is_dots    = strpos($link, 'dots')    !== false;
          if ($is_current) {
              $cls = $base_cls . ' bg-coral text-white shadow-sm';
          } elseif ($is_dots) {
              $cls = $base_cls . ' text-muted-foreground cursor-default';
          } else {
              $cls = $base_cls . ' bg-white border border-border text-navy hover:bg-coral hover:text-white hover:border-coral';
          }
          $rewritten = preg_replace('/class=("|\')[^"\']*("|\')/', 'class="' . esc_attr($cls) . '"', $link, 1);
          echo '<li>' . $rewritten . '</li>';
      endforeach; ?>
    </ul>
  </nav>
  <?php endif; ?>

  <?php endif; ?>

</main>
<?php get_footer(); ?>
