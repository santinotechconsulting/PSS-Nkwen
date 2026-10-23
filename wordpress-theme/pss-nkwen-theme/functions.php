<?php
/**
 * PSS Nkwen Traditional Theme Functions
 */

function pss_nkwen_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption'));

    register_nav_menus(array(
        'primary' => __('Primary Navigation', 'pss-nkwen-theme'),
        'footer'  => __('Footer Links', 'pss-nkwen-theme'),
    ));
}
add_action('after_setup_theme', 'pss_nkwen_theme_setup');

function pss_nkwen_theme_scripts() {
    wp_enqueue_style('pss-nkwen-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'pss_nkwen_theme_scripts');
