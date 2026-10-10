```php
add_filter( 'fc_pro_order_details_order_statuses_display',
    /**
     * Customize order status labels.
     *
     * @param array $statuses_args Array of order status arguments for display.
     * @param WC_Order $order The order object.
     * @return array Filtered value.
     */
    function( $statuses_args, $order ) {
        // Change the label for pending status
        if ( isset( $statuses_args['wc-pending'] ) ) {
            $statuses_args['wc-pending']['label'] = __( 'Awaiting Payment', 'text-domain' );
        }

        // Change the label for processing status
        if ( isset( $statuses_args['wc-processing'] ) ) {
            $statuses_args['wc-processing']['label'] = __( 'Being Prepared', 'text-domain' );
        }

        // Change the label for completed status
        if ( isset( $statuses_args['wc-completed'] ) ) {
            $statuses_args['wc-completed']['label'] = __( 'Successfully Delivered', 'text-domain' );
        }

        return $statuses_args;
    },
    10,
    2
);
```
