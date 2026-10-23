<?php
/**
 * Header template for PSS Nkwen Traditional Theme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="site-header">
    <div class="pss-container" style="display:flex; justify-content:space-between; align-items:center;">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-title">
            PSS Nkwen
            <small style="display:block; font-size:12px; color:#64748b; font-weight:normal;">Presbyterian Secondary School · Bamenda</small>
        </a>
        <nav class="main-nav">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'fallback_cb'    => false,
            ));
            ?>
        </nav>
    </div>
</header>
