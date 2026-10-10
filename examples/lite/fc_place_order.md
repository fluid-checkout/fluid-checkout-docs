```php
add_action( 'fc_place_order',
    /**
     * Add place order content.
     *
     * @param string $step_id Checkout step ID.
     * @param bool $is_sidebar Is sidebar.
     */
    function( $step_id, $is_sidebar ) {
        $location_class = $is_sidebar ? 'place-order-sidebar' : 'place-order-main';
        echo '<div class="place-order-info ' . esc_attr( $location_class ) . '">Review and place your order!</div>';
    },
    10,
    2
);
```
