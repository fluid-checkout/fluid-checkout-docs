In `fc_payment_method_review_text_{chosen_method_key}`, `bacs` replaces `{chosen_method_key}`.

```php
add_filter( 'fc_payment_method_review_text_bacs',
    /**
     * Customize BACS payment method review text.
     *
     * @param string $payment_method_review_text Payment method review text.
     * @param WC_Payment_Gateway $gateway Payment gateway object.
     * @return string Filtered value.
     */
    function( $payment_method_review_text, $gateway ) {
        return '<span class="payment-method-title">' . __( 'Bank Transfer Payment', 'my-theme' ) . '</span>';
    },
    10,
    2
);
```
