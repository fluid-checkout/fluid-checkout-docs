```php
add_action( 'fc_checkout_after_main_section_wrapper',
    /**
     * Add div closing tag.
     */
    function() {
        echo '</div>';
    },
    10
);
```
