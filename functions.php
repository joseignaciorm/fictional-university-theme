<?php

/**
 * CUSTOM REST API ROUTE: 
 */
require get_theme_file_path( '/inc/search-route.php' );


/**
 * WP REST API: WP JSON DATA
 */
if (!function_exists('university_custom_rest')) {
    function university_custom_rest () {
        register_rest_field( 'post', 'authorName', array(
            'get_callback' => function () {
                return get_the_author();
            }
        ) );
    }
}

add_action('rest_api_init', 'university_custom_rest');

/**
 * Reusable Functions
 */
function pageBanner($args=NULL) {
    if (!isset($args['title'])) {
        $args['title'] = get_the_title();
    }

    if (!isset($args['subtitle'])) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    
    if (!isset($args['photo'])) {
        if (get_field('page_banner_background_image')) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri( '/images/ocean.jpg' );
        }
    } ?>

    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
            <div class="page-banner__intro">
                <p><?php echo $args['subtitle']; ?></p>
            </div>
        </div>  
    </div>
    <?php
}


/**
 * UNIVERSITY FILES
 */
if (!function_exists('university_files')) {
    function university_files() {
        wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
        wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

        wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyC4rnB4f7qisVN-whlA_cqq5dKgo08vIg8', NULL, '1.0', true);
    
        if (strstr($_SERVER['SERVER_NAME'], 'fictional-university.test')) {
            wp_enqueue_script('main-university-js', 'http://localhost:3000/bundled.js', NULL, '1.0', true); # This only work in our local machine. Not on a production server.
        } else {
                wp_enqueue_script('our-vendors-js', get_theme_file_uri('/bundled-assets/vendors~scripts.7d054c267a52fa2373d3.js'), NULL, '1.0', true);
                wp_enqueue_script('main-university-js', get_theme_file_uri('/bundled-assets/scripts.aea3784fb848aa7a125b.js'), NULL, '1.0', true);
                wp_enqueue_style('our-main-styles', get_theme_file_uri('/bundled-assets/styles.aea3784fb848aa7a125b.css'));
            }  
        
        // Function that will output JavaScript Data intohtml source of the WebPage
        wp_localize_script('main-university-js', 'universityData', array(
            'root_url' => get_site_url() // Return url of the WP installation.
        ));
    }
}

add_action('wp_enqueue_scripts', 'university_files');


/**
 * UNIVERSITY THEME FEATURES
 */
function university_features() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'professorLandscape', '400', '260', true ); # Nickname, width, height, crop.
    add_image_size( 'professorPortrait', '480', '650', true );
    add_image_size( 'pageBanner', 1500, 350, true );
}

add_action('after_setup_theme', 'university_features');


/**
 * Custom Query - To set or adjust the query before WP load the default query.
 */
if (!function_exists('university_adjust_queries')) {
    function university_adjust_queries($query) {
        /**
         *  Custom Query: CPT Campus
         */
        if (!is_admin() AND is_post_type_archive('campus') AND $query->is_main_query()) {
            $query->set('posts_per_page', -1);
        }


        /**
         *  Custom Query: CPT Program
         */
        if (!is_admin() AND is_post_type_archive('program') AND $query->is_main_query()) {
            $query->set('posts_per_page', -1);
            $query->set('orderby', 'title');
            $query->set('order', 'ASC');
        }


        /**
         *  Custom Query: CPT Event
         */
        if(!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
            $today = date('Ymd');
            $query->set('meta_key', 'event_date');
            $query->set('orderby', 'meta_value_num');
            $query->set('order', 'ASC');
            $query->set('meta_query', array(
                array(
                    'key' => 'event_date',
                    'compare' => '>=',
                    'value' => $today,
                    'type' => 'numeric'
                )
            ));
        }
    }
}

add_action('pre_get_posts', 'university_adjust_queries');


/**
 * UNIVERSITY ADVANCED CUSTOM FIELD FILTER - GOOGLE MAP API
 */
if (!function_exists('universityMapKey')) {
    function universityMapKey($api) {
        $api['key'] = 'AIzaSyC4rnB4f7qisVN-whlA_cqq5dKgo08vIg8';

        return $api;
    }
}

add_filter('acf/fields/google_map/api', 'universityMapKey');