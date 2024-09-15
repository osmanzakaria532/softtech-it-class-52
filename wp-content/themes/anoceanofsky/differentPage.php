<?php/* Template Name: Right SideBar */?>

    <?php get_header(); ?>

    <div class="contentBox">
        <div class="innerBox">
            <div class="content-area newClass">
                <?php while(have_posts()) : the_post();  ?>

                    <h2><?php the_title(); ?></h2>

                    <p><?php the_content(); ?></p>

                <?php endwhile; ?>
            </div>
            <div class="right-sidebar-area"></div>
        </div>
    </div>



    <?php get_footer(); ?>