<?php
defined('ABSPATH') || exit;

/* Fetch live data */
$featured_products = function_exists('wc_get_products') ? wc_get_products([
    'limit'    => 8,
    'status'   => 'publish',
    'orderby'  => 'date',
    'order'    => 'DESC',
    'featured' => true,
]) : [];
if (empty($featured_products) && function_exists('wc_get_products')) {
    $featured_products = wc_get_products(['limit' => 8, 'status' => 'publish', 'orderby' => 'date', 'order' => 'DESC']);
}

$categories = get_terms([
    'taxonomy'   => 'product_cat',
    'hide_empty' => true,
    'orderby'    => 'count',
    'order'      => 'DESC',
    'number'     => 6,
    'exclude'    => get_term_by('slug', 'uncategorized', 'product_cat') ? [get_term_by('slug', 'uncategorized', 'product_cat')->term_id] : [],
]);

$tmpl_dir = get_template_directory_uri();

$bg_cycle  = ['bg-sky-soft', 'bg-mint-soft', 'bg-sun-soft', 'bg-lilac-soft', 'bg-coral-soft'];

get_header();
?>


<div class="relative z-10">

<!-- ── HERO ── -->
<section class="relative">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10">
    <div class="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] ring-1 ring-black/5 shadow-pop bg-cream">
      <div class="grid lg:grid-cols-2 min-h-[620px] lg:min-h-[700px]">

        <!-- Text panel -->
        <div class="relative z-10 order-2 lg:order-1 bg-cream px-6 sm:px-10 lg:px-14 py-10 lg:py-16 flex flex-col justify-center text-right">
          <div class="inline-flex self-end items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-semibold text-navy/80 shadow-soft mb-6 ring-1 ring-black/5">
            <span class="h-2 w-2 rounded-full bg-coral animate-pulse"></span>
            חדש בקטלוג — סדרת המוסיקה
          </div>
          <h1 class="font-display text-[2.75rem] sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-extrabold leading-[1.02] text-sky text-balance">
            יותר ממשחק,<br>
            <span class="text-coral">עולם של למידה.</span>
          </h1>
          <p class="mt-6 text-lg sm:text-xl text-navy/75 leading-relaxed max-w-md mr-0 ml-auto lg:ml-0">
            Spark Toys יוצרים צעצועים אינטראקטיביים וחינוכיים שעוזרים לילדים להתפתח דרך מוסיקה, צלילים ומשחק.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
               class="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-navy text-white font-bold text-base shadow-card hover:shadow-pop transition-all hover:-translate-y-0.5">
              גלו את המוצרים
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </a>
            <a href="#benefits"
               class="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white text-navy font-bold text-base border border-border hover:border-navy/30 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#e8614a" stroke="#e8614a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              לפי שלבי התפתחות
            </a>
          </div>
          <div class="mt-8 flex flex-wrap justify-end items-center gap-x-6 gap-y-2 text-base font-medium text-navy/70">
            <span class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-mint"></span> תוכן בעברית מלאה</span>
            <span class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-sky"></span> מותאם לגילאי 0–3+</span>
          </div>
        </div>

        <!-- Video carousel panel -->
        <div class="relative order-1 lg:order-2 overflow-hidden bg-cream" id="hero-video-panel">
          <!-- Video slides -->
          <div id="hero-carousel" class="absolute inset-0">
            <video class="hero-slide absolute inset-0 h-full w-full object-cover object-top active-slide" src="<?php echo esc_url($tmpl_dir); ?>/assets/videos/hero.mp4" muted loop playsinline preload="auto"></video>
            <video class="hero-slide absolute inset-0 h-full w-full object-cover object-top" src="<?php echo esc_url($tmpl_dir); ?>/assets/videos/galgal.mp4" muted loop playsinline preload="none"></video>
          </div>
          <!-- Dot indicators -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" id="hero-dots">
            <button class="hero-dot w-2.5 h-2.5 rounded-full bg-coral transition-all" data-index="0" aria-label="סרטון 1"></button>
            <button class="hero-dot w-2.5 h-2.5 rounded-full bg-white/60 transition-all" data-index="1" aria-label="סרטון 2"></button>
          </div>
          <div aria-hidden="true" class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent pointer-events-none hidden lg:block"></div>
          <div aria-hidden="true" class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent pointer-events-none"></div>
          <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none lg:hidden"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── HOT PRODUCTS OF THE MONTH ── -->
