```php
add_filter( 'fc_pro_order_details_section_hook_priority_gift_message',
    /**
     * Force to only Gift message after the order items section.
     *
     * @param mixed $message Message text.
     * @return mixed Filtered value.
     */
    function( $message ) {
        // Make sure we are only change it for woocommerce_thankyou
        if ( $message[0] == 'woocommerce_thankyou' ) {
            $message[2] = 54;
        }

        return $message;
    },
    10
);
```
