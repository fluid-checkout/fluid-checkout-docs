```php
add_filter( 'fc_pro_order_details_section_hook_priority_gift_message',
    /**
     * Force to only Gift message after the order items section.
     *
     * @param array $hook_priority An array containing the hook name, callback function, and priority for the gift message section:
     * @return array Filtered value.
     */
    function( $hook_priority ) {
        // Make sure we are only change it for woocommerce_thankyou
        if ( $hook_priority[0] == 'woocommerce_thankyou' ) {
            $hook_priority[2] = 54;
        }

        return $hook_priority;
    },
    10
);
```