<?php $hot_products = array_slice($featured_products, 0, 2); ?>
<?php if (!empty($hot_products)) : ?>
<section class="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="flex flex-col items-center text-center mb-10">
      <div class="inline-flex items-center gap-2 bg-coral-soft text-coral text-sm font-bold px-4 py-2 rounded-full mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 5-5 8-5 13a5 5 0 0 0 10 0c0-5-5-8-5-13z"/></svg>
        חמים החודש
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">מוצרים חמים <span class="text-coral">של החודש</span></h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <?php foreach ($hot_products as $i => $product) :
          $product_id = $product->get_id();
          $img_id     = $product->get_image_id();
          $img_src    = $img_id ? wp_get_attachment_image_url($img_id, 'medium') : '';
          $bg         = $bg_cycle[$i % count($bg_cycle)];
          $is_on_sale = $product->is_on_sale();
      ?>
      <article class="group relative bg-white rounded-3xl p-5 sm:p-6 border border-border/60 hover:border-coral/20 hover:shadow-card transition-all duration-300 hover:-translate-y-1.5 flex flex-col">
        <?php if ($is_on_sale) : ?>
        <span class="absolute top-3 right-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full bg-coral text-white leading-none">מבצע</span>
        <?php endif; ?>
        <a href="<?php echo esc_url(get_permalink($product_id)); ?>" class="flex flex-col flex-1">
          <div class="relative aspect-square rounded-2xl <?php echo esc_attr($bg); ?> flex items-center justify-center mb-4 overflow-hidden">
            <?php if ($img_src) : ?>
            <img src="<?php echo esc_url($img_src); ?>" alt="<?php echo esc_attr($product->get_name()); ?>" loading="eager"
                 class="w-[75%] h-[75%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md">
            <?php else : ?>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-navy/20"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            <?php endif; ?>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-navy line-clamp-1"><?php echo esc_html($product->get_name()); ?></h3>
          <p class="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-snug flex-1">
            <?php echo esc_html(wp_strip_all_tags($product->get_short_description())); ?>
          </p>
        </a>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-2xl font-extrabold text-navy">
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
  </div>
</section>
<?php endif; ?>

