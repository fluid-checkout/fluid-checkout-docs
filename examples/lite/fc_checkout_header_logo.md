```php
add_action( 'fc_checkout_header_logo',
    /**
     * Add custom header logo.
     */
    function() {
        $home_url = apply_filters( 'fc_checkout_header_logo_home_url', home_url( '/' ) );
        echo sprintf(
            '<a href="%s" class="custom-logo-link" rel="home">%s</a>',
            esc_url( $home_url ),
            '<img src="custom-logo.png" alt="Custom Logo" class="header-logo">'
        );
    },
    10
);
```
