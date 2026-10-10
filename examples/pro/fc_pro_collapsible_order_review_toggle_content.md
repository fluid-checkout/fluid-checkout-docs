```php
add_action( 'fc_pro_collapsible_order_review_toggle_content',
    /**
     * Render a short notice next to the collapsible toggle title.
     */
    function() {
        echo '<span class="fc-notice">Free shipping applied automatically.</span>';
    },
    10
);
```
