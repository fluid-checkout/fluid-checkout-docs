In `fc_step_title_{step_id}`, `contact` replaces `{step_id}`.

```php
add_filter( 'fc_step_title_contact',
    /**
     * Customize contact step title.
     *
     * @param string $step_title Checkout step title.
     * @param string $context Context in which the hook runs. Default checkout.
     * @return string Filtered value.
     */
    function( $step_title, $context ) {
        return __( 'Your Contact Information', 'your-text-domain' );
    },
    10,
    2
);
```
