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

    $v   = '1.5.9';
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

    wp_localize_script('spark-editor-js', 'sparkEditor', [
        'restRoot'   => esc_url_raw(rest_url('spark-toys/v1')),
        'nonce'      => wp_create_nonce('wp_rest'),
        'categories' => $cat_payload,
        'hero'       => [
            'video_1' => get_theme_mod('spark_hero_video_1', ''),
            'video_2' => get_theme_mod('spark_hero_video_2', ''),
        ],
        'defaults'   => [
            'video_1' => $dir . '/assets/videos/hero.mp4',
            'video_2' => $dir . '/assets/videos/galgal.mp4',
        ],
    ]);
});