<!-- ── CATEGORIES ── -->
<section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream/40">
  <div class="mx-auto max-w-7xl">
    <div class="relative flex flex-col items-center text-center mb-10 lg:mb-14 rounded-3xl px-6 py-10 overflow-hidden">
      <!-- soft glow blobs -->
      <div class="absolute -top-10 -right-10 w-64 h-64 bg-coral-soft rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div class="absolute -bottom-10 -left-10 w-56 h-56 bg-mint-soft rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div class="absolute top-0 left-1/3 w-48 h-48 bg-sun-soft rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div class="inline-flex items-center gap-2 bg-coral-soft text-coral text-sm font-bold px-4 py-2 rounded-full mb-5 relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        קטגוריות
      </div>
      <h2 class="relative text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance text-navy leading-[1.05] flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <img src="<?php echo esc_url($tmpl_dir); ?>/assets/images/pinwheel-icon.svg" alt="" aria-hidden="true" class="h-12 sm:h-14 lg:h-16 w-auto shrink-0">
        גלו עולם של <span class="text-coral">משחק ולמידה</span>
      </h2>
      <p class="relative mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">מגוון רחב של קטגוריות שיתאימו לכל ילד ולכל שלב התפתחותי.</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      <?php
      $accent_cycle  = ['from-coral/70','from-mint/70','from-sun/70','from-lilac/70','from-sky/70','from-coral/70'];
      $fallback_imgs = ['category-development.jpg','category-robots.jpg','category-blox.jpg','category-wood.jpg','category-books.jpg','category-music.jpg'];
      $cats_to_show  = !is_wp_error($categories) && $categories ? $categories : [];
      if (empty($cats_to_show)) :
          $fallback_cats = [
              ['name' => 'צעצועי התפתחות', 'slug' => 'development-toys', 'img' => $fallback_imgs[0]],
              ['name' => 'רובוטים',         'slug' => 'robots',           'img' => $fallback_imgs[1]],
              ['name' => 'Spark BloX',      'slug' => 'spark-blox',       'img' => $fallback_imgs[2]],
              ['name' => 'צעצועי עץ',       'slug' => 'wooden-toys',      'img' => $fallback_imgs[3]],
              ['name' => 'ספרים',           'slug' => 'interactive-books','img' => $fallback_imgs[4]],
              ['name' => 'מוסיקה',          'slug' => 'music',            'img' => $fallback_imgs[5]],
          ];
          foreach ($fallback_cats as $i => $fc) :
              $accent = $accent_cycle[$i % count($accent_cycle)];
              $span   = ($i === 0) ? 'md:col-span-2' : '';
      ?>
      <?php $_link = get_term_link($fc['slug'], 'product_cat'); $_href = (is_wp_error($_link) || !$_link) ? '#' : $_link; ?>
      <a href="<?php echo esc_url($_href); ?>" class="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer <?php echo esc_attr($span); ?>">
        <div class="relative w-full overflow-hidden <?php echo ($i === 0) ? 'aspect-[16/7] md:aspect-[16/8]' : 'aspect-square'; ?>">
          <img src="<?php echo esc_url($tmpl_dir); ?>/assets/images/<?php echo esc_attr($fc['img']); ?>"
               alt="<?php echo esc_attr($fc['name']); ?>" loading="lazy"
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t <?php echo esc_attr($accent); ?> via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <h3 class="text-white font-extrabold text-lg sm:text-xl lg:text-2xl leading-tight drop-shadow-sm"><?php echo esc_html($fc['name']); ?></h3>
            <div class="flex items-center gap-1.5 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span class="text-white/90 text-sm font-semibold">לקטגוריה</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.9"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </div>
          </div>
        </div>
      </a>
      <?php endforeach;
      else :
          foreach ($cats_to_show as $i => $cat) :
              $accent  = $accent_cycle[$i % count($accent_cycle)];
              $span    = ($i === 0) ? 'md:col-span-2' : '';
              $img_src = '';
              if (!empty($cat->thumbnail_id)) {
                  $img_src = wp_get_attachment_url($cat->thumbnail_id);
              }
              if (!$img_src) {
                  $img_src = $tmpl_dir . '/assets/images/' . ($fallback_imgs[$i % count($fallback_imgs)]);
              }
      ?>
      <?php $_tl = get_term_link($cat); $_th = is_wp_error($_tl) ? '#' : $_tl; ?>
      <a href="<?php echo esc_url($_th); ?>" class="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer <?php echo esc_attr($span); ?>">
        <div class="relative w-full overflow-hidden <?php echo ($i === 0) ? 'aspect-[16/7] md:aspect-[16/8]' : 'aspect-square'; ?>">
          <img src="<?php echo esc_url($img_src); ?>" alt="<?php echo esc_attr($cat->name); ?>" loading="lazy"
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t <?php echo esc_attr($accent); ?> via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <h3 class="text-white font-extrabold text-lg sm:text-xl lg:text-2xl leading-tight drop-shadow-sm"><?php echo esc_html($cat->name); ?></h3>
            <div class="flex items-center gap-1.5 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span class="text-white/90 text-sm font-semibold">לקטגוריה</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.9"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </div>
          </div>
        </div>
      </a>
      <?php endforeach; endif; ?>
    </div>
  </div>
