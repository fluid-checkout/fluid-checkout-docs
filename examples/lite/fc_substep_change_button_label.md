```php
add_filter( 'fc_substep_change_button_label',
    /**
     * Customize substep change button label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Edit', 'my-theme' );
    },
    10
);
```
