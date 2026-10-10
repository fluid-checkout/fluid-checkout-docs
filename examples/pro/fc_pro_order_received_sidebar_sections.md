```php
add_action( 'fc_pro_order_received_sidebar_sections',
    /**
     * Add customer support widget to order received sidebar.
     */
    function() {
            echo '<div class="order-received-support-widget">';
            echo '<h3>' . esc_html__( 'Need Help?', 'text-domain' ) . '</h3>';
            echo '<p>' . esc_html__( 'Contact us: 
        [email protected]
        ', 'text-domain' ) . '</p>';
            echo '</div>';
    },
    20
);
```
