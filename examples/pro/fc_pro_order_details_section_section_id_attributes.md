In `fc_pro_order_details_section_{section_id}_attributes`, `payment_method` replaces `{section_id}`.

```php
add_filter( 'fc_pro_order_details_section_payment_method_attributes',
    /**
     * Add custom attribute to payment method section.
     *
     * @param array $additional_attributes HTML attributes.
     * @return array Filtered value.
     */
    function( $additional_attributes ) {
        $additional_attributes['custom-attribute'] = 'payment-info';
        return $additional_attributes;
    },
    10
);
```
