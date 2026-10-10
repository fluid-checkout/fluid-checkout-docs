## What hooks are

Fluid Checkout PRO runs WordPress actions and filters for the cart, order pay, order received, and the features that ship with PRO. They work alongside Fluid Checkout Lite hooks, so a store running both plugins can use either set.

Address Book hooks use the prefix `fc_adb_`. Google Address Autocomplete hooks use the prefix `fc_gaa_`. You do not need to edit the plugin.

## Best practices

If you are unsure about how to add the code snippet to your website, check our article:

[How to safely add code snippets to your WooCommerce website]({{CODE_SNIPPETS_ARTICLE_URL}})

## Actions and filters

An action runs your code at a moment in the page. [`fc_pro_order_received_successful`](/pro/hooks/fc_pro_order_received_successful/) runs on the order received page after a successful order.

A filter receives the current value and must return a replacement. [`fc_pro_cart_action_label_continue_shopping`](/pro/hooks/fc_pro_cart_action_label_continue_shopping/) receives the Continue shopping label on the cart.

The [actions](#actions) and [filters](#filters) lists below include every hook exported from Fluid Checkout PRO.

## Read a hook page

Open a hook for its type, the signature, the parameters table, the version that introduced it, and the PHP file that runs it. When you accept more than one parameter, set that count on `add_action` or `add_filter`. The [example](#example) below accepts the order object passed to the order received action.

## Example

```php
/**
 * Change the Continue shopping label on the cart.
 *
 * @param string $value Label text.
 * @return string
 */
add_filter( 'fc_pro_cart_action_label_continue_shopping', function( $value ) {
    return __( 'Back to the shop', 'my-store' );
}, 10 );

/**
 * Thank the customer on the order received page.
 *
 * @param \WC_Order $order Order object.
 */
add_action( 'fc_pro_order_received_successful', function( $order ) {
    echo '<p>' . esc_html( sprintf(
        /* translators: %s: customer first name */
        __( 'Thanks for your order, %s.', 'my-store' ),
        $order->get_billing_first_name()
    ) ) . '</p>';
}, 10 );
```
