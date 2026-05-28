<?php
defined('ABSPATH') || exit;

$search_term = get_search_query();
$bg_cycle    = ['bg-sky-soft', 'bg-mint-soft', 'bg-sun-soft', 'bg-lilac-soft', 'bg-coral-soft'];

$results = function_exists('wc_get_products') ? wc_get_products([
    'limit'   => 48,
    'status'  => 'publish',
    's'       => $search_term,
    'orderby' => 'relevance',
]) : [];

get_header();
?>

<section class="py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">

    <div class="flex flex-col items-start text-right mb-8">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">תוצאות חיפוש</h1>
      <?php if ($search_term) : ?>
        <p class="mt-3 text-lg text-muted-foreground">
          עבור: <span class="font-bold text-coral">"<?php echo esc_html($search_term); ?>"</span>
          <?php if ($results) : ?>
            <span class="text-sm text-navy/70">— <?php echo count($results); ?> מוצרים</span>
          <?php endif; ?>
        </p>
      <?php endif; ?>
    </div>

    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="mb-10 flex gap-2 max-w-xl">
      <input type="search" name="s" value="<?php echo esc_attr($search_term); ?>"
             placeholder="חפש מוצר…"
             class="flex-1 h-12 px-5 rounded-full border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-coral/40" />
      <button type="submit" class="h-12 px-6 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-colors">חיפוש</button>
    </form>

    <?php if (empty($results)) : ?>
      <div class="py-16 text-center">
        <p class="text-xl text-navy/80">לא נמצאו מוצרים תואמים.</p>
        <p class="mt-3 text-muted-foreground">נסו מילה אחרת או <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="text-coral font-bold underline">צפו בכל המוצרים</a>.</p>
      </div>
    <?php else : ?>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        <?php foreach ($results as $i => $product) :
            $product_id = $product->get_id();
            $img_id     = $product->get_image_id();
            $img_src    = $img_id ? wp_get_attachment_image_url($img_id, 'medium') : '';
            $bg         = $bg_cycle[$i % count($bg_cycle)];
            $is_on_sale = $product->is_on_sale();
        ?>
        <article class="group relative bg-white rounded-3xl p-4 sm:p-5 border border-border/60 hover:border-coral/20 hover:shadow-card transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col">
          <?php if ($is_on_sale) : ?>
          <span class="absolute top-3 right-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full bg-coral text-white leading-none">מבצע</span>
          <?php endif; ?>
          <a href="<?php echo esc_url(get_permalink($product_id)); ?>" class="flex flex-col flex-1">
            <div class="relative aspect-square rounded-2xl <?php echo esc_attr($bg); ?> flex items-center justify-center mb-4 overflow-hidden">
              <?php if ($img_src) : ?>
              <img src="<?php echo esc_url($img_src); ?>" alt="<?php echo esc_attr($product->get_name()); ?>" loading="lazy"
                   class="w-[75%] h-[75%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md">
              <?php else : ?>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-navy/20"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              <?php endif; ?>
            </div>
            <h3 class="text-sm sm:text-base font-bold text-navy line-clamp-1"><?php echo esc_html($product->get_name()); ?></h3>
            <p class="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-snug flex-1">
              <?php echo esc_html(wp_strip_all_tags($product->get_short_description())); ?>
            </p>
          </a>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-xl sm:text-2xl font-extrabold text-navy">
              <?php echo wp_kses_post($product->get_price_html()); ?>
            </div>
            <?php if ($product->is_purchasable() && $product->is_in_stock()) : ?>
            <button
              data-product-id="<?php echo esc_attr($product_id); ?>"
              data-product-name="<?php echo esc_attr($product->get_name()); ?>"
              aria-label="<?php echo esc_attr('הוסף לעגלה: ' . $product->get_name()); ?>"
              class="add-to-cart-btn h-10 w-10 rounded-full bg-coral-soft text-coral flex items-center justify-center hover:bg-coral hover:text-white transition-all duration-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
            <?php endif; ?>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

  </div>
</section>

<?php get_footer(); ?>
