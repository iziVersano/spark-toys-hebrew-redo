<?php
defined('ABSPATH') || exit;
get_header();
?>
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

  <h1 class="text-4xl font-extrabold text-navy mb-10">עגלת הקניות</h1>

  <?php wc_print_notices(); ?>

  <?php if (WC()->cart->is_empty()) : ?>
  <div class="flex flex-col items-center justify-center py-24 gap-6 text-center">
    <div class="h-24 w-24 rounded-3xl bg-cream flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-navy/30"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
    </div>
    <p class="text-2xl font-bold text-navy">העגלה ריקה</p>
    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
       class="rounded-full bg-navy text-white px-8 py-3 font-bold hover:shadow-pop transition-all">
      המשיכו לקנות
    </a>
  </div>

  <?php else : ?>

  <div class="grid lg:grid-cols-3 gap-10">
    <!-- Items -->
    <div class="lg:col-span-2 space-y-4">
      <?php foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) :
          $_product = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
          $img_id   = $_product->get_image_id();
          $img_src  = $img_id ? wp_get_attachment_image_url($img_id, 'thumbnail') : '';
      ?>
      <div class="flex gap-4 p-4 bg-cream rounded-2xl">
        <div class="relative h-24 w-24 rounded-xl overflow-hidden bg-white shrink-0">
          <?php if ($img_src) : ?>
          <img src="<?php echo esc_url($img_src); ?>" alt="<?php echo esc_attr($_product->get_name()); ?>"
               class="object-contain p-1 w-full h-full">
          <?php endif; ?>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-navy line-clamp-2"><?php echo esc_html($_product->get_name()); ?></p>
          <p class="text-base font-extrabold text-coral mt-1"><?php echo wp_kses_post($_product->get_price_html()); ?></p>
          <div class="flex items-center gap-3 mt-2">
            <form method="post" class="flex items-center gap-2">
              <?php woocommerce_update_product_quantity($cart_item_key); ?>
              <input type="number" name="cart[<?php echo esc_attr($cart_item_key); ?>][qty]"
                     value="<?php echo esc_attr($cart_item['quantity']); ?>" min="1"
                     class="h-8 w-16 rounded-lg border border-border text-center text-sm text-navy">
            </form>
            <a href="<?php echo esc_url(wc_get_cart_remove_url($cart_item_key)); ?>"
               class="text-muted-foreground hover:text-coral transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </a>
          </div>
        </div>
      </div>
      <?php endforeach; ?>

      <div class="flex justify-between mt-4">
        <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
           class="text-sm font-medium text-navy hover:text-coral transition-colors">
          ← המשיכו לקנות
        </a>
        <button name="update_cart" type="submit" form="cart-form"
                class="text-sm font-medium text-navy hover:text-coral transition-colors">
          עדכון עגלה
        </button>
      </div>
    </div>

    <!-- Totals -->
    <div class="lg:col-span-1">
      <div class="bg-cream rounded-2xl p-6 border border-border/50 space-y-4">
        <h2 class="text-xl font-extrabold text-navy">סיכום הזמנה</h2>
        <?php woocommerce_cart_totals(); ?>
        <a href="<?php echo esc_url(wc_get_checkout_url()); ?>"
           class="flex items-center justify-center gap-2 w-full h-13 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5 py-3.5">
          לתשלום
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
      </div>
    </div>
  </div>
  <?php endif; ?>

</main>
<?php get_footer(); ?>
