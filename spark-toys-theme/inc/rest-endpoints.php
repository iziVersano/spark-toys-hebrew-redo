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
                'video_3' => [ 'type' => 'string', 'required' => false ],
            ],
        ],
    ]);

    /* Hot products override ───────────────────────────────── */
    register_rest_route('spark-toys/v1', '/hot-products', [
        [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'spark_rest_hot_get',
            'permission_callback' => 'spark_rest_can_edit_theme',
        ],
        [
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'spark_rest_hot_post',
            'permission_callback' => 'spark_rest_can_edit_theme',
            'args' => [
                'product_ids' => [ 'type' => 'array', 'required' => false ],
            ],
        ],
    ]);

    /* Featured products override (homepage "products kids love" grid) ─ */
    register_rest_route('spark-toys/v1', '/featured-products', [
        [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'spark_rest_featured_get',
            'permission_callback' => 'spark_rest_can_edit_theme',
        ],
        [
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'spark_rest_featured_post',
            'permission_callback' => 'spark_rest_can_edit_theme',
            'args' => [
                'product_ids' => [ 'type' => 'array', 'required' => false ],
            ],
        ],
    ]);

    register_rest_route('spark-toys/v1', '/products/search', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'spark_rest_products_search',
        'permission_callback' => 'spark_rest_can_edit_theme',
        'args' => [
            'q'  => [ 'type' => 'string', 'required' => false ],
            'ids'=> [ 'type' => 'string', 'required' => false ],
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
        'video_3' => get_theme_mod('spark_hero_video_3', ''),
    ]);
}

function spark_rest_hero_post(WP_REST_Request $req) {
    $params = $req->get_json_params();
    if (!is_array($params)) {
        $params = $req->get_params();
    }

    foreach (['video_1', 'video_2', 'video_3'] as $key) {
        if (array_key_exists($key, $params)) {
            set_theme_mod('spark_hero_' . $key, esc_url_raw((string) $params[$key]));
        }
    }

    return rest_ensure_response([
        'video_1' => get_theme_mod('spark_hero_video_1', ''),
        'video_2' => get_theme_mod('spark_hero_video_2', ''),
        'video_3' => get_theme_mod('spark_hero_video_3', ''),
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

function spark_rest_hot_get() {
    $ids = (array) get_option('spark_hot_product_ids', []);
    $ids = array_values(array_filter(array_map('intval', $ids)));
    return rest_ensure_response([
        'product_ids' => $ids,
        'products'    => spark_rest_products_lookup($ids),
    ]);
}

function spark_rest_hot_post(WP_REST_Request $req) {
    $params = $req->get_json_params();
    if (!is_array($params)) {
        $params = $req->get_params();
    }
    $ids = isset($params['product_ids']) && is_array($params['product_ids'])
        ? array_values(array_filter(array_map('intval', $params['product_ids'])))
        : [];
    $ids = array_slice($ids, 0, 2);
    update_option('spark_hot_product_ids', $ids);
    return rest_ensure_response([
        'product_ids' => $ids,
        'products'    => spark_rest_products_lookup($ids),
    ]);
}

function spark_rest_featured_get() {
    $ids = (array) get_option('spark_featured_product_ids', []);
    $ids = array_values(array_filter(array_map('intval', $ids)));
    return rest_ensure_response([
        'product_ids' => $ids,
        'products'    => spark_rest_products_lookup($ids),
    ]);
}

function spark_rest_featured_post(WP_REST_Request $req) {
    $params = $req->get_json_params();
    if (!is_array($params)) {
        $params = $req->get_params();
    }
    $ids = isset($params['product_ids']) && is_array($params['product_ids'])
        ? array_values(array_filter(array_map('intval', $params['product_ids'])))
        : [];
    $ids = array_slice($ids, 0, 8);
    update_option('spark_featured_product_ids', $ids);
    return rest_ensure_response([
        'product_ids' => $ids,
        'products'    => spark_rest_products_lookup($ids),
    ]);
}

function spark_rest_products_search(WP_REST_Request $req) {
    if (!function_exists('wc_get_products')) {
        return rest_ensure_response([]);
    }

    $ids_param = (string) $req->get_param('ids');
    if ($ids_param !== '') {
        $ids = array_values(array_filter(array_map('intval', explode(',', $ids_param))));
        return rest_ensure_response(spark_rest_products_lookup($ids));
    }

    $q = trim((string) $req->get_param('q'));
    $args = [
        'limit'   => 20,
        'status'  => 'publish',
        'orderby' => 'date',
        'order'   => 'DESC',
    ];
    if ($q !== '') {
        $args['s'] = $q;
    }
    $products = wc_get_products($args);
    return rest_ensure_response(array_map('spark_rest_product_shape', $products));
}

function spark_rest_products_lookup(array $ids) {
    if (!$ids || !function_exists('wc_get_products')) return [];
    $products = wc_get_products([
        'include' => $ids,
        'limit'   => count($ids),
        'orderby' => 'include',
    ]);
    return array_map('spark_rest_product_shape', $products);
}

function spark_rest_product_shape($product) {
    $img_id = $product->get_image_id();
    return [
        'id'    => $product->get_id(),
        'name'  => $product->get_name(),
        'sku'   => $product->get_sku(),
        'price' => $product->get_price(),
        'image' => $img_id ? wp_get_attachment_image_url($img_id, 'thumbnail') : '',
    ];
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
