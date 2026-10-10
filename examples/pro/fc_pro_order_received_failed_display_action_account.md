```php
add_filter( 'fc_pro_order_received_failed_display_action_account',
    /**
     * Enable the "My account" button on failed order pages.
     *
     * @param bool $display Whether to display order received failed display action account. Default false.
     * @return bool Filtered value.
     */
    function( $display ) {
        return true;
    },
    10
);
```
