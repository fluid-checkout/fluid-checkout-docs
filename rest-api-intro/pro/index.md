## Using the API

Fluid Checkout PRO and its Address Book feature expose REST routes under the `fluid-checkout/v1` namespace. Each endpoint page lists the route, parameters, wire error codes (`fc_api_*`), and optional hand-written examples.

Validation failures use those wire codes. The error `message` may include WooCommerce or store-specific text, but the stable identifier for clients is the wire code.

## Authentication

Requests require a logged-in WordPress user.

- **Same site (browser or admin tools):** cookie authentication plus the WordPress REST nonce (`X-WP-Nonce`).
- **Server-to-server:** [Application Passwords](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/) or another supported WordPress REST authentication method.

Unauthenticated requests return `fc_api_forbidden`. See the [WordPress REST API handbook](https://developer.wordpress.org/rest-api/) for authentication details.
