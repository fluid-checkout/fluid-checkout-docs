import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {assertRestApiDocument, writeRestApiDocs} from './generate-rest-api.mjs';
import {
  renderRestApiIndex,
  renderRestApiResourcePage,
  renderRestApiSidebarItems,
} from './render-rest-api.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

test('renderRestApiIndex includes namespace, resources, and wire errors', () => {
  const page = renderRestApiIndex(fixture, {id: 'pro', label: 'Fluid Checkout PRO', routeBasePath: 'pro'}, '## Intro\n\nAuth notes.');
  assert.match(page, /title: "Fluid Checkout PRO REST API reference"/);
  assert.match(page, /## Intro/);
  assert.match(page, /fluid-checkout\/v1/);
  assert.match(page, /\[`Address Book`\]\(\/pro\/rest-api\/address-book\/\)/);
  assert.match(page, /fc_api_forbidden/);
  assert.doesNotMatch(page, /featureErrorMap/);
  assert.doesNotMatch(page, /required_field_missing/);
});

test('renderRestApiResourcePage includes routes, notes, and resource errors', () => {
  const page = renderRestApiResourcePage(fixture.resources[0], fixture, {
    id: 'pro',
    label: 'Fluid Checkout PRO',
    routeBasePath: 'pro',
  });
  assert.match(page, /# Address Book/);
  assert.match(page, /GET \/address-book/);
  assert.match(page, /Full replace/);
  assert.match(page, /fc_api_address_not_found/);
  assert.match(page, /inc\/rest-api\/v1\/class-v1-endpoint-address-book\.php/);
});

test('renderRestApiSidebarItems lists overview and resources', () => {
  const items = renderRestApiSidebarItems([{id: 'address-book', title: 'Address Book'}]);
  assert.deepEqual(items[0], {type: 'doc', id: 'rest-api/index', label: 'Overview'});
  assert.deepEqual(items[1], {type: 'doc', id: 'rest-api/address-book', label: 'Address Book'});
});

test('writeRestApiDocs writes pages and sidebar JSON', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-rest-api-docs-'));
  const plugin = {id: 'pro', label: 'Fluid Checkout PRO', routeBasePath: 'pro'};

  fs.mkdirSync(path.join(tmp, 'docs', 'pro'), {recursive: true});
  fs.mkdirSync(path.join(tmp, 'sidebars'), {recursive: true});
  fs.mkdirSync(path.join(tmp, 'rest-api-intro', 'pro'), {recursive: true});
  fs.writeFileSync(path.join(tmp, 'rest-api-intro', 'pro', 'index.md'), '## Intro\n\nHello REST.\n');

  const result = writeRestApiDocs(tmp, plugin, fixture);
  assert.equal(result.resourceCount, 1);

  const index = fs.readFileSync(path.join(tmp, 'docs', 'pro', 'rest-api', 'index.md'), 'utf8');
  assert.match(index, /Hello REST/);
  assert.match(index, /Address Book/);

  const resource = fs.readFileSync(path.join(tmp, 'docs', 'pro', 'rest-api', 'address-book.md'), 'utf8');
  assert.match(resource, /Full replace/);

  const sidebar = JSON.parse(fs.readFileSync(path.join(tmp, 'sidebars', 'pro.rest-api.json'), 'utf8'));
  assert.equal(sidebar[0].id, 'rest-api/index');
  assert.equal(sidebar[1].id, 'rest-api/address-book');
});

test('committed pro rest-api.json passes assertRestApiDocument', () => {
  const dataPath = path.join(root, 'data', 'pro', 'rest-api.json');
  assert.ok(fs.existsSync(dataPath), 'data/pro/rest-api.json should exist');
  const document = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  assertRestApiDocument(document, 'data/pro/rest-api.json');
  assert.ok(document.resources.some((resource) => resource.id === 'address-book'));
});
