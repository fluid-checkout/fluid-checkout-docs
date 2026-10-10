```php
add_action( 'fc_pro_pickup_point_fields',
    /**
     * Add pickup location instructions.
     */
    function() {
        echo '<div class="pickup-instructions">Custom Info</div>';
    },
    10
);
```
