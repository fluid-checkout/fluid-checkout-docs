```php
add_filter( 'fc_design_template_option_image_url',
    /**
     * Customize design template option images.
     *
     * @param mixed $url URL.
     * @param string $key Field key.
     * @param mixed $val Val.
     * @return mixed Filtered value.
     */
    function( $url, $key, $val ) {
        if ( 'classic' === $key ) {
            return get_template_directory_uri() . '/images/custom-classic.png';
        }
        return $url;
    },
    10,
    3
);
```
