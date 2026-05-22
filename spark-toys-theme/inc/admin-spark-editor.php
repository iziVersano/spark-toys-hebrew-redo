<?php
defined('ABSPATH') || exit;

/**
 * Spark Editor — admin page under Appearance.
 * Renders a React UI (using WP's bundled wp-element / wp-components / wp-api-fetch)
 * for editing hero videos and per-category overrides.
 */

add_action('admin_menu', function () {
    add_theme_page(
        'Spark Editor',
        'Spark Editor',
        'edit_theme_options',
        'spark-editor',
        'spark_editor_render_page'
    );
});

function spark_editor_render_page() {
    echo '<div class="wrap spark-editor-wrap"><h1>Spark Editor</h1><div id="spark-editor-root"></div></div>';
}

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'appearance_page_spark-editor') {
        return;
    }

    $v   = '1.6.2';
    $dir = get_template_directory_uri();

    // Media uploader (wp.media)
    wp_enqueue_media();

    wp_enqueue_style(
        'spark-editor-css',
        $dir . '/assets/admin/spark-editor.css',
        ['wp-components'],
        $v
    );

    wp_enqueue_script(
        'spark-editor-js',
        $dir . '/assets/admin/spark-editor.js',
        ['wp-element', 'wp-components', 'wp-api-fetch', 'wp-i18n'],
        $v,
        true
    );

    // Bootstrap data: list of WC product categories
    $cats = get_terms([
        'taxonomy'   => 'product_cat',
        'hide_empty' => false,
        'orderby'    => 'count',
        'order'      => 'DESC',
    ]);

    $cat_payload = [];
    if (!is_wp_error($cats)) {
        foreach ($cats as $cat) {
            if ($cat->slug === 'uncategorized') continue;
            $cat_payload[] = [
                'id'            => $cat->term_id,
                'name'          => $cat->name,
                'slug'          => $cat->slug,
                'image_url'     => (string) get_term_meta($cat->term_id, 'spark_image_url', true),
                'display_title' => (string) get_term_meta($cat->term_id, 'spark_display_title', true),
            ];
        }
    }

    $bootstrap_products = function (array $ids) {
        $payload = [];
        if ($ids && function_exists('wc_get_products')) {
            $prods = wc_get_products([ 'include' => $ids, 'limit' => count($ids), 'orderby' => 'include' ]);
            foreach ($prods as $p) {
                $img_id = $p->get_image_id();
                $payload[] = [
                    'id'    => $p->get_id(),
                    'name'  => $p->get_name(),
                    'sku'   => $p->get_sku(),
                    'price' => $p->get_price(),
                    'image' => $img_id ? wp_get_attachment_image_url($img_id, 'thumbnail') : '',
                ];
            }
        }
        return $payload;
    };

    $hot_ids               = array_values(array_filter(array_map('intval', (array) get_option('spark_hot_product_ids', []))));
    $hot_products_payload  = $bootstrap_products($hot_ids);
    $feat_ids              = array_values(array_filter(array_map('intval', (array) get_option('spark_featured_product_ids', []))));
    $feat_products_payload = $bootstrap_products($feat_ids);

    wp_localize_script('spark-editor-js', 'sparkEditor', [
        'restRoot'   => esc_url_raw(rest_url('spark-toys/v1')),
        'nonce'      => wp_create_nonce('wp_rest'),
        'categories' => $cat_payload,
        'hero'       => [
            'video_1' => get_theme_mod('spark_hero_video_1', ''),
            'video_2' => get_theme_mod('spark_hero_video_2', ''),
            'video_3' => get_theme_mod('spark_hero_video_3', ''),
        ],
        'defaults'   => [
            'video_1' => $dir . '/assets/videos/hero.mp4',
            'video_2' => $dir . '/assets/videos/galgal.mp4',
            'video_3' => $dir . '/assets/videos/soldier.mp4',
        ],
        'hotProducts' => [
            'ids'      => $hot_ids,
            'products' => $hot_products_payload,
        ],
        'featuredProducts' => [
            'ids'      => $feat_ids,
            'products' => $feat_products_payload,
        ],
    ]);
});
