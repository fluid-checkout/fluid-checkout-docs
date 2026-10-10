In `fc_is_step_complete_{step_id}`, `shipping` replaces `{step_id}`.

```php
add_filter( 'fc_is_step_complete_shipping',
    /**
     * Set specific step as not-complete to force the user to always review that step.
     *
     * @param bool $is_step_complete Whether the step is complete.
     * @param string $context Context in which the hook runs. Default checkout.
     * @return bool Filtered value.
     */
    function( $is_step_complete, $context ) {
        return false;
    },
    10,
    2
);
```
