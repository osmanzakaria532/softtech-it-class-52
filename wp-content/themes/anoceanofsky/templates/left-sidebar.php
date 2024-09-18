<?php/* Template Name: Left SideBar */?>

    <?php get_header(); ?>

    <style>
        .content-area{
            border-left: 1px solid #cccccc;
            box-sizing: border-box;
            padding-left: 5%;
        }

        .left-sidebar-area {
            min-height: 10px;
            float: left;
        }
    </style>

    <div class="contentBox">
        <div class="innerBox">
            <div class="left-sidebar-area"></div>
            <div class="content-area ">
                <?php while(have_posts()) : the_post();  ?>

                    <h2><?php the_title(); ?></h2>

                    <p><?php the_content(); ?></p>

                <?php endwhile; ?>
            </div>
        </div>
    </div>



    <?php get_footer(); ?>