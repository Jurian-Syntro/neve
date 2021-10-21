<?php
/**
 * The class are used to get supported post types for the specific context.
 * 
 * @package Neve\Core
 */
namespace Neve\Core;

/**
 * Supported_Post_Types.
 */
class Supported_Post_Types {
	const SUPPORTED_CONTEXTS = array( 'block_editor' );
	
	/**
	 * Get supported post types
	 *
	 * @param  string $context can be block_editor for now.
	 * @return array|false
	 */
	public static function get( $context ) {
		if ( ! in_array( $context, self::SUPPORTED_CONTEXTS, true ) ) {
			return false;
		}

		$get_func = 'get_' . $context;

		return apply_filters( 'neve_post_type_supported_list', self::$get_func(), $context );
	}
	
	/**
	 * Get supported post types for the 'block_editor' context.
	 *
	 * @return array
	 */
	private static function get_block_editor() {
		$all_post_types = array_values(
			get_post_types(
				[
					'public'   => true,
					'_builtin' => false,
				],
				'names' 
			) 
		);

		$exclude_list = array(
			'sfwd-certificates',
			'courses',
			'e-landing-page',
			'piotnetforms-book',
			'piotnetforms',
			'course',
			'piotnetforms-data',
			'jet-menu',
			'jet-popup',
			'adsforwp-groups',
			'pgc_simply_gallery',
			'lesson',
			'editor-story',
			'pafe-form-booking',
			'sfwd-assignment',
			'sfwd-essays',
			'pafe-formabandonment',
			'frm_display',
			'sfwd-transactions',
			'jet-engine',
			'jet-theme-core',
			'product',
			'reply',
			'jet_options_preset',
			'tutor_assignments',
			'brizy_template',
			'jet-smart-filters',
			'pafe-fonts',
			'pafe-form-database',
			'ct_content_block',
			'adsforwp',
			'iamport_payment',
			'tribe_events',
			'mec_esb',
			'elementor_library',
			'testimonial',
			'zion_template',
			'popup',
			'jet-engine-booking',
			'tutor_quiz',
			'piotnetforms-aban',
			'forum',
			'topic',
			'sfwd-quiz',
			'mec-events',
			'jet-woo-builder',
			'neve_custom_layouts',
			'feedzy_imports',
			'neve_cart_notices',
			'visualizer',
		);

		return array_diff( $all_post_types, $exclude_list );
	}
}
