<?php 

/*
Endpoints for options and products
Need to convert to a class.
Need to add capability to modify and delete products.
Need to add proper permissions.
*/

// REST API Endpoint for Options
add_action( 'rest_api_init', function () {
	register_rest_route( 'ijab-store/v1', '/options', array(
        array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'ijab_read_options_endpoint',
            'permission_callback' => '__return_true'
        ),
        array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => 'ijab_update_options_endpoint',
            'permission_callback' => '__return_true'
        ),
	) );
} );

function ijab_read_options_endpoint( $data ) {

    $content = [
        'option' => get_option( 'ijab_store_option' )
	];

	return $content;

}

function ijab_update_options_endpoint( $data ) {

    $option = $data['option'];

    update_option( 'ijab_store_option', $option );

    $content = [
        'option' => get_option( 'ijab_store_option' )
	];

	return $content;
    
}

// REST API Endpoint for Products
add_action( 'rest_api_init', function () {
	register_rest_route( 'ijab-store/v1', '/products', array(
        array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'ijab_products_endpoint',
            'permission_callback' => '__return_true'
        ),
        array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => 'ijab_insert_product',
            'permission_callback' => '__return_true'
        )	
	) );
} );

// Load all products
function ijab_products_endpoint( $data ) {

	global $wpdb;
	return $wpdb->get_results("SELECT * FROM {$wpdb->prefix}store_products");

}

// Insert product into database
function ijab_insert_product( $data ) {

    global $wpdb;     
    $table_name     = $wpdb->prefix . 'store_products';
    $title          = $data['title'];
    $description    = $data['description'];    
    $price          = $data['price'];
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