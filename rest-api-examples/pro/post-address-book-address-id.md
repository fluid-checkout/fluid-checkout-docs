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
