<?php
defined('ABSPATH') || exit;

/**
 * REST endpoints for the Spark Editor admin UI.
 *
 * Namespace: spark-toys/v1
 *  - GET/POST /hero                  → read/write hero video URLs (theme_mod)
 *  - GET/POST /category/{id}         → read/write per-category image + title overrides (term meta)
 *
 * Auth: same-origin via the WP REST cookie nonce. wp.apiFetch automatically sends
 * X-WP-Nonce when the user is logged in. Capability is checked per-route.
 */

add_action('rest_api_init', function () {

    /* Hero videos ─────────────────────────────────────────── */
    register_rest_route('spark-toys/v1', '/hero', [
        [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'spark_rest_hero_get',
            'permission_callback' => 'spark_rest_can_edit_theme',
        ],
        [
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'spark_rest_hero_post',
            'permission_callback' => 'spark_rest_can_edit_theme',
            'args' => [
                'video_1' => [ 'type' => 'string', 'required' => false ],
                'video_2' => [ 'type' => 'string', 'required' => false ],
            ],
        ],
    ]);

    /* Category override ───────────────────────────────────── */
    register_rest_route('spark-toys/v1', '/category/(?P<id>\d+)', [
        [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'spark_rest_category_get',
            'permission_callback' => 'spark_rest_can_edit_terms',
        ],
        [
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'spark_rest_category_post',
            'permission_callback' => 'spark_rest_can_edit_terms',
            'args' => [
                'image_url'     => [ 'type' => 'string', 'required' => false ],
                'display_title' => [ 'type' => 'string', 'required' => false ],
            ],
        ],
    ]);
});

function spark_rest_can_edit_theme() {
    return current_user_can('edit_theme_options');
}

function spark_rest_can_edit_terms() {
    return current_user_can('manage_product_terms') || current_user_can('manage_categories');
}

function spark_rest_hero_get() {
    return rest_ensure_response([
        'video_1' => get_theme_mod('spark_hero_video_1', ''),
        'video_2' => get_theme_mod('spark_hero_video_2', ''),
    ]);
}

function spark_rest_hero_post(WP_REST_Request $req) {
    $params = $req->get_json_params();
    if (!is_array($params)) {
        $params = $req->get_params();
    }

    if (array_key_exists('video_1', $params)) {
        set_theme_mod('spark_hero_video_1', esc_url_raw((string) $params['video_1']));
    }
    if (array_key_exists('video_2', $params)) {
        set_theme_mod('spark_hero_video_2', esc_url_raw((string) $params['video_2']));
    }

    return rest_ensure_response([
        'video_1' => get_theme_mod('spark_hero_video_1', ''),
        'video_2' => get_theme_mod('spark_hero_video_2', ''),
    ]);
}

function spark_rest_category_get(WP_REST_Request $req) {
    $term_id = (int) $req['id'];
    $term    = get_term($term_id, 'product_cat');
    if (!$term || is_wp_error($term)) {
        return new WP_Error('not_found', 'Category not found', ['status' => 404]);
    }
    return rest_ensure_response([
        'id'            => $term_id,
        'name'          => $term->name,
        'slug'          => $term->slug,
        'image_url'     => (string) get_term_meta($term_id, 'spark_image_url', true),
        'display_title' => (string) get_term_meta($term_id, 'spark_display_title', true),
    ]);
}

function spark_rest_category_post(WP_REST_Request $req) {
    $term_id = (int) $req['id'];
    $term    = get_term($term_id, 'product_cat');
    if (!$term || is_wp_error($term)) {
        return new WP_Error('not_found', 'Category not found', ['status' => 404]);
    }

    $params = $req->get_json_params();
    if (!is_array($params)) {
        $params = $req->get_params();
    }

    if (array_key_exists('image_url', $params)) {
        update_term_meta($term_id, 'spark_image_url', esc_url_raw((string) $params['image_url']));
    }
    if (array_key_exists('display_title', $params)) {
        update_term_meta($term_id, 'spark_display_title', sanitize_text_field((string) $params['display_title']));
    }

    return rest_ensure_response([
        'id'            => $term_id,
        'image_url'     => (string) get_term_meta($term_id, 'spark_image_url', true),
        'display_title' => (string) get_term_meta($term_id, 'spark_display_title', true),
    ]);
}
