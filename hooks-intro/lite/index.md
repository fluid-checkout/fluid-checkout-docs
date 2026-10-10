## What hooks are

Fluid Checkout Lite runs WordPress actions and filters around checkout. Use them to change a label, print something on the page, or turn a behavior on or off. You do not need to edit the plugin.

## Add your own code

Put your callbacks in a child theme `functions.php` file, or in a code snippets plugin. Plugin updates then leave your code in place.

## Actions and filters

An action runs your code at a moment in the page. [`fc_checkout_before_steps`](/lite/hooks/fc_checkout_before_steps/) runs before the checkout steps.

A filter receives the current value and must return a replacement. [`fc_proceed_to_next_step_button_label`](/lite/hooks/fc_proceed_to_next_step_button_label/) receives the next-step button label.

The [actions](#actions) and [filters](#filters) lists below include every hook exported from Fluid Checkout Lite.

## Read a hook page

Open a hook for its type, the signature, the parameters table, the version that introduced it, and the PHP file that runs it. When you accept more than one parameter, set that count on `add_action` or `add_filter`. The [example](#example) below does this for the next-step button.

## Example

```php
/**
 * Change the label of the button that proceeds to the next checkout step.
 *
 * @param string $button_label Button label.
 * @param string $step_id Checkout step ID.
 * @param array $step_args Checkout step arguments.
 * @return string
 */
add_filter( 'fc_proceed_to_next_step_button_label', function( $button_label, $step_id, $step_args ) {
    return __( 'Continue', 'my-store' );
}, 10, 3 );

/**
 * Print a note before the checkout steps.
 *
 * @param \WC_Checkout $checkout Checkout object.
 */
add_action( 'fc_checkout_before_steps', function( $checkout ) {
    echo '<p>' . esc_html__( 'Review each step before you pay.', 'my-store' ) . '</p>';
}, 10 );
```
