# EU-VAT Assistant hook data

`actions.json` and `filters.json` follow the [wp-hooks/generator](https://github.com/wp-hooks/generator) 1.0.x schema (`$schema` + `hooks[]`).

These files are the generator 1.0.2 export from `fluid-checkout/fc-vat-assistant` at `release/next-PATCH`, commit `344de3f169c740ab75e2ddc1d74ec03566f307a8` (merge of [fc-vat-assistant#89](https://github.com/fluid-checkout/fc-vat-assistant/pull/89)). The plugin repository is private. `actions.json` has no hooks.

`line` is optional. The 1.0.x schema does not define it, and this export does not include it. When a hook object includes an integer `line` (or a `file` value ending in `:123`), the generated page prints that location.
