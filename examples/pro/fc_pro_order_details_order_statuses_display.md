```php
add_filter( 'fc_pro_order_details_order_statuses_display',
    /**
     * Customize order status labels.
     *
     * @param mixed $order_statuses_args The order statuses args.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $order_statuses_args, $order ) {
        // Change the label for pending status
        if ( isset( $order_statuses_args['wc-pending'] ) ) {
            $order_statuses_args['wc-pending']['label'] = __( 'Awaiting Payment', 'text-domain' );
        }

        // Change the label for processing status
        if ( isset( $order_statuses_args['wc-processing'] ) ) {
            $order_statuses_args['wc-processing']['label'] = __( 'Being Prepared', 'text-domain' );
        }

        // Change the label for completed status
        if ( isset( $order_statuses_args['wc-completed'] ) ) {
            $order_statuses_args['wc-completed']['label'] = __( 'Successfully Delivered', 'text-domain' );
        }

        return $order_statuses_args;
    },
    10,
    2
);
```