</section>

<!-- ── STARS ── -->
<section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="flex flex-col items-center text-center mb-12 lg:mb-16">
      <div class="inline-flex items-center gap-2 bg-sun-soft text-sun text-sm font-bold px-4 py-2 rounded-full mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        כוכבי הילדים
      </div>
      <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance text-navy leading-[1.05]">הדמויות <span class="text-coral">האהובות</span> בעברית</h2>
      <p class="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">הכירו את הכוכבים שמלווים את הילדים בכל משחק, שיר וסיפור.</p>
    </div>
    <?php
    $stars = [
        ['name' => 'יובל המבולבל',  'img' => 'star-yuval.png',    'ring' => 'ring-coral/40', 'bg' => 'bg-coral-soft', 'style' => 'background:#fef9e7'],
        ['name' => 'מיכל הקטנה',    'img' => 'star-michal.jpg',   'ring' => 'ring-sun/50',   'bg' => 'bg-sun-soft'],
        ['name' => 'מיקי',           'img' => 'star-miki.png',     'ring' => 'ring-mint/50',  'bg' => 'bg-mint-soft', 'label_img' => 'miki-logo.png'],
        ['name' => 'הכבשה שושנה',   'img' => 'star-shoshana.png', 'ring' => 'ring-coral/40', 'bg' => 'bg-coral-soft', 'style' => 'background:#f9b8c4'],
        ['name' => 'קופיקו',         'img' => 'star-kofiko.jpg',   'ring' => 'ring-lilac/50', 'bg' => 'bg-lilac-soft'],
        ['name' => 'לולי',           'img' => 'star-luli.jpg',     'ring' => 'ring-sky/50',   'bg' => 'bg-sky-soft'],
        ['name' => 'הדוד חיים',      'img' => 'star-haim.jpg',     'ring' => 'ring-sky/50',   'bg' => 'bg-sky-soft'],
    ];
    ?>
    <!-- Mobile: horizontal scroll -->
    <div class="md:hidden -mx-4 px-4 overflow-x-auto">
      <div class="flex gap-5 pb-2 min-w-max" dir="rtl">
        <?php foreach ($stars as $star) : ?>
        <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
           class="group flex flex-col items-center text-center w-28 sm:w-32 shrink-0">
          <div class="relative aspect-square w-28 sm:w-32 rounded-full overflow-hidden <?php echo esc_attr($star['bg']); ?> ring-4 <?php echo esc_attr($star['ring']); ?> ring-offset-4 ring-offset-background transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card" <?php if (!empty($star['style'])) echo 'style="' . esc_attr($star['style']) . '"'; ?>>
            <img src="<?php echo esc_url($tmpl_dir . '/assets/images/' . $star['img']); ?>"
                 alt="<?php echo esc_attr($star['name']); ?>" loading="lazy"
                 class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
          </div>
          <?php if (!empty($star['label_img'])) : ?>
          <img src="<?php echo esc_url($tmpl_dir . '/assets/images/' . $star['label_img']); ?>" alt="<?php echo esc_attr($star['name']); ?>" class="mt-3 h-14 w-auto object-contain">
          <?php else : ?>
          <h3 class="mt-4 text-lg font-extrabold text-navy group-hover:text-coral transition-colors"><?php echo esc_html($star['name']); ?></h3>
          <?php endif; ?>
        </a>
        <?php endforeach; ?>
      </div>
    </div>
    <!-- Desktop: grid -->
    <div class="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
      <?php foreach ($stars as $star) : ?>
      <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
         class="group flex flex-col items-center text-center">
        <div class="relative aspect-square w-full rounded-full overflow-hidden <?php echo esc_attr($star['bg']); ?> ring-4 <?php echo esc_attr($star['ring']); ?> ring-offset-4 ring-offset-background transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card" <?php if (!empty($star['style'])) echo 'style="' . esc_attr($star['style']) . '"'; ?>>
          <img src="<?php echo esc_url($tmpl_dir . '/assets/images/' . $star['img']); ?>"
               alt="<?php echo esc_attr($star['name']); ?>" loading="lazy"
               class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
        </div>
        <?php if (!empty($star['label_img'])) : ?>
        <img src="<?php echo esc_url($tmpl_dir . '/assets/images/' . $star['label_img']); ?>" alt="<?php echo esc_attr($star['name']); ?>" class="mt-3 h-14 w-auto object-contain">
        <?php else : ?>
        <h3 class="mt-4 text-lg sm:text-xl font-extrabold text-navy group-hover:text-coral transition-colors"><?php echo esc_html($star['name']); ?></h3>
        <?php endif; ?>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ── BENEFITS ── -->
