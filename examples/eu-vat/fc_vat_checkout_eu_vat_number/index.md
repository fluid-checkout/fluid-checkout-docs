Strip spaces from the checkout VAT number before EU-VAT Assistant validates it.

![EU VAT number field with a validate button](./img/vat-field.svg)

```php
add_filter( 'fc_vat_checkout_eu_vat_number', function ( $vat_number, $country ) {
    if ( 'DE' !== $country ) {
        return $vat_number;
    }

    return preg_replace( '/\s+/', '', (string) $vat_number );
}, 10, 2 );
```
