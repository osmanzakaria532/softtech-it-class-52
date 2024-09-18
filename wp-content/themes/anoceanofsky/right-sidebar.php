<?php/* Template Name: Right SideBar */?>

    <?php get_header(); ?>

    <style>
        .content-area{
            border-right: 1px solid #cccccc;
            box-sizing: border-box;
            padding-right: 5%;
        }
    </style>

    <div class="contentBox">
        <div class="innerBox">
            <div class="content-area ">
                <?php while(have_posts()) : the_post();  ?>

                    <h2><?php the_title(); ?></h2>

                    <p><?php the_content(); ?></p>

                <?php endwhile; ?>
                
            </div>
            <div class="right-sidebar-area">
                <?php dynamic_sidebar('right-sidebar'); ?>
            </div>
        </div>
    </div>



    <?php get_footer(); ?>