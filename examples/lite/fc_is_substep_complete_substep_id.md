In `fc_is_substep_complete_{substep_id}`, `shipping_method` replaces `{substep_id}`.

```php
add_filter( 'fc_is_substep_complete_shipping_method',
    /**
     * Set specific sub-step as not-complete to force the user to always review that sub-step.
     *
     * @param bool $is_substep_complete Whether the substep is complete.
     * @return bool Filtered value.
     */
    function( $is_substep_complete ) {
        return false;
    },
    10
);
```
