
<?php get_header(); ?>

    <div class="contentBox">
        <div class="innerBox">
            <h2>Page Not Found!</h2>
            <p>You are in the wrong page.. please search from here</p>
            <p>
                <form action="<?php echo home_url(); ?>" method="GET">
                    <input type="text" placeholder="Search here" name="search">
                </form>
            </p>
        </div>
    </div>

<?php get_footer(); ?>
