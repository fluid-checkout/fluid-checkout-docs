import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {assertRestApiDocument, writeRestApiDocs} from './generate-rest-api.mjs';
import {
  prepareRestApiEndpoints,
  relatedRestApiErrorsCallout,
  renderRestApiEndpointPage,
  renderRestApiErrorsPage,
  renderRestApiIndex,
  renderRestApiSidebarItems,
  resolveRelatedRestApiErrors,
  restApiRouteSlug,
} from './render-rest-api.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const catalogPlugins = [
  {id: 'lite', label: 'Fluid Checkout Lite', navLabel: 'Lite', routeBasePath: 'lite', status: 'available'},
  {id: 'pro', label: 'Fluid Checkout PRO', navLabel: 'PRO', routeBasePath: 'pro', status: 'available'},
];

const fixture = {
  namespace: 'fluid-checkout/v1',
  baseUrl: '{site}/wp-json/fluid-checkout/v1',
  permissions: 'Requests require a logged-in WordPress user.',
  responseShape: {
    successWithData: 'HTTP 200 with { "data": { ... } } when the handler returns a payload.',
    successWithoutData: 'HTTP 200 with { "success": true } when there is no payload.',
    errors: 'Failures return WordPress REST error JSON.',
  },
  errors: {
    fc_api_forbidden: {message: 'Forbidden access.', status: 403},
    fc_api_address_not_found: {message: 'Address entry was not found.', status: 404},
  },
  resources: [
    {
      id: 'address-book',
      title: 'Address Book',
      description: 'REST API endpoint: Address Book.',
      source: {
        class: 'FC_AddressBook_REST_API_V1_Endpoint_AddressBook',
        file: 'inc/rest-api/v1/class-v1-endpoint-address-book.php',
      },
      errorIds: ['fc_api_forbidden', 'fc_api_address_not_found'],
      routes: [
        {
          methods: 'GET',
          path: '/address-book',
          handler: 'get_address_entries',
          args: {
            user_id: {
              type: 'integer',
              required: false,
              description: 'WordPress user ID.',
            },
          },
        },
        {
          methods: 'POST',
          path: '/address-book/{address_id}',
          handler: 'update_address_entry',
          notes: 'Full replace: send the complete address entry.',
          args: {
            address_id: {type: 'integer', required: true, description: 'Address book entry ID.'},
          },
        },
      ],
    },
  ],
};

test('assertRestApiDocument rejects featureErrorMap and non-wire codes', () => {
  assert.throws(
    () => assertRestApiDocument({...fixture, featureErrorMap: {}}, 'data/pro/rest-api.json'),
    /featureErrorMap/,
  );
  assert.throws(
    () =>
      assertRestApiDocument(
        {
          ...fixture,
          errors: {
            required_field_missing: {message: 'Missing', status: 400},
          },
        },
        'data/pro/rest-api.json',
      ),
    /wire code/,
  );
  assert.doesNotThrow(() => assertRestApiDocument(fixture, 'data/pro/rest-api.json'));
});

test('restApiRouteSlug builds stable method-path slugs', () => {
  assert.equal(restApiRouteSlug('GET', '/address-book'), 'get-address-book');
  assert.equal(
    restApiRouteSlug('POST', '/address-book/{address_id}'),
    'post-address-book-address-id',
  );
});

test('prepareRestApiEndpoints flattens routes with unique slugs', () => {
  const endpoints = prepareRestApiEndpoints(fixture);
  assert.equal(endpoints.length, 2);
  assert.equal(endpoints[0].slug, 'get-address-book');
  assert.equal(endpoints[0].label, 'GET /address-book');
  assert.equal(endpoints[1].slug, 'post-address-book-address-id');
  assert.equal(endpoints[1].resourceTitle, 'Address Book');
});

