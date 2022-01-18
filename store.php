<?php
/**
 * Plugin Name: Store
 *
 * @package WooCommerce\Admin
 */

 /**
  * Registers report pages.
  */
function register_pages() {
	$options = array(
		'title'      => 'Store',
		'capability' => 'manage_options',
		'path'       => 'store',
		'icon'       => '',
		'position'   => 26,
	);

	add_menu_page(
		$options['title'],
		$options['title'],
		$options['capability'],
		$options['path'],
		'page_wrapper',
		$options['icon'],
		$options['position']
	);
}

function page_wrapper() {
	?>
	<div class="store-wrapper">
	</div>
	<?php
}

add_action( 'admin_menu', 'register_pages' );

/**
 * Register the JS.
 */
function add_extension_register_script() {
	if ( isset( $_GET['page'] ) && ! empty( $_GET['page'] ) && 'store' !== $_GET['page'] ) {
		return;
	}
	
	$script_path       = '/build/index.js';
	$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require( $script_asset_path )
		: array( 'dependencies' => array(), 'version' => filemtime( $script_path ) );
	$script_url = plugins_url( $script_path, __FILE__ );

	wp_register_script(
		'store',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_register_style(
		'store',
		plugins_url( '/build/index.css', __FILE__ ),
		// Add any dependencies styles may have, such as wp-components.
		array(),
		filemtime( dirname( __FILE__ ) . '/build/index.css' )
	);

	wp_enqueue_script( 'store' );
	wp_enqueue_style( 'store' );
}

add_action( 'admin_enqueue_scripts', 'add_extension_register_script' );

// Load REST API Endpoint
require_once plugin_dir_path( __FILE__ ) . 'endpoints.php';

// Create our table during plugin activation
function ijab_store_table_create () {

	global $wpdb;

	$table_name = $wpdb->prefix . "store_products"; 

	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		title tinytext NOT NULL,
		price bigint(20) NOT NULL,
		description longtext NOT NULL,
		PRIMARY KEY  (id)
	) $charset_collate;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );

}
register_activation_hook( __FILE__, 'ijab_store_table_create' );