```php
add_filter( 'fc_no_substep_review_text_notice',
    /**
     * Customize no substep review text notice.
     *
     * @param string $text Text to display.
     * @param string $substep_id Checkout substep ID.
     * @return string Filtered value.
     */
    function( $text, $substep_id ) {
        if ( 'order_notes' === $substep_id ) {
            return __( 'No notes added.', 'my-theme' );
        }
        return __( 'Not specified.', 'my-theme' );
    },
    10,
    2
);
```
