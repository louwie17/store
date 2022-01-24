<?php

class IJAB_Store_REST_Controller {
 
    // Here initialize our namespace and resource name.
    public function __construct() {
        $this->namespace     = '/ijab-store/v1';
        $this->resource_name = 'products';
        $this->options_name  = 'options';
    }
 
    // Register our routes.
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->resource_name, array(
            array(
                'methods'   => WP_REST_Server::READABLE,
                'callback'  => array( $this, 'get_items' ),
                'permission_callback' => '__return_true'
                //'permission_callback' => array( $this, 'get_items_permissions_check' ),
            ),
            array(
                'methods'   => WP_REST_Server::CREATABLE,
                'callback'  => array( $this, 'add_item' ),
                'permission_callback' => '__return_true'
                //'permission_callback' => array( $this, 'get_item_permissions_check' ),
            ),
        ) );
        register_rest_route( $this->namespace, '/' . $this->resource_name . '/(?P<id>[\d]+)', array(
            array(
                'methods'   => WP_REST_Server::READABLE,
                'callback'  => array( $this, 'get_item' ),
                'permission_callback' => '__return_true'
                //'permission_callback' => array( $this, 'get_items_permissions_check' ),
            ),
        ) );
        register_rest_route( $this->namespace, '/' . $this->options_name, array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array( $this, 'read_option' ),
                'permission_callback' => '__return_true'
            ),
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array( $this, 'edit_option' ),
                'permission_callback' => '__return_true'
            ),
        ) );
    }
 
    /**
     * Check permissions for the products.
     *
     * @param WP_REST_Request $request Current request.
     */
    public function get_items_permissions_check( $request ) {
        if ( ! current_user_can( 'read' ) ) {
            return new WP_Error( 'rest_forbidden', esc_html__( 'You cannot view the products.  Sorry!' ), array( 'status' => $this->authorization_status_code() ) );
        }
        return true;
    }
 
    /**
     * Grabs all of the products.
     *
     * @param WP_REST_Request $request Current request.
     */
    public function get_items( $request ) {

        global $wpdb;
        return $wpdb->get_results("SELECT * FROM {$wpdb->prefix}store_products");

    }

     /**
     * Grabs the product by ID number
     *
     * @param WP_REST_Request $request Current request.
     */
    public function get_item( $request ) {

        global $wpdb; 
        $id = $request['id'];   

        return $wpdb->get_results("SELECT * FROM {$wpdb->prefix}store_products WHERE id=$id");

    }

    /**
     * Creates a new product in the database
     *
     * @param WP_REST_Request $request Current request.
     */
    public function add_item( $request ) {

        global $wpdb;     
        $table_name     = $wpdb->prefix . 'store_products';
        $title          = $request['title'];
        $description    = $request['description'];    
        $price          = $request['price'];
        $date           = date('Y-m-d H:i:s');     
        $wpdb->insert(
            $table_name, array(
                'date' => $date, 
                'title' => $title, 
                'price' => $price, 
                'description' => $description
            )
        );
    
        $id = $wpdb->insert_id;
    
        return $wpdb->get_results("SELECT * FROM {$wpdb->prefix}store_products WHERE id=$id");

    }

    /**
     * Reads our store option
     *
     * @param WP_REST_Request $request Current request.
     */
    public function read_option( $request ) {

        $content = [
            'option' => get_option( 'ijab_store_option' )
        ];
    
        return $content;
    
    }
    
    /**
     * Edits our store option
     *
     * @param WP_REST_Request $request Current request.
     */
    public function edit_option( $request ) {
    
        $option = $request['option'];
    
        update_option( 'ijab_store_option', $option );
    
        $content = [
            'option' => get_option( 'ijab_store_option' )
        ];
    
        return $content;
        
    }
 
    // Sets up the proper HTTP status code for authorization.
    public function authorization_status_code() {
 
        $status = 401;
 
        if ( is_user_logged_in() ) {
            $status = 403;
        }
 
        return $status;
    }
}
 
// Function to register our new routes from the controller.
function ijab_store_register_rest_routes() {
    $controller = new IJAB_Store_REST_Controller();
    $controller->register_routes();
}
 
add_action( 'rest_api_init', 'ijab_store_register_rest_routes' );