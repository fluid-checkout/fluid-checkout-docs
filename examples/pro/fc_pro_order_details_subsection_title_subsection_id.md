In `fc_pro_order_details_subsection_title_{subsection_id}`, `order_notes` replaces `{subsection_id}`.

```php
add_filter( 'fc_pro_order_details_subsection_title_order_notes',
    /**
     * Customize the Order Notes subsection title.
     *
     * @param string $title The subsection title.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Your Special Instructions', 'text-domain' );
    },
    10
);
```
