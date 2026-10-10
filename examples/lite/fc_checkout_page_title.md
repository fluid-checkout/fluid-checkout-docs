---
related_hooks:
  - fc_display_checkout_page_title
---

```php
add_filter( 'fc_checkout_page_title',
    /**
     * Customize checkout page title.
     *
     * @param mixed $title Title text.
     * @return mixed Filtered value.
     */
    function( $title ) {
        return __( 'Complete Your Order', 'my-theme' );
    },
    10
);

add_filter( 'fc_display_checkout_page_title',
    /**
     * Show checkout page title.
     *
     * @param bool $title Title text. Default false.
     * @return bool Filtered value.
     */
    function( $title ) {
        return true;
    },
    10
);
```
