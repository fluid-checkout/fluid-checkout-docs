Shipping

In `fc_pro_{address_type}_address_book_before_entries`, `shipping` replaces `{address_type}`.

```php
add_action( 'fc_pro_shipping_address_book_before_entries',
    /**
     * Add shipping-specific content before address entries.
     */
    function() {
        echo '<div class="shipping-address-header"><h3>Shipping Address</h3></div>';
    },
    10
);
```

Billing

In `fc_pro_{address_type}_address_book_before_entries`, `billing` replaces `{address_type}`.

```php
add_action( 'fc_pro_billing_address_book_before_entries',
    /**
     * Add billing-specific content before address entries.
     */
    function() {
        echo '<div class="billing-address-header"><h3>Billing Address</h3></div>';
    },
    10
);
```
