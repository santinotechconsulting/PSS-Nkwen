<?php
/**
 * Main index template for PSS Nkwen Traditional Theme
 */
get_header(); ?>

<main class="pss-container" style="padding:40px 20px;">
    <?php if (have_posts()) : ?>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:30px;">
            <?php while (have_posts()) : the_post(); ?>
                <article style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:20px;">
                    <?php if (has_post_thumbnail()) : ?>
                        <div style="margin-bottom:15px;"><?php the_post_thumbnail('medium'); ?></div>
                    <?php endif; ?>
                    <h2 style="font-size:20px; margin-top:0;"><a href="<?php the_permalink(); ?>" style="color:#0f2544; text-decoration:none;"><?php the_title(); ?></a></h2>
                    <div style="font-size:13px; color:#64748b; margin-bottom:10px;"><?php echo get_the_date(); ?></div>
                    <div style="font-size:14px; color:#334155;"><?php the_excerpt(); ?></div>
                </article>
            <?php endwhile; ?>
        </div>
    <?php else : ?>
        <p>No announcements currently published.</p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
