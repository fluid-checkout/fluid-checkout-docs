```php
add_filter( 'fc_mailcheck_suggestion_message',
    /**
     * Change the Mailcheck email typo suggestion message.
     * @param  $message  The email typo replacement message. Should include a `%s` marker that will be replaced with the suggested email address fix.
     *
     * @param string $text Text to display.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'It looks like your email address might have a small typo. Did you mean %s?', 'your-text-domain' );
    },
    10
);
```