test('renderRestApiIndex lists endpoints and links to the errors page', () => {
  const page = renderRestApiIndex(fixture, {id: 'pro', label: 'Fluid Checkout PRO', routeBasePath: 'pro'}, '## Intro\n\nAuth notes.');
  assert.match(page, /title: "Fluid Checkout PRO REST API reference"/);
  assert.match(page, /## Intro/);
  assert.match(page, /fluid-checkout\/v1/);
  assert.match(page, /## Endpoints/);
  assert.match(page, /### Address Book/);
  assert.match(page, /\[`GET \/address-book`\]\(\/pro\/rest-api\/get-address-book\/\)/);
  assert.match(page, /\[`POST \/address-book\/\{address_id\}`\]\(\/pro\/rest-api\/post-address-book-address-id\/\)/);
  assert.match(page, /\[REST API errors\]\(\/pro\/rest-api\/errors\/\)/);
  assert.doesNotMatch(page, /\| `fc_api_forbidden` \|/);
  assert.doesNotMatch(page, /featureErrorMap/);
});

test('renderRestApiErrorsPage lists all wire codes and related catalogs', () => {
  const related = resolveRelatedRestApiErrors({id: 'pro', relatedRestApiErrors: ['lite']}, catalogPlugins);
  const page = renderRestApiErrorsPage(fixture, {id: 'pro', label: 'Fluid Checkout PRO', routeBasePath: 'pro'}, related);
  assert.match(page, /title: "Fluid Checkout PRO REST API errors"/);
  assert.match(page, /sidebar_label: Errors/);
  assert.match(page, /## Related error catalogs/);
  assert.match(page, /\[Lite REST API errors\]\(\/lite\/rest-api\/errors\/\)/);
  assert.match(page, /\| `fc_api_forbidden` \| 403 \|/);
  assert.match(page, /\| `fc_api_address_not_found` \| 404 \|/);
});

test('relatedRestApiErrorsCallout matches the changelog callout style', () => {
  const callout = relatedRestApiErrorsCallout({
    id: 'lite',
    label: 'Fluid Checkout Lite',
    linkLabel: 'Lite',
    href: '/lite/rest-api/errors/',
  });
  assert.match(callout, /:::info\[Lite REST API errors\]/);
  assert.match(callout, /\[Lite REST API errors\]\(\/lite\/rest-api\/errors\/\)/);
});

test('renderRestApiEndpointPage points Error codes at the shared errors page', () => {
  const endpoints = prepareRestApiEndpoints(fixture);
  const page = renderRestApiEndpointPage(endpoints[1], fixture, {
    id: 'pro',
    label: 'Fluid Checkout PRO',
    routeBasePath: 'pro',
  }, {
    exampleMarkdown: 'Use a full replace.\n\n```bash\ncurl -X POST\n```',
  });
  assert.match(page, /rest_api_resource: "Address Book"/);
  assert.match(page, /\*\*Method:\*\* POST/);
  assert.match(page, /## Error codes/);
  assert.match(page, /\[REST API errors\]\(\/pro\/rest-api\/errors\/\)/);
  assert.doesNotMatch(page, /\| `fc_api_address_not_found` \|/);
  assert.doesNotMatch(page, /Source:/);
  assert.match(page, /## Examples/);
  const parametersAt = page.indexOf('## Parameters');
  const errorsAt = page.indexOf('## Error codes');
  const examplesAt = page.indexOf('## Examples');
  assert.ok(parametersAt !== -1 && parametersAt < errorsAt && errorsAt < examplesAt);
});

test('renderRestApiSidebarItems puts Errors after Overview, then feature categories', () => {
  const items = renderRestApiSidebarItems([
    {
      slug: 'get-address-book',
      label: 'GET /address-book',
      resourceId: 'address-book',
      resourceTitle: 'Address Book',
    },
    {
      slug: 'post-address-book-address-id',
      label: 'POST /address-book/{address_id}',
      resourceId: 'address-book',
      resourceTitle: 'Address Book',
    },
  ]);
  assert.deepEqual(items[0], {type: 'doc', id: 'rest-api/index', label: 'Overview'});
  assert.deepEqual(items[1], {type: 'doc', id: 'rest-api/errors', label: 'Errors'});
  assert.deepEqual(items[2], {
    type: 'category',
    label: 'Address Book',
    items: [
      {type: 'doc', id: 'rest-api/get-address-book', label: 'GET /address-book'},
      {
        type: 'doc',
        id: 'rest-api/post-address-book-address-id',
        label: 'POST /address-book/{address_id}',
      },
    ],
  });
});

test('writeRestApiDocs writes errors page, endpoint pages, and sidebar JSON', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-rest-api-docs-'));
  const plugin = {
    id: 'pro',
    label: 'Fluid Checkout PRO',
    routeBasePath: 'pro',
    relatedRestApiErrors: ['lite'],
  };

  fs.mkdirSync(path.join(tmp, 'docs', 'pro'), {recursive: true});
  fs.mkdirSync(path.join(tmp, 'sidebars'), {recursive: true});
  fs.mkdirSync(path.join(tmp, 'rest-api-intro', 'pro'), {recursive: true});
  fs.mkdirSync(path.join(tmp, 'rest-api-examples', 'pro'), {recursive: true});
  fs.writeFileSync(path.join(tmp, 'rest-api-intro', 'pro', 'index.md'), '## Intro\n\nHello REST.\n');
  fs.writeFileSync(
    path.join(tmp, 'rest-api-examples', 'pro', 'get-address-book.md'),
    'List entries with curl.\n',
  );

  const result = writeRestApiDocs(tmp, plugin, fixture, catalogPlugins);
  assert.equal(result.endpointCount, 2);
  assert.equal(result.examples.loaded.size, 1);

  const index = fs.readFileSync(path.join(tmp, 'docs', 'pro', 'rest-api', 'index.md'), 'utf8');
  assert.match(index, /Hello REST/);
  assert.match(index, /GET \/address-book/);
  assert.match(index, /\/pro\/rest-api\/errors\//);

  const errors = fs.readFileSync(path.join(tmp, 'docs', 'pro', 'rest-api', 'errors.md'), 'utf8');
  assert.match(errors, /fc_api_forbidden/);
  assert.match(errors, /\/lite\/rest-api\/errors\//);

  const listPage = fs.readFileSync(path.join(tmp, 'docs', 'pro', 'rest-api', 'get-address-book.md'), 'utf8');
  assert.match(listPage, /## Examples/);
  assert.match(listPage, /\/pro\/rest-api\/errors\//);

  const sidebar = JSON.parse(fs.readFileSync(path.join(tmp, 'sidebars', 'pro.rest-api.json'), 'utf8'));
  assert.equal(sidebar[0].id, 'rest-api/index');
  assert.equal(sidebar[1].id, 'rest-api/errors');
  assert.equal(sidebar[2].type, 'category');
  assert.equal(sidebar[2].label, 'Address Book');
});

test('committed lite and pro rest-api.json pass assertRestApiDocument', () => {
  for (const pluginId of ['lite', 'pro']) {
    const dataPath = path.join(root, 'data', pluginId, 'rest-api.json');
    assert.ok(fs.existsSync(dataPath), `data/${pluginId}/rest-api.json should exist`);
    const document = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    assertRestApiDocument(document, `data/${pluginId}/rest-api.json`);
  }
  const pro = JSON.parse(fs.readFileSync(path.join(root, 'data', 'pro', 'rest-api.json'), 'utf8'));
  const endpoints = prepareRestApiEndpoints(pro);
  assert.ok(endpoints.some((endpoint) => endpoint.slug === 'get-address-book'));
});
