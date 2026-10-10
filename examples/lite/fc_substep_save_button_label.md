```php
add_filter( 'fc_substep_save_button_label',
    /**
     * Customize substep save button label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Update', 'my-theme' );
    },
    10
);
```