<section id="benefits" class="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
  <div class="mx-auto max-w-7xl">
    <div class="flex flex-col items-center text-center mb-8">
      <div class="inline-flex items-center gap-2 bg-mint-soft text-mint text-sm font-bold px-4 py-2 rounded-full mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        יתרונות
      </div>
      <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance text-navy leading-[1.05]">למידה <span class="text-coral">אמיתית</span> דרך משחק</h2>
      <p class="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">כל מוצר של Spark מפתח מיומנויות חיוניות בד בבד עם כיף אמיתי.</p>
    </div>
    <div class="bg-white rounded-3xl shadow-card border border-border/60 px-6 sm:px-10 py-10 lg:py-12">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        <?php
        $benefits = [
            ['icon' => 'message-circle', 'title' => 'פיתוח שפה',        'desc' => 'מעודד דיבור, הקשבה והבנת מילים',                'bg' => 'bg-coral-soft', 'ring' => 'ring-coral/20', 'color' => 'text-coral'],
            ['icon' => 'music',          'title' => 'מוזיקה וקצב',      'desc' => 'לימוד דרך צלילים, שירים וקצב',                 'bg' => 'bg-sun-soft',  'ring' => 'ring-sun/20',  'color' => 'text-sun'],
            ['icon' => 'lightbulb',      'title' => 'חשיבה ולמידה',     'desc' => 'שאלות, חידות ומשחקים שמפתחים הבנה',            'bg' => 'bg-mint-soft', 'ring' => 'ring-mint/20', 'color' => 'text-mint'],
            ['icon' => 'hand',           'title' => 'מוטוריקה',         'desc' => 'פעילויות שמפתחות קואורדינציה ומוטוריקה עדינה', 'bg' => 'bg-sky-soft',  'ring' => 'ring-sky/20',  'color' => 'text-sky'],
        ];
        $benefit_icons = [
            'message-circle' => '<circle cx="12" cy="12" r="10"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
            'music'          => '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
            'lightbulb'      => '<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
            'hand'           => '<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
        ];
        foreach ($benefits as $b) :
        ?>
        <div class="flex flex-col items-center text-center group">
          <div class="h-20 w-20 rounded-2xl flex items-center justify-center mb-5 ring-4 transition-transform duration-300 group-hover:scale-110 <?php echo esc_attr($b['bg'] . ' ' . $b['ring']); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="<?php echo esc_attr($b['color']); ?>">
              <?php echo $benefit_icons[$b['icon']]; ?>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-extrabold text-navy"><?php echo esc_html($b['title']); ?></h3>
          <p class="text-sm sm:text-base text-muted-foreground mt-2 leading-snug max-w-[200px]"><?php echo esc_html($b['desc']); ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- ── PRODUCTS ── -->
