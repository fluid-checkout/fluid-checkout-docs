Shipping

In `fc_pro_{address_type}_address_book_after_entries`, `shipping` replaces `{address_type}`.

```php
add_action( 'fc_pro_shipping_address_book_after_entries',
    /**
     * Customize this hook.
     */
    function() {
        echo '<div class="shipping-options"><p>You can add special delivery instructions during checkout.</p></div>';
    },
    10
);
```

Billing

In `fc_pro_{address_type}_address_book_after_entries`, `billing` replaces `{address_type}`.

```php
add_action( 'fc_pro_billing_address_book_after_entries',
    /**
     * Customize this hook.
     */
    function() {
        echo '<div class="billing-options"><p>You can add special invoice address instructions during checkout.</p></div>';
    },
    10
);
```
