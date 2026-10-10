```php
add_action( 'fc_checkout_before_main_section',
    /**
     * Add opening tag for inner container.
     */
    function() {
        ?>
        <div class="container_inner custom-class">
        <?php
    },
    10
);
```
