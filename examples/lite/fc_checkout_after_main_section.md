```php
add_action( 'fc_checkout_after_main_section',
    /**
     * Add closing tag for inner container.
     */
    function() {
        ?>
        </div>
        <?php
    },
    10
);
```
