## Using the API

Fluid Checkout PRO and its Address Book feature expose REST routes under the `fluid-checkout/v1` namespace. The pages below list resources, routes, parameters, and **wire error codes** (`fc_api_*`) returned in the WordPress REST error JSON `code` field.

Validation failures use those wire codes. The error `message` may include WooCommerce or store-specific text, but the stable identifier for clients is the wire code.

## Authentication

Requests require a logged-in WordPress user.

- **Same site (browser or admin tools):** cookie authentication plus the WordPress REST nonce (`X-WP-Nonce`).
- **Server-to-server:** [Application Passwords](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/) or another supported WordPress REST authentication method.

Unauthenticated requests return `fc_api_forbidden`. See the [WordPress REST API handbook](https://developer.wordpress.org/rest-api/) for authentication details.

## Example

List address book entries for the current user (replace the host and credentials):

```bash
curl -X GET 'https://example.com/wp-json/fluid-checkout/v1/address-book' \
  --user 'USERNAME:APPLICATION_PASSWORD'
```

Create an entry:

```bash
curl -X POST 'https://example.com/wp-json/fluid-checkout/v1/address-book' \
  --user 'USERNAME:APPLICATION_PASSWORD' \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "Jane",
    "last_name": "Doe",
    "country": "US",
    "address_1": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "postcode": "10001"
  }'
```

Update an entry with a **full replace** (GET the entry, change fields, then POST the complete object):

```bash
curl -X POST 'https://example.com/wp-json/fluid-checkout/v1/address-book/42' \
  --user 'USERNAME:APPLICATION_PASSWORD' \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "Jane",
    "last_name": "Doe",
    "country": "US",
    "address_1": "456 Oak Avenue",
    "city": "New York",
    "state": "NY",
    "postcode": "10001"
  }'
```
