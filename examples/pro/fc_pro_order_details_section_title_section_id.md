In `fc_pro_order_details_section_title_{section_id}`, `order_status` replaces `{section_id}`.

```php
add_filter( 'fc_pro_order_details_section_title_order_status',
    /**
     * Customize order status section title.
     *
     * @param string $section_title The section title.
     * @return string Filtered value.
     */
    function( $section_title ) {
        return __( 'Order Progress', 'text-domain' );
    },
    10
);
```