<section class="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="flex flex-col items-center text-center mb-14">
      <div class="inline-flex items-center gap-2 bg-sky-soft text-sky text-sm font-bold px-4 py-2 rounded-full mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        מוצרים מובילים
      </div>
      <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance leading-[1.05] text-navy">מוצרים שילדים <span class="text-coral">אוהבים</span></h2>
      <p class="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">אוסף מובחר של צעצועים אינטראקטיביים שילדים אוהבים והורים בוחרים שוב ושוב.</p>
    </div>

    <?php if (!empty($featured_products)) : ?>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      <?php foreach ($featured_products as $i => $product) :
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

    <div class="mt-12 flex justify-center">
      <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>"
         class="inline-flex items-center gap-2 h-13 px-7 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5 py-3.5">
        צפו בכל המוצרים
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- ── WHY US ── -->
<section class="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-cream/40">
  <div class="mx-auto max-w-7xl">
    <div class="flex flex-col items-center text-center mb-14">
      <div class="inline-flex items-center gap-2 bg-lilac-soft text-lilac text-sm font-bold px-4 py-2 rounded-full mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        למה Spark?
      </div>
      <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-balance text-navy">
        מה הופך את <span class="text-coral">Spark Toys</span> לשונים?
      </h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
      <?php
      $why_items = [
          ['path' => '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
               'title' => 'דובר עברית מלאה',        'desc' => 'כל התוכן בעברית נקייה ועשירה',          'color' => 'text-coral', 'bg' => 'bg-coral-soft', 'ring' => 'ring-coral/25'],
          ['path' => '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
               'title' => 'מאות שירים ומשפטים',     'desc' => 'ספריית תוכן ענקית שגדלה כל הזמן',       'color' => 'text-sky',   'bg' => 'bg-sky-soft',  'ring' => 'ring-sky/25'],
          ['path' => '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
               'title' => 'תוכן חינוכי עשיר',       'desc' => 'מבוסס על מחקרי התפתחות ילדים',         'color' => 'text-mint',  'bg' => 'bg-mint-soft', 'ring' => 'ring-mint/25'],
          ['path' => '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
               'title' => 'פיתוח דרך משחק',         'desc' => 'גירוי קוגניטיבי בכל שלב גיל',           'color' => 'text-sun',   'bg' => 'bg-sun-soft',  'ring' => 'ring-sun/25'],
          ['path' => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
               'title' => 'איכות ובטיחות',          'desc' => 'עומד בתקנים הבינלאומיים הקפדניים',     'color' => 'text-lilac', 'bg' => 'bg-lilac-soft','ring' => 'ring-lilac/25'],
      ];
      foreach ($why_items as $r) :
      ?>
      <div class="group flex flex-col items-center text-center bg-white rounded-3xl p-6 border border-border/60 hover:border-transparent hover:shadow-card transition-all duration-300 hover:-translate-y-1">
        <div class="h-16 w-16 rounded-2xl flex items-center justify-center mb-4 ring-4 transition-transform duration-300 group-hover:scale-110 <?php echo esc_attr($r['bg'] . ' ' . $r['ring']); ?>">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="<?php echo esc_attr($r['color']); ?>">
            <?php echo $r['path']; ?>
          </svg>
        </div>
        <p class="text-base font-extrabold text-navy leading-snug"><?php echo esc_html($r['title']); ?></p>
        <p class="text-sm text-muted-foreground mt-2 leading-snug"><?php echo esc_html($r['desc']); ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ── ABOUT BANNER ── -->
