<?php
/**
 * Repeater Control. Handles data passing from args to JS.
 *
 * @package Neve\Customizer\Controls\React
 */

namespace Neve\Customizer\Controls\React;

/**
 * Class Repeater
 *
 * @package Neve\Customizer\Controls\React
 */
class Repeater extends \WP_Customize_Control {

	/**
	 * Control type.
	 *
	 * @var string
	 */
	public $type = 'neve_repeater_control';

	/**
	 * Additional arguments passed to JS.
	 *
	 * @var array
	 */
	public $fields = [];

	/**
	 * Additional arguments passed to JS.
	 *
	 * @var array
	 */
	public $allow_new_fields = 'yes';

	/**
	 * Send to JS.
	 */
	public function json() {
		$json           		  = parent::json();
		$json['fields'] 		  = $this->fields;
		$json['allow_new_fields'] = $this->allow_new_fields;
		return $json;
	}

	/**
	 * This method overrides the default render
	 * so that nothing is rendered.
	 * Previously it would try to put an input element where the value was `esc_attr()`
	 * This would trigger notices in PHP
	 * It is not required to have a render as it is being handled by React.
	 */
	final public function render_content() {
		// this is rendered from React
	}
}
