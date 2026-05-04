<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl" lang="he">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&subset=hebrew,latin&display=swap" rel="stylesheet">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- ── PAGE LOADER ── -->
<div id="spark-loader" aria-hidden="true">
  <div class="loader-spinner"></div>
</div>

<!-- ── CART DRAWER ── -->
<div id="cart-drawer" class="fixed inset-0 z-[200] pointer-events-none" aria-hidden="true">
  <!-- Backdrop -->
  <div id="cart-backdrop" class="absolute inset-0 bg-navy/40 opacity-0 transition-opacity duration-300 pointer-events-none"></div>

  <!-- Panel (slides in from right in RTL) -->
  <div id="cart-panel" class="absolute top-0 right-0 h-full w-full sm:max-w-md bg-background shadow-2xl flex flex-col translate-x-full transition-transform duration-300 pointer-events-auto">

    <!-- Header -->
    <div class="px-6 py-5 border-b border-border/60 flex items-center justify-between">
      <h2 class="flex items-center gap-2 text-navy text-xl font-extrabold">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-coral"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        עגלת הקניות
        <span id="cart-items-count-label" class="mr-auto text-sm font-medium text-muted-foreground hidden"></span>
      </h2>
      <button id="cart-close" aria-label="סגור עגלה" class="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted text-navy transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Items container -->
    <div id="cart-items" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      <!-- Populated by cart.js -->
      <div id="cart-empty" class="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
        <div class="h-20 w-20 rounded-2xl bg-cream flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-navy/30"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <p class="text-lg font-bold text-navy">העגלה ריקה</p>
        <p class="text-muted-foreground text-sm">הוסיפו מוצרים ותתחילו לקנות</p>
        <button id="cart-close-empty" class="rounded-full bg-navy text-white px-6 py-2.5 font-bold text-sm mt-2 hover:bg-navy/90 transition-colors">המשיכו לקנות</button>
      </div>
    </div>

    <!-- Footer total + checkout -->
    <div id="cart-footer" class="px-6 py-5 border-t border-border/60 bg-background space-y-3 hidden">
      <div class="flex items-center justify-between text-base font-bold text-navy">
        <span>סה"כ לתשלום</span>
        <span id="cart-total" class="text-xl font-extrabold text-coral">₪0</span>
      </div>
      <a id="cart-checkout-btn" href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : home_url('/checkout/')); ?>"
         class="flex items-center justify-center gap-2 w-full h-13 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5 py-3.5">
        לתשלום
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </a>
      <button id="cart-close-footer" class="w-full h-11 rounded-full border border-border text-navy font-medium text-sm hover:bg-cream transition-colors">המשיכו לקנות</button>
    </div>

  </div>
</div>
<!-- ── /CART DRAWER ── -->

