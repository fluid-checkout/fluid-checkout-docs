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
