<?php 





    add_action('after_setup_theme', 'basic_function');

    function basic_function(){

        add_theme_support('title-tag');

        // future image
        add_theme_support('post-thumbnails');

        // menu registration
        register_nav_menu('main-menu', __('Mani Menu', 'softtech-it-class-50'));

        add_theme_support('custom-background', array(
            'default-image' => get_template_directory_uri().'/images/background.png',
        ));

        add_theme_support('custom-header', array(
            'default-image' => get_template_directory_uri().'/images/anoceanofsky.jpg',
        ));

        load_theme_textdomain('softtech-it-class-50', get_template_directory().'/languages');
        // get_template_directory_uri() -> languageke translate korar smy last 'uri' ta bad diye likhte hobe, onnthey kaj krbe ne

        // this "if" for restriction to other user accessibility () all function )
        // if( current_user_can('manage-options') ){}

        // add new menu in dashboard left-side
        register_post_type('basic-testimonials', array(
            'labels' => array(
                'name' => 'Testimonials',
                'add_new_item' => 'Add New Testimonial'
            ),
            'public' => true,
            // > from wordpress dashicons
            'menu_icon' => 'dashicons-testimonial',
            // > from images folder
            // 'menu_icon' => get_template_directory_uri().'/image/anyImage.pnp',
            // > from font-awesome ----------- fort awesome ta kaj krche na
            // 'menu_icon' => 'dashicons-bell-o',
            'menu_position' => 25,
            'supports' => array(
                // 'title', 'editor', 'thumbnail', 'revisions'
                'title', 'thumbnail', 'revisions'
            )
        ));

    }


    // add stylesheet in frontend
    add_action('wp_enqueue_scripts', 'frontend_stylesheet');

    function frontend_stylesheet(){

        // wp_enqueue_style('', 'folderName/style.css', '', '');

        wp_enqueue_style('style', get_stylesheet_uri());
        wp_enqueue_style('font-awesome', get_template_directory_uri().'/css/font-awesome.min.css');
    }

    // add stylesheet in dashboard ba backend
    add_action('admin_enqueue_scripts', 'backend_stylesheet');

    function backend_stylesheet(){

        wp_enqueue_style('font-awesome', get_template_directory_uri().'/css/font-awesome.min.css');

    }

    add_action('widgets_init', 'all_widgets');
    function all_widgets(){
        register_sidebar(array(
            'name' => 'Right Sidebar',
            'description' => "Keep your Right Sidebar here",
            'id' => 'right-sidebar'
        ));
    }



    // custom nav walker menu
    require_once('custom-class-walker-nav-menu.php');

    // initial meta box
    if(file_exists(dirname(__FILE__).'/metabox/init.php')){
        require_once(dirname(__FILE__).'/metabox/init.php');
    }

    // custom meta box
    if(file_exists(dirname(__FILE__).'/metabox/custom-metabox.php')){
        require_once(dirname(__FILE__).'/metabox/custom-metabox.php');
    }

    // redux framework connection
    if(file_exists(dirname(__FILE__).'/themeOptions/redux-core/framework.php')){
        require_once(dirname(__FILE__).'/themeOptions/redux-core/framework.php');
    }

    // redux configuration file
    if(file_exists(dirname(__FILE__).'/themeOptions/sample/redux-config.php')){
        require_once(dirname(__FILE__).'/themeOptions/sample/redux-config.php');
    }
    

    // short-codes registration

    add_shortcode('naam', 'shortcode_function');

    function shortcode_function($fisrterts, $content){

        //
        $atts = shortcode_atts(array(
            'kondike' => 'left',
            'calar' => 'red'
        ), $fisrterts);

        // this line to convert array key to variable
        extract($atts);

        // this proses to dynamic content
        // echo "<h2>".$content."</h2>";
        // echo "<h2 style='text-align: ".$atts['kondike']."'>".$content."</h2>";
        // echo "<h2 style='text-align: ".$kondike."; color: ".$calar.";'>".$content."</h2>";

        printf('<h2 style="text-align: %s; color: %s"> %s </h2>', $kondike, $calar, $content);
    }


    // shortCode inside another shortCode

    add_shortcode('baksho', function($attr, $content){
        return "<div class='box'>".do_shortcode($content)."</div>";
    });

    add_shortcode('heading', function($attr, $content){
        return "<h2>".do_shortcode($content)."</h2>";
    });
    // this line for work shortcode in widgets
    add_filter('widgets_text', 'do_shortcode');






    add_shortcode('testimonial', 'testimonial_shortcode');

    function testimonial_shortcode(){

        ob_start();

        $testimonial = new WP_Query(array(
            'post_type' => 'basic-testimonials',
        )); 
    
        while( $testimonial->have_posts() ) : $testimonial->the_post(); ?>
    
             
            <?php the_title(); ?>
    
        <?php endwhile;

        return ob_get_clean();
    }

    // visual composer > custom widgets

    vc_map(array(
        'name' => 'amader testimonials',
        'base' => 'testimonials',
        'icon' => 'https://cdn4.iconfinder.com/data/icons/discussion-and-communication-5/512/feedback-256.png',
        'params' => array(
            array(
                'param_name' => 'title',
                'type' => 'textfield',
                'heading' => 'Title'
            )
        )
    ));


    