<header class="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">

    <!-- Logo -->
    <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2 shrink-0">
      <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/spark-logo.png"
           alt="Spark Toys" class="h-9 sm:h-10 w-auto">
    </a>

    <!-- Desktop nav -->
    <nav class="hidden lg:flex items-center gap-5 xl:gap-7 text-[14px] xl:text-[15px] font-medium text-foreground/80">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="relative hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right">בית</a>

      <!-- Products dropdown -->
      <div class="relative group">
        <button type="button" class="relative flex items-center gap-1 hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-right">
          המוצרים שלנו
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute top-full right-0 pt-3 z-50">
          <div class="min-w-[240px] bg-background rounded-2xl border border-border/60 shadow-xl p-2 text-right">
            <?php
            $product_cats = get_terms(['taxonomy' => 'product_cat', 'hide_empty' => true, 'orderby' => 'count', 'order' => 'DESC', 'number' => 20]);
            if (!is_wp_error($product_cats) && $product_cats) :
                foreach ($product_cats as $cat) :
                    if (in_array($cat->slug, ['none', 'developmental-toys', 'learning-toys', 'uncategorized'])) continue;
            ?>
            <a href="<?php echo esc_url(get_term_link($cat)); ?>"
               class="block px-4 py-2.5 rounded-xl text-[14px] font-medium text-navy hover:bg-cream hover:text-coral transition-colors">
              <?php echo esc_html($cat->name); ?>
            </a>
            <?php endforeach; endif; ?>
          </div>
        </div>
      </div>

      <!-- Stars dropdown -->
      <div class="relative group">
        <button type="button" class="relative flex items-center gap-1 hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-right">
          כוכבי הילדים
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute top-full right-0 pt-3 z-50">
          <div class="min-w-[240px] bg-background rounded-2xl border border-border/60 shadow-xl p-2 text-right">
            <?php
            $stars = ['יובל המבולבל','מיכל הקטנה','מיקי','הדוד חיים','קופיקו','לולי','הכבשה שושנה'];
            foreach ($stars as $star) :
            ?>
            <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
               class="block px-4 py-2.5 rounded-xl text-[14px] font-medium text-navy hover:bg-cream hover:text-coral transition-colors">
              <?php echo esc_html($star); ?>
            </a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>

      <a href="<?php echo esc_url(home_url('/')); ?>" class="relative hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right">מרכיבי ההתפתחות</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="relative hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right">פורטל ההורדות ספרקי</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="relative hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right">ספרק קנדי</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="relative hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right">צרו קשר</a>
    </nav>

    <!-- Action buttons -->
    <div class="flex items-center gap-1 sm:gap-2">
      <button aria-label="חיפוש" class="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-navy transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
      <?php if (function_exists('wc_get_page_id') && get_post_type() !== 'nav_menu_item') : ?>
      <a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>"
         aria-label="חשבון" class="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-navy transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
      <?php endif; ?>
      <button id="cart-open-btn" aria-label="עגלה" class="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted text-navy transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <span id="cart-count" class="absolute -top-0.5 -left-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center hidden">0</span>
      </button>
      <button id="nav-toggle" aria-label="תפריט" class="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted text-navy transition-colors">
        <svg id="nav-icon-open" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg id="nav-icon-close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </div>

  <!-- Mobile drawer -->
  <div id="mobile-nav" class="hidden lg:hidden border-t border-border/60 bg-background max-h-[80vh] overflow-y-auto">
    <nav class="px-4 py-4 flex flex-col gap-1">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">בית</a>

      <!-- Products mobile accordion -->
      <div class="flex flex-col">
        <button type="button" data-accordion="products" class="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">
          <span>המוצרים שלנו</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="accordion-chevron transition-transform"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div id="acc-products" class="hidden pr-3 flex-col gap-0.5 pb-2">
          <?php
          if (!is_wp_error($product_cats) && $product_cats) :
              foreach ($product_cats as $cat) :
                  if (in_array($cat->slug, ['none', 'developmental-toys', 'learning-toys', 'uncategorized'])) continue;
          ?>
          <a href="<?php echo esc_url(get_term_link($cat)); ?>"
             class="px-3 py-2.5 rounded-lg text-sm font-medium text-navy/80 hover:bg-cream hover:text-coral">
            <?php echo esc_html($cat->name); ?>
          </a>
          <?php endforeach; endif; ?>
        </div>
      </div>

      <!-- Stars mobile accordion -->
      <div class="flex flex-col">
        <button type="button" data-accordion="stars" class="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">
          <span>כוכבי הילדים</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="accordion-chevron transition-transform"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div id="acc-stars" class="hidden pr-3 flex-col gap-0.5 pb-2">
          <?php foreach ($stars as $star) : ?>
          <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
             class="px-3 py-2.5 rounded-lg text-sm font-medium text-navy/80 hover:bg-cream hover:text-coral">
            <?php echo esc_html($star); ?>
          </a>
          <?php endforeach; ?>
        </div>
      </div>

      <a href="<?php echo esc_url(home_url('/')); ?>" class="px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">מרכיבי ההתפתחות</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">פורטל ההורדות ספרקי</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">ספרק קנדי</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream">צרו קשר</a>

      <div class="flex items-center gap-2 pt-3 border-t border-border/60 mt-2">
        <button class="flex-1 h-11 rounded-full bg-cream flex items-center justify-center gap-2 text-navy text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          חיפוש
        </button>
        <?php if (function_exists('wc_get_page_id')) : ?>
        <a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>"
           class="flex-1 h-11 rounded-full bg-cream flex items-center justify-center gap-2 text-navy text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          חשבון
        </a>
        <?php endif; ?>
      </div>
    </nav>
  </div>
</header>
