# Fluid Checkout Docs

Developer documentation for Fluid Checkout plugins, published at [docs.fluidcheckout.com](https://docs.fluidcheckout.com).

One Docusaurus site holds every plugin. The pilot is **EU-VAT Assistant** only. Fluid Checkout Lite and PRO are listed on the home page as coming soon. Address Book, Google Address Autocomplete, License Manager, Checkout Kit, and Partial Delivery are out of scope for now.

## Local development

Node.js 20 or newer.

```bash
npm ci
npm start
```

`npm start` and `npm run build` both run `npm run generate` first. That reads `data/<plugin>/*.json` and writes `docs/<plugin>/hooks/`.

```bash
npm test
npm run typecheck
npm run build
```

## Folder layout

```text
data/<plugin>/actions.json     # wp-hooks/generator output (source of truth)
data/<plugin>/filters.json
docs/<plugin>/guides/          # hand-written guides, one folder per guide
docs/<plugin>/hooks/           # GENERATED hook pages — do not edit
examples/<plugin>/<hook-slug>/ # optional hand-written example for one hook
sidebars/<plugin>.ts           # sidebar for that docs instance
sidebars/<plugin>.hooks.json   # GENERATED hook sidebar items
plugins.json                   # plugin id, prefix, public/private repo, status
static/img/                    # site icon and favicon
static/CNAME                   # docs.fluidcheckout.com
```

EU-VAT routes:

- `/` home page
- `/eu-vat/` overview
- `/eu-vat/guides/...` guides
- `/eu-vat/hooks/` generated index
- `/eu-vat/hooks/<hook-slug>` one page per hook

Each plugin is a separate Docusaurus docs plugin instance (`routeBasePath` in `plugins.json`), so a later release can version one plugin without versioning the others.

## Add a guide

Create `docs/<plugin>/guides/<guide-slug>/index.md`. Put images in `img/` next to that file and reference them with a relative path:

```md
![Alt text](./img/diagram.svg)
```

The sidebar picks the guide up from the `guides` folder. No generator step.

## Add an example

Create `examples/<plugin>/<hook-slug>/index.md`. `<hook-slug>` is the generated URL slug (braces removed), for example `examples/eu-vat/fc_vat_checkout_eu_vat_number/index.md`. Optional images go in `examples/<plugin>/<hook-slug>/img/` and use a relative path. Re-run `npm run generate`. The hook page imports the example below the reference.

## Generated data

Plugin repositories will run [wp-hooks/generator](https://github.com/wp-hooks/generator) and open a pull request that updates `data/<plugin>/actions.json` and `data/<plugin>/filters.json`. The contract (paths, branch names, versioning trigger, GitHub App secrets) is in [CONTRIBUTING.md](CONTRIBUTING.md).

`data/eu-vat/*.json` is a fixture so this site builds today. The real EU-VAT export arrives after [fc-vat-assistant#89](https://github.com/fluid-checkout/fc-vat-assistant/pull/89) merges.

Dynamic PHP hook names are normalized for the page title and URL. `self::$plugin_prefix` uses `pluginPrefix` from `plugins.json` (`fc_vat` for EU-VAT). Private plugins leave `repository` as `null`, so the source line is a file path with no GitHub link. Set `repository.url` and `repository.branch` only for public repositories.

## Search

Local search (`@easyops-cn/docusaurus-search-local`) is on by default. To switch to Algolia DocSearch, set all three of `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, and `ALGOLIA_INDEX_NAME` (see `.env.example`). The deploy workflow forwards the same names from GitHub Actions secrets when they exist. The Algolia application is still pending, so those secrets are empty for now.

## Hosting

GitHub Pages deploys from GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`). `static/CNAME` is `docs.fluidcheckout.com`. The Pages source is already set to GitHub Actions.

After this repository has its first commit on `main`, branch protection can require a pull request before merging to `main`.

## Versioning

Not active in the pilot. The site shows the latest docs only. When versioning is turned on, snapshot a plugin with:

```bash
npm run docusaurus docs:version:eu-vat 3.0.1
```

Run that only for a plain semver tag such as `3.0.1` (`^[0-9]+\.[0-9]+\.[0-9]+$`). Never snapshot a tag that contains `beta` or `alpha`, including `3.0.2-beta-1` and `3.0.3-alpha-2`.

## Images

`@docusaurus/plugin-ideal-image` is not installed. Guides use ordinary Markdown images with relative paths, and that plugin only optimizes images passed to its React component. Adding it later would change how guides embed pictures, so it is left for a follow-up.

## License

All content, including code snippets and files under `examples/`, is © Fluid Checkout OÜ, all rights reserved (`LICENSE`). The site footer states the same.
