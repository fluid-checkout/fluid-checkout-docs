---
related_hooks:
  - fc_vat_is_vat_number_field
---

Change the VAT number field label, and treat the custom `billing_eu_vat` field as a VAT number field.

```php
add_filter( 'fc_vat_number_field_args', function ( $args ) {
    $args['label'] = __( 'EU VAT number', 'my-store' );
    return $args;
} );

add_filter( 'fc_vat_is_vat_number_field', function ( $is_vat_number_field, $field_key ) {
    if ( 'billing_eu_vat' === $field_key ) {
        return true;
    }

    return $is_vat_number_field;
}, 10, 2 );
```
