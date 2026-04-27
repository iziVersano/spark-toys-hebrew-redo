<?php
defined('ABSPATH') || exit;

/* ──────────────────────────────────────────────
   Theme support
────────────────────────────────────────────── */
function spark_setup() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', ['search-form', 'comment-form', 'gallery', 'caption']);

    register_nav_menus([
        'primary' => 'תפריט ראשי',
    ]);
}
add_action('after_setup_theme', 'spark_setup');

/* ──────────────────────────────────────────────
   Enqueue assets
────────────────────────────────────────────── */
function spark_enqueue() {
    $v = '1.0.3';
    $dir = get_template_directory_uri();

    wp_enqueue_style('spark-main', $dir . '/assets/css/main.css', [], $v);
    wp_enqueue_script('spark-cart', $dir . '/assets/js/cart.js', [], $v, true);
    wp_enqueue_script('spark-main', $dir . '/assets/js/main.js', ['spark-cart'], $v, true);

    wp_localize_script('spark-cart', 'sparkCart', [
        'restUrl' => esc_url_raw(rest_url('wc/store/v1')),
        'nonce'   => wp_create_nonce('wc_store_api'),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'siteUrl' => esc_url(home_url()),
    ]);
}
add_action('wp_enqueue_scripts', 'spark_enqueue');

/* Remove default WooCommerce styles */
add_filter('woocommerce_enqueue_styles', '__return_empty_array');

/* ──────────────────────────────────────────────
   WooCommerce template path override
────────────────────────────────────────────── */
function spark_woocommerce_template_path() {
    return 'woocommerce/';
}
add_filter('woocommerce_template_path', 'spark_woocommerce_template_path');

/* ──────────────────────────────────────────────
   Helper: format price from minor units (WC Store API)
────────────────────────────────────────────── */
function spark_format_price(int $minor_units): string {
    return '₪' . number_format($minor_units / 100, 0, '.', ',');
}

/* ──────────────────────────────────────────────
   Helper: strip HTML
────────────────────────────────────────────── */
function spark_strip_html(string $html): string {
    return wp_strip_all_tags($html);
}

/* ──────────────────────────────────────────────
   Remove WC breadcrumbs (we build our own)
────────────────────────────────────────────── */
remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);

/* ──────────────────────────────────────────────
   Disable WC default wrappers (we supply our own layout)
────────────────────────────────────────────── */
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

/* ──────────────────────────────────────────────
   Contact form submission (AJAX)
────────────────────────────────────────────── */
function spark_contact_submit() {
    check_ajax_referer('spark_contact_nonce', 'nonce');
    $name  = sanitize_text_field($_POST['name'] ?? '');
    $email = sanitize_email($_POST['email'] ?? '');
    $phone = sanitize_text_field($_POST['phone'] ?? '');

    if (!$name || !$email || !$phone) {
        wp_send_json_error(['message' => 'חסרים פרטים']);
    }
    if (!is_email($email)) {
        wp_send_json_error(['message' => 'כתובת אימייל לא תקינה']);
    }

    $to      = get_option('admin_email');
    $subject = 'פנייה חדשה מאתר Spark Toys';
    $body    = "שם: $name\nאימייל: $email\nטלפון: $phone";
    wp_mail($to, $subject, $body);

    wp_send_json_success(['message' => 'הפנייה נשלחה! נחזור אליכם בהקדם.']);
}
add_action('wp_ajax_spark_contact', 'spark_contact_submit');
add_action('wp_ajax_nopriv_spark_contact', 'spark_contact_submit');
