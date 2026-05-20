<?php
defined('ABSPATH') || exit;

get_header();

while (have_posts()) :
    the_post();
    global $product;

    $product_id     = $product->get_id();
    $images         = $product->get_gallery_image_ids();
    $main_img_id    = $product->get_image_id();
    $main_img_src   = $main_img_id ? wp_get_attachment_image_url($main_img_id, 'large') : '';
    $is_on_sale     = $product->is_on_sale();
    $cats           = get_the_terms($product_id, 'product_cat');
    $stock_qty      = $product->get_stock_quantity();
    $short_desc     = $product->get_short_description();
    $full_desc      = $product->get_description();
    $sku            = $product->get_sku();

    // Detect YouTube video — checks common Bridge/WC meta keys, then scans content
    $video_url = '';
    foreach (['_product_video_url', '_video_url', 'product_video', 'youtube_url', '_youtube_url'] as $meta_key) {
        $val = get_post_meta($product_id, $meta_key, true);
        if ($val) { $video_url = $val; break; }
    }
    $yt_pattern = '~(https?://(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)[A-Za-z0-9_\-]+[^\s<"\']*)~i';
    if (!$video_url) {
        $haystack = $short_desc . ' ' . $full_desc;
        if (preg_match($yt_pattern, $haystack, $m)) {
            $video_url = $m[1];
        }
    }
    // Convert to embed URL
    $embed_url = '';
    if ($video_url) {
        if (preg_match('~(?:v=|youtu\.be/|embed/)([A-Za-z0-9_\-]+)~', $video_url, $m)) {
            $embed_url = 'https://www.youtube.com/embed/' . $m[1];
        }
        // Strip the raw URL from descriptions so it doesn't render twice
        $short_desc = preg_replace($yt_pattern, '', $short_desc);
        $full_desc  = preg_replace($yt_pattern, '', $full_desc);
    }