<section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-card border border-border/60 overflow-hidden">
      <!-- Subtle background accents -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-coral-soft rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-mint-soft rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div class="relative">
        <div class="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card">
          <img src="<?php echo esc_url($tmpl_dir); ?>/assets/images/about-family.jpg"
               alt="אמא ובת משחקות יחד עם המיקרופון של Spark" loading="lazy"
               class="w-full h-full object-cover">
        </div>
        <!-- Floating stats card -->
        <div class="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 bg-white rounded-2xl shadow-card border border-border/60 px-4 py-3 flex items-center gap-4">
          <div class="text-center">
            <span class="text-lg font-extrabold text-navy">50K+</span>
            <p class="text-[11px] text-muted-foreground leading-tight mt-0.5">משפחות מרוצות</p>
          </div>
          <div class="w-px h-8 bg-border/60"></div>
          <div class="text-center">
            <span class="text-lg font-extrabold text-navy">200+</span>
            <p class="text-[11px] text-muted-foreground leading-tight mt-0.5">מוצרים בקטלוג</p>
          </div>
          <div class="w-px h-8 bg-border/60"></div>
          <div class="text-center flex flex-col items-center">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f5c518" stroke="#f5c518" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span class="text-lg font-extrabold text-navy">4.9</span>
            </div>
            <p class="text-[11px] text-muted-foreground leading-tight mt-0.5">דירוג ממוצע</p>
          </div>
        </div>
      </div>

      <div class="text-center lg:text-right relative">
        <div class="inline-flex items-center gap-2 bg-coral-soft text-coral text-sm font-bold px-4 py-2 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e8614a" stroke="#e8614a" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          הסיפור שלנו
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.05] text-balance text-navy">
          רגעים קטנים של משחק<br>
          <span class="text-mint">שהופכים ללמידה אמיתית.</span>
        </h2>
        <p class="mt-6 text-navy/65 text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mr-0">
          כל מוצר של Spark נועד לעודד סקרנות, לחזק ביטחון עצמי ולתמוך בהתפתחות של ילדכם דרך משחק, שירה וחוויה משותפת עם ההורים.
        </p>
        <a href="#" class="mt-8 group inline-flex items-center gap-2 h-14 px-8 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all duration-200 hover:-translate-y-0.5">
          קראו על Spark
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ── RETAILERS ── -->
<section class="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="relative bg-gradient-to-br from-lilac-soft via-sky-soft to-cream rounded-[36px] p-6 sm:p-10 lg:p-12 overflow-hidden">
      <div class="grid lg:grid-cols-2 gap-8 items-center">
        <div class="text-center lg:text-right">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-base font-semibold text-navy/80 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            לקמעונאים ומפיצים
          </div>
          <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-balance text-navy">
            שותפים להצלחה.<br>
            <span class="text-coral">בואו לעבוד איתנו.</span>
          </h2>
          <p class="mt-5 text-muted-foreground text-lg lg:text-xl max-w-md mx-auto lg:mr-0">
            אנחנו עובדים עם רשתות וחנויות מובילות בישראל ומרחיבים את פעילותנו לשווקים בינלאומיים.
          </p>
          <a href="#" class="mt-7 inline-flex items-center gap-2 h-13 px-7 rounded-full bg-white text-navy font-bold text-base border border-border hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 py-3.5 cursor-pointer">
            לפרטים לקמעונאים
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </a>
        </div>
        <?php
          $retailer_products = function_exists('wc_get_products') ? wc_get_products(['limit' => 3, 'status' => 'publish', 'orderby' => 'date', 'order' => 'DESC']) : [];
          $retailer_positions = [
            'absolute right-2 sm:right-12 top-4 h-40 sm:h-56 drop-shadow-xl" style="transform:rotate(-6deg)',
            'absolute right-32 sm:right-52 bottom-0 h-36 sm:h-48 drop-shadow-xl" style="transform:rotate(5deg)',
            'absolute left-2 sm:left-8 bottom-4 h-44 sm:h-60 drop-shadow-xl" style="transform:rotate(10deg)',
          ];
        ?>
        <div class="relative h-56 sm:h-72 lg:h-80">
          <?php if (!empty($retailer_products)) : ?>
            <?php foreach ($retailer_products as $i => $rp) :
              $img_id  = $rp->get_image_id();
              $img_url = $img_id ? wp_get_attachment_image_url($img_id, 'medium') : '';
              if (!$img_url) continue;
            ?>
            <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($rp->get_name()); ?>" loading="lazy"
                 class="<?php echo $retailer_positions[$i]; ?>">
            <?php endforeach; ?>
          <?php else : ?>
            <img src="<?php echo esc_url($tmpl_dir); ?>/assets/images/product-cube.png" alt="" loading="lazy"
                 class="absolute right-2 sm:right-12 top-4 h-40 sm:h-56 drop-shadow-xl" style="transform:rotate(-6deg)">
            <img src="<?php echo esc_url($tmpl_dir); ?>/assets/images/product-clock.png" alt="" loading="lazy"
                 class="absolute right-32 sm:right-52 bottom-0 h-36 sm:h-48 drop-shadow-xl" style="transform:rotate(5deg)">
            <img src="<?php echo esc_url($tmpl_dir); ?>/assets/images/product-mic.png" alt="" loading="lazy"
                 class="absolute left-2 sm:left-8 bottom-4 h-44 sm:h-60 drop-shadow-xl" style="transform:rotate(10deg)">
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CONTACT ── -->
<section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="flex flex-col items-center text-center mb-10">
      <div class="inline-flex items-center gap-2 bg-coral-soft text-coral text-sm font-bold px-4 py-2 rounded-full mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        יצירת קשר
      </div>
      <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance text-navy leading-[1.05]">צרו <span class="text-coral">איתנו</span> קשר</h2>
      <p class="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">נשמח לשמוע מכם — השאירו פרטים ונחזור אליכם בהקדם.</p>
    </div>

    <form id="contact-form" dir="rtl" novalidate
          class="bg-white border border-border/60 rounded-3xl p-6 sm:p-10 shadow-card space-y-6">
      <?php wp_nonce_field('spark_contact_nonce', 'nonce'); ?>
      <input type="hidden" name="action" value="spark_contact">

      <div class="grid sm:grid-cols-2 gap-6">
        <div class="space-y-2 text-right">
          <label for="contact-name" class="text-base text-navy font-bold block">שם</label>
          <input id="contact-name" name="name" type="text" maxlength="100" placeholder="השם המלא שלך" required
            class="w-full h-11 rounded-xl border border-border bg-background px-4 text-right text-base text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-coral/30">
          <p class="text-sm text-coral hidden" data-error="name"></p>
        </div>
        <div class="space-y-2 text-right">
          <label for="contact-phone" class="text-base text-navy font-bold block">טלפון</label>
          <input id="contact-phone" name="phone" type="tel" maxlength="20" placeholder="050-0000000" required
            class="w-full h-11 rounded-xl border border-border bg-background px-4 text-right text-base text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-coral/30">
          <p class="text-sm text-coral hidden" data-error="phone"></p>
        </div>
      </div>

      <div class="space-y-2 text-right">
        <label for="contact-email" class="text-base text-navy font-bold block">אימייל</label>
        <input id="contact-email" name="email" type="email" maxlength="255" placeholder="name@example.com" required
          class="w-full h-11 rounded-xl border border-border bg-background px-4 text-right text-base text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-coral/30">
        <p class="text-sm text-coral hidden" data-error="email"></p>
      </div>

      <div class="space-y-2">
        <div class="flex items-start gap-3 flex-row-reverse justify-end">
          <input id="contact-consent" name="consent" type="checkbox" required
            class="mt-1 h-4 w-4 rounded border-border text-coral accent-coral">
          <label for="contact-consent" class="text-base text-navy/80 leading-relaxed cursor-pointer text-right">
            מאשר/ת יצירת קשר בטלפון | SMS | וואטסאפ | מייל
          </label>
        </div>
        <p class="text-sm text-coral hidden" data-error="consent"></p>
      </div>

      <div class="flex justify-start">
        <button type="submit"
          class="bg-coral hover:bg-coral/90 text-white font-bold px-10 rounded-full h-12 text-base transition-colors duration-200 disabled:opacity-60 cursor-pointer">
          שליחה
        </button>
      </div>

      <div id="contact-success" class="hidden text-center py-3 px-4 bg-mint-soft text-mint font-bold rounded-xl"></div>
    </form>
  </div>
</section>

</div><!-- /relative z-10 -->

<?php get_footer(); ?>
