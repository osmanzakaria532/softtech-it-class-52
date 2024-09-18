<div class="contentBox">
    <div class="innerBox">
        <?php
            while (have_posts()) : the_post(); ?>

            <div class="contentTitle">
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </div>

            <div class="contentText">
                
                <?php the_content(); ?>
                
            </div>

        <?php endwhile; ?>

        <?php

        $alada = new WP_Query(array(
            'post_type' => 'basic-testimonials'
        ));
        
        
        while($alada->have_posts()) : $alada->the_post(); ?>

            <p><?php the_title(); ?></p>
            <p><?php the_post_thumbnail(); ?></p>
            <p><?php echo get_post_meta(get_the_id(), 'sub-title', true); ?></p>
            <p><?php echo get_post_meta(get_the_id(), 'wiki_test_wysiwyg', true); ?></p>

        <?php endwhile; wp_reset_postdata(); ?>
    </div>
</div>
