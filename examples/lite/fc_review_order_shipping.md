```php
add_action( 'fc_review_order_shipping',
    /**
     * Replace the shipping total costs with a custom message.
     */
    function() {
        ?>
        <tr class="woocommerce-shipping-totals shipping">
            <th>Shipping totals</th>
            <td data-title="Shipping totals">
                <span class="shipping_method_totals"><?php echo esc_html( 'My custom message about shipping totals.', 'your-text-domain' ); ?></span>
            </td>
        </tr>
        <?php
    },
    10
);
```
