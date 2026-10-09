# EU-VAT Assistant hook data

`actions.json` and `filters.json` follow the [wp-hooks/generator](https://github.com/wp-hooks/generator) 1.0.x schema (`$schema` + `hooks[]`).

The files in this directory are a **small fixture** so the docs site builds before the real export exists. They are not the complete EU-VAT Assistant hook API. The plugin CI will replace them (see CONTRIBUTING.md) after [fc-vat-assistant#89](https://github.com/fluid-checkout/fc-vat-assistant/pull/89) merges.

`line` is optional. The 1.0.x schema does not define it. When a hook object includes an integer `line` (or a `file` value ending in `:123`), the generated page prints that location.