?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

  <!-- Breadcrumb -->
  <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-coral transition-colors">בית</a>
    <span>/</span>
    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="hover:text-coral transition-colors">כל המוצרים</a>
    <?php if ($cats && !is_wp_error($cats)) : $first_cat = reset($cats); ?>
    <span>/</span>
    <a href="<?php echo esc_url(get_term_link($first_cat)); ?>" class="hover:text-coral transition-colors">
      <?php echo esc_html($first_cat->name); ?>
    </a>
    <?php endif; ?>
    <span>/</span>
    <span class="text-navy font-semibold line-clamp-1"><?php the_title(); ?></span>
  </nav>

  <!-- "Added to cart" notice (WC standard) -->
  <?php wc_print_notices(); ?>

  <div class="grid lg:grid-cols-2 gap-10 lg:gap-16">

    <!-- Image gallery -->
    <div class="space-y-4">
      <div class="relative aspect-square rounded-3xl overflow-hidden bg-cream border border-border/40">
        <?php if ($main_img_src) : ?>
        <img id="main-product-img" src="<?php echo esc_url($main_img_src); ?>"
             alt="<?php echo esc_attr($product->get_name()); ?>" loading="eager"
             class="object-contain p-6 w-full h-full">
        <?php else : ?>
        <div class="w-full h-full flex items-center justify-center text-6xl">🧸</div>
        <?php endif; ?>
        <?php if ($is_on_sale) : ?>
        <span class="absolute top-4 right-4 bg-coral text-white text-sm font-bold px-3 py-1 rounded-full">מבצע</span>
        <?php endif; ?>
      </div>

      <!-- Thumbnails -->
      <?php if (!empty($images)) : ?>
      <div class="flex gap-3 overflow-x-auto pb-1">
        <?php if ($main_img_id) :
            $thumb = wp_get_attachment_image_url($main_img_id, 'thumbnail'); ?>
        <button onclick="document.getElementById('main-product-img').src='<?php echo esc_js(wp_get_attachment_image_url($main_img_id, 'large')); ?>'"
                class="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-border/50 bg-cream">
          <img src="<?php echo esc_url($thumb); ?>" alt="" class="object-contain p-1 w-full h-full">
        </button>
        <?php endif;
        foreach (array_slice($images, 0, 5) as $img_id) :
            $thumb = wp_get_attachment_image_url($img_id, 'thumbnail');
            $large = wp_get_attachment_image_url($img_id, 'large'); ?>
        <button onclick="document.getElementById('main-product-img').src='<?php echo esc_js($large); ?>'"
                class="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-border/50 bg-cream">
          <img src="<?php echo esc_url($thumb); ?>" alt="" class="object-contain p-1 w-full h-full">
        </button>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </div>

    <!-- Product info -->
    <div class="flex flex-col text-right">

      <!-- Categories -->
      <?php if ($cats && !is_wp_error($cats)) : ?>
      <div class="flex flex-wrap gap-2 mb-4">
        <?php foreach ($cats as $cat) : ?>
        <a href="<?php echo esc_url(get_term_link($cat)); ?>"
           class="text-xs font-semibold text-coral bg-coral/10 px-3 py-1 rounded-full hover:bg-coral/20 transition-colors">
          <?php echo esc_html($cat->name); ?>
        </a>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight"><?php the_title(); ?></h1>

      <!-- Short description -->
      <?php if ($short_desc) : ?>
      <div class="mt-5 text-navy/80 text-base leading-relaxed text-right prose-product">
        <?php echo wp_kses_post($short_desc); ?>
      </div>
      <?php endif; ?>

      <!-- YouTube video -->
      <?php if ($embed_url) : ?>
      <div class="mt-6 aspect-video w-full rounded-2xl overflow-hidden bg-black/5">
        <iframe src="<?php echo esc_url($embed_url); ?>" title="<?php echo esc_attr($product->get_name()); ?>"
                class="w-full h-full" loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
      <?php endif; ?>

      <!-- Price -->
      <div class="flex items-baseline gap-3 mt-6">
        <span class="text-4xl font-extrabold text-coral"><?php echo wp_kses_post($product->get_price_html()); ?></span>
      </div>

      <!-- Stock -->
      <div class="flex items-center gap-2 mt-3">
        <?php if ($product->is_in_stock()) : ?>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4dbf8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span class="text-sm font-semibold" style="color:#4dbf8a">
          <?php echo $stock_qty ? esc_html($stock_qty) . ' במלאי' : 'במלאי'; ?>
        </span>
        <?php else : ?>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground shrink-0"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
        <span class="text-sm text-muted-foreground">אזל מהמלאי</span>
        <?php endif; ?>
      </div>

      <!-- Quantity + Add to cart -->
      <?php if ($product->is_purchasable() && $product->is_in_stock()) : ?>
      <div class="mt-8 flex items-center gap-3">

        <!-- Quantity selector -->
        <div class="flex items-center gap-0 h-14 rounded-full border-2 border-border bg-background overflow-hidden shrink-0">
          <button type="button" data-qty-action="decrease"
                  class="h-full w-12 flex items-center justify-center text-navy hover:bg-cream transition-colors disabled:opacity-40"
                  aria-label="הפחת">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <input type="number" id="product-qty" value="1" min="1"
                 <?php echo $stock_qty ? 'max="' . esc_attr($stock_qty) . '"' : ''; ?>
                 class="w-12 h-full text-center text-base font-bold text-navy bg-transparent border-0 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none">
          <button type="button" data-qty-action="increase"
                  class="h-full w-12 flex items-center justify-center text-navy hover:bg-cream transition-colors disabled:opacity-40"
                  aria-label="הוסף">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <!-- Add to cart button -->
        <button type="button" data-product-id="<?php echo esc_attr($product_id); ?>"
                data-product-name="<?php echo esc_attr($product->get_name()); ?>"
                data-qty-source="#product-qty"
                class="add-to-cart-btn flex-1 h-14 rounded-full bg-coral text-white font-bold text-base flex items-center justify-center gap-2 hover:shadow-pop transition-all hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          הוספה לסל
        </button>
      </div>
      <?php endif; ?>

      <!-- SKU + Categories -->
      <div class="mt-8 pt-6 border-t border-border/60 space-y-2 text-sm">
        <?php if ($sku) : ?>
        <div class="flex gap-2">
          <span class="font-bold text-navy">מק"ט:</span>
          <span class="text-muted-foreground"><?php echo esc_html($sku); ?></span>
        </div>
        <?php endif; ?>
        <?php if ($cats && !is_wp_error($cats)) : ?>
        <div class="flex gap-2 flex-wrap">
          <span class="font-bold text-navy">קטגוריה:</span>
          <?php $cat_links = []; foreach ($cats as $cat) {
              $cat_links[] = '<a href="' . esc_url(get_term_link($cat)) . '" class="text-muted-foreground hover:text-coral transition-colors">' . esc_html($cat->name) . '</a>';
          } echo implode(', ', $cat_links); ?>
        </div>
        <?php endif; ?>
      </div>

      <!-- Full description -->
      <?php if ($full_desc) : ?>
      <div class="mt-10 pt-8 border-t border-border/60">
        <h2 class="text-xl font-extrabold text-navy mb-4">תיאור המוצר</h2>
        <div class="text-navy/80 text-base leading-relaxed text-right prose-product">
          <?php echo wp_kses_post($full_desc); ?>
        </div>
      </div>
      <?php endif; ?>

    </div>
  </div>
</main>

<script>
(function () {
  // Quantity selector wiring (page-scoped, runs once)
  var qtyInput = document.getElementById('product-qty');
  if (!qtyInput) return;
  var min = parseInt(qtyInput.min || '1', 10);
  var max = qtyInput.max ? parseInt(qtyInput.max, 10) : Infinity;

  document.querySelectorAll('[data-qty-action]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = parseInt(qtyInput.value, 10) || min;
      if (btn.dataset.qtyAction === 'increase' && current < max) qtyInput.value = current + 1;
      if (btn.dataset.qtyAction === 'decrease' && current > min) qtyInput.value = current - 1;
    });
  });
})();
</script>

<?php endwhile; get_footer(); ?>
