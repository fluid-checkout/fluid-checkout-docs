```php
add_filter( 'fc_pro_order_received_failed_display_action_account',
    /**
     * Enable the "My account" button on failed order pages.
     *
     * @param bool $display_action Whether to display the action. Defaults to false.
     * @return bool Filtered value.
     */
    function( $display_action ) {
        return true;
    },
    10
);
```
