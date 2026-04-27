<footer class="relative overflow-hidden bg-cream/50 border-t border-border/60">
  <!-- Decorative blobs -->
  <div class="blob bg-coral/25 h-72 w-72 -top-20 -right-20"></div>
  <div class="blob bg-sky/25 h-80 w-80 top-40 -left-24"></div>
  <div class="blob bg-sun/25 h-64 w-64 bottom-0 right-1/3"></div>

  <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">

    <!-- Newsletter strip -->
    <div class="relative rounded-3xl overflow-hidden mb-16 shadow-pop">
      <div class="bg-gradient-to-l from-coral via-coral to-sun px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="flex items-start gap-4 text-right">
          <div class="hidden sm:flex h-12 w-12 shrink-0 rounded-2xl bg-white/25 backdrop-blur items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.96 3.43a1 1 0 0 1 1.14-.23l9 4a1 1 0 0 1 0 1.8l-9 4a1 1 0 0 1-1.14-.23l-3.09-3.41a1 1 0 0 1 0-1.36z"/><path d="m5.63 13.5 3.33 3.67 10-7"/></svg>
          </div>
          <div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight">הצטרפו למשפחת ספרק ✨</h3>
            <p class="text-sm text-white/90 mt-1">טיפים להתפתחות, מבצעים סודיים והשקות חמות — ישר למייל.</p>
          </div>
        </div>
        <form class="flex w-full lg:w-auto items-center gap-2 bg-white rounded-full p-1.5 shadow-xl" method="post">
          <?php wp_nonce_field('spark_newsletter', 'newsletter_nonce'); ?>
          <input type="email" name="newsletter_email" placeholder="האימייל שלך" required
            class="border-0 bg-transparent text-navy placeholder:text-navy/50 h-11 px-4 text-right text-base outline-none flex-1 min-w-0">
          <button type="submit" class="rounded-full bg-navy hover:bg-navy/90 text-white h-10 px-5 gap-2 shrink-0 flex items-center font-bold text-sm">
            הרשמה
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </div>

    <!-- Main grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10">

      <!-- Brand block -->
      <div class="col-span-2 md:col-span-3 lg:col-span-4">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-soft">
          <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/spark-logo.png" alt="Spark Toys" class="h-9 w-auto">
        </a>
        <p class="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
          צעצועים אינטראקטיביים עם תוכן עשיר שמפתחים ילדים בעברית מלאה ובאהבה גדולה.
          כל מוצר נבחר בקפידה כדי להצית סקרנות וללוות התפתחות.
        </p>

        <div class="mt-6 space-y-2.5">
          <a href="tel:+97230000000" class="group flex items-center gap-3 text-base text-navy/80 hover:text-coral transition-colors">
            <span class="h-10 w-10 rounded-xl bg-white shadow-soft group-hover:bg-coral group-hover:text-white text-coral flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            03-000-0000
          </a>
          <a href="mailto:hello@sparktoys.co.il" class="group flex items-center gap-3 text-base text-navy/80 hover:text-coral transition-colors">
            <span class="h-10 w-10 rounded-xl bg-white shadow-soft group-hover:bg-mint group-hover:text-white text-mint flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
            hello@sparktoys.co.il
          </a>
          <div class="flex items-center gap-3 text-base text-navy/80">
            <span class="h-10 w-10 rounded-xl bg-white shadow-soft text-sky flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            תל אביב, ישראל
          </div>
        </div>

        <!-- Socials -->
        <div class="flex items-center gap-2 mt-6">
          <a href="#" aria-label="Facebook" class="h-10 w-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-navy hover:bg-sky hover:text-white transition-all duration-300 hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="h-10 w-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-navy hover:bg-coral hover:text-white transition-all duration-300 hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="YouTube" class="h-10 w-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-navy hover:bg-sun hover:text-white transition-all duration-300 hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
        </div>
      </div>

      <!-- Link columns -->
      <div class="col-span-2 md:col-span-3 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        <?php
        $footer_columns = [
            ['title' => 'מוצרים',       'color' => 'bg-coral',  'links' => [['text' => 'כל המוצרים', 'href' => get_post_type_archive_link('product')], ['text' => 'חדשים', 'href' => '#'], ['text' => 'מוצרים מובילים', 'href' => '#'], ['text' => 'מבצעים', 'href' => '#']]],
            ['title' => 'לפי גיל',      'color' => 'bg-mint',   'links' => [['text' => '0–1 שנים', 'href' => '#'], ['text' => '1–2 שנים', 'href' => '#'], ['text' => '2–3 שנים', 'href' => '#'], ['text' => '3+ שנים', 'href' => '#']]],
            ['title' => 'לפי התפתחות', 'color' => 'bg-sky',    'links' => [['text' => 'פיתוח שפה', 'href' => '#'], ['text' => 'מוזיקה וקצב', 'href' => '#'], ['text' => 'חשיבה ולמידה', 'href' => '#'], ['text' => 'מוטוריקה', 'href' => '#']]],
            ['title' => 'שירות לקוחות','color' => 'bg-sun',    'links' => [['text' => 'משלוחים והחזרות', 'href' => '#'], ['text' => 'שאלות נפוצות', 'href' => '#'], ['text' => 'מדיניות פרטיות', 'href' => '#'], ['text' => 'טלפון', 'href' => 'tel:+97230000000']]],
            ['title' => 'אודות',         'color' => 'bg-lilac',  'links' => [['text' => 'Spark Toys', 'href' => '#'], ['text' => 'הסיפור שלנו', 'href' => '#'], ['text' => 'ביקורות', 'href' => '#'], ['text' => 'בלוג', 'href' => '#']]],
        ];
        foreach ($footer_columns as $col) :
        ?>
        <div>
          <h4 class="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
            <span class="h-2 w-2 rounded-full <?php echo esc_attr($col['color']); ?>"></span>
            <?php echo esc_html($col['title']); ?>
          </h4>
          <ul class="space-y-3">
            <?php foreach ($col['links'] as $link) : ?>
            <li>
              <a href="<?php echo esc_url($link['href']); ?>"
                 class="text-base text-muted-foreground hover:text-coral hover:translate-x-[-2px] inline-block transition-all">
                <?php echo esc_html($link['text']); ?>
              </a>
            </li>
            <?php endforeach; ?>
          </ul>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="mt-14 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p class="flex items-center gap-1.5">
        © <?php echo date('Y'); ?> Spark Toys. נוצר עם
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="text-coral" style="fill:#e8614a"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        בישראל.
      </p>
      <div class="flex items-center gap-5">
        <a href="#" class="hover:text-navy transition-colors">תקנון</a>
        <span class="h-1 w-1 rounded-full bg-navy/30"></span>
        <a href="#" class="hover:text-navy transition-colors">מדיניות פרטיות</a>
        <span class="h-1 w-1 rounded-full bg-navy/30"></span>
        <a href="#" class="hover:text-navy transition-colors">משלוחים והחזרות</a>
      </div>
    </div>

  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
