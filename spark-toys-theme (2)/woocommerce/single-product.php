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
    $rating         = (float) $product->get_average_rating();
    $review_count   = $product->get_review_count();
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

      <!-- Rating -->
      <?php if ($rating > 0) : ?>
      <div class="flex items-center gap-1.5 mt-3">
        <?php for ($s = 1; $s <= 5; $s++) : ?>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="<?php echo $s <= round($rating) ? '#f0c040' : 'none'; ?>"
             stroke="<?php echo $s <= round($rating) ? '#f0c040' : '#d1d5db'; ?>"
             stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <?php endfor; ?>
        <span class="text-sm text-muted-foreground mr-1">(<?php echo esc_html($review_count); ?> ביקורות)</span>
      </div>
      <?php endif; ?>

      <!-- Price -->
      <div class="flex items-baseline gap-3 mt-6">
        <span class="text-4xl font-extrabold text-coral"><?php echo wp_kses_post($product->get_price_html()); ?></span>
      </div>

      <!-- Short description -->
      <div class="mt-5 text-navy/80 text-base leading-relaxed text-right">
        <?php echo wp_kses_post($product->get_short_description()); ?>
      </div>

      <!-- Stock -->
      <div class="flex items-center gap-2 mt-5">
        <?php if ($product->is_in_stock()) : ?>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4dbf8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span class="text-sm font-semibold" style="color:#4dbf8a">במלאי</span>
        <?php else : ?>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground shrink-0"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
        <span class="text-sm text-muted-foreground">אזל מהמלאי</span>
        <?php endif; ?>
      </div>

      <!-- Add to cart + Buy now -->
      <?php if ($product->is_purchasable() && $product->is_in_stock()) : ?>
      <div class="mt-8 flex gap-3">
        <button data-product-id="<?php echo esc_attr($product_id); ?>"
                data-product-name="<?php echo esc_attr($product->get_name()); ?>"
                class="add-to-cart-btn flex-1 h-14 rounded-full border-2 border-navy text-navy font-bold text-base flex items-center justify-center gap-2 hover:bg-navy hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          הוסף לעגלה
        </button>
        <a href="<?php echo esc_url(wc_get_checkout_url() . '?add-to-cart=' . $product_id); ?>"
           class="flex-1 h-14 rounded-full bg-navy text-white font-bold text-base flex items-center justify-center gap-2 hover:shadow-pop transition-all hover:-translate-y-0.5">
          קנה עכשיו
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
      </div>
      <?php endif; ?>

      <!-- Full description -->
      <?php $desc = $product->get_description(); if ($desc) : ?>
      <div class="mt-10 pt-8 border-t border-border/60">
        <h2 class="text-xl font-extrabold text-navy mb-4">תיאור המוצר</h2>
        <div class="text-navy/80 text-base leading-relaxed text-right">
          <?php echo wp_kses_post($desc); ?>
        </div>
      </div>
      <?php endif; ?>

    </div>
  </div>
</main>
<?php endwhile; get_footer(); ?>
