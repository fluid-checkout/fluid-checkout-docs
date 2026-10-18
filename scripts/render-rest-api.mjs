/**
 * Render REST API reference pages from exported JSON.
 * One generated page per route (method + path), similar to hook pages.
 * Pages are MDX, so `{` outside code spans is escaped.
 */

import {escapeMdx} from './render-hook.mjs';

/**
 * @param {string} value
 * @returns {string}
 */
function oneLine(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} value
 * @returns {string}
 */
function yamlString(value) {
  return JSON.stringify(oneLine(value));
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapePipes(value) {
  return String(value).replace(/\|/g, '\\|');
}

/**
 * Stable slug for a route page: `get-address-book`, `post-address-book-address_id`.
 *
 * @param {string} methods
 * @param {string} path
 * @returns {string}
 */
export function restApiRouteSlug(methods, path) {
  const method = String(methods || '')
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(Boolean)[0] || 'route';
  const pathPart = String(path || '')
    .replace(/^\//, '')
    .replace(/\{([^}]+)\}/g, '$1')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return pathPart ? `${method}-${pathPart}` : method;
}

/**
 * Visible label for a route: `GET /address-book`.
 *
 * @param {string} methods
 * @param {string} path
 * @returns {string}
 */
export function restApiRouteLabel(methods, path) {
  return `${String(methods || '').trim()} ${String(path || '').trim()}`.replace(/\s+/g, ' ').trim();
}

/**
 * Flatten resources into one endpoint entry per route.
 *
 * @param {object} document
 * @returns {{
 *   slug: string,
 *   label: string,
 *   methods: string,
 *   path: string,
 *   handler: string,
 *   notes: string,
 *   args: object,
 *   resourceId: string,
 *   resourceTitle: string,
 *   resourceDescription: string,
 *   source: {file?: string, class?: string},
 *   errorIds: string[],
 * }[]}
 */
export function prepareRestApiEndpoints(document) {
  const resources = Array.isArray(document.resources) ? document.resources : [];
  /** @type {ReturnType<typeof prepareRestApiEndpoints>} */
  const endpoints = [];
  /** @type {Map<string, number>} */
  const slugCounts = new Map();

  for (const resource of resources) {
    const resourceId = String(resource.id || '').trim();
    const resourceTitle = String(resource.title || resourceId);
    const resourceDescription = String(resource.description || '');
    const source = resource.source && typeof resource.source === 'object' ? resource.source : {};
    const errorIds = Array.isArray(resource.errorIds) ? resource.errorIds : [];
    const routes = Array.isArray(resource.routes) ? resource.routes : [];

    for (const route of routes) {
      const methods = String(route.methods || '').trim();
      const routePath = String(route.path || '').trim();
      let slug = restApiRouteSlug(methods, routePath);
      const seen = slugCounts.get(slug) || 0;
      slugCounts.set(slug, seen + 1);
      if (seen > 0) {
        slug = `${slug}-${seen + 1}`;
      }

      endpoints.push({
        slug,
        label: restApiRouteLabel(methods, routePath),
        methods,
        path: routePath,
        handler: String(route.handler || ''),
        notes: String(route.notes || ''),
        args: route.args && typeof route.args === 'object' ? route.args : {},
        resourceId,
        resourceTitle,
        resourceDescription,
        source: {
          file: source.file ? String(source.file) : '',
          class: source.class ? String(source.class) : '',
        },
        errorIds: errorIds.map(String),
      });
    }
  }

  return endpoints;
}

/**
 * @param {{routeBasePath?: string} | null | undefined} plugin
 * @param {string} slug
 * @returns {string}
 */
export function restApiEndpointHref(plugin, slug) {
  const route = typeof plugin?.routeBasePath === 'string' ? plugin.routeBasePath.trim() : '';
  if (!route) {
    return `./${slug}`;
  }
  return `/${route.replace(/^\/+|\/+$/g, '')}/rest-api/${slug}/`;
}

/**
 * @param {{routeBasePath?: string} | null | undefined} plugin
 * @returns {string}
 */
export function restApiErrorsHref(plugin) {
  return restApiEndpointHref(plugin, 'errors');
}

/**
 * Other REST error pages named by an optional `relatedRestApiErrors` list of plugin ids.
 *
 * @param {{id?: string, relatedRestApiErrors?: unknown}} plugin
 * @param {{id: string, label?: string, navLabel?: string, routeBasePath?: string, status?: string}[]} catalogPlugins
 * @returns {{id: string, label: string, linkLabel: string, href: string}[]}
 */
export function resolveRelatedRestApiErrors(plugin, catalogPlugins) {
  const ids = plugin.relatedRestApiErrors;
  if (ids == null) {
    return [];
  }
  if (!Array.isArray(ids)) {
    throw new Error(`${plugin.id || 'plugin'} relatedRestApiErrors must be a list of plugin ids.`);
  }

  const byId = new Map(catalogPlugins.map((entry) => [entry.id, entry]));
  /** @type {{id: string, label: string, linkLabel: string, href: string}[]} */
  const related = [];
  for (const id of ids) {
    const target = byId.get(id);
    if (!target || target.status === 'unavailable') {
      throw new Error(
        `${plugin.id || 'plugin'} relatedRestApiErrors references unknown plugin "${id}".`,
      );
    }
    related.push({
      id: target.id,
      label: target.label || target.id,
      linkLabel: target.navLabel || target.label || target.id,
      href: restApiErrorsHref(target),
    });
  }
  return related;
}

/**
 * @param {{id: string, label: string, linkLabel: string, href: string}} related
 * @returns {string}
 */
export function relatedRestApiErrorsCallout(related) {
  const title = related.id === 'pro' ? `Using ${related.label}?` : `${related.linkLabel} REST API errors`;
  const line = `Looking for ${related.label} wire error codes? See the [${related.linkLabel} REST API errors](${related.href}).`;
  return [`:::info[${title}]`, '', line, '', ':::'].join('\n');
}

/**
 * @param {{restApiStatus?: string} | null | undefined} plugin
 * @returns {boolean}
 */
export function isRestApiUpcoming(plugin) {
  return plugin?.restApiStatus === 'upcoming';
}

/**
 * Notice shown on generated REST API pages while restApiStatus is upcoming.
 *
 * @returns {string}
 */
export function restApiUpcomingCallout() {
  return [
    ':::caution[Upcoming]',
    '',
    'This REST API reference is upcoming. Routes, parameters, and wire error codes may change before the public release.',
    '',
    ':::',
  ].join('\n');
}

/**
 * Front-matter lines for upcoming REST API pages (drives noindex).
 *
 * @param {{restApiStatus?: string} | null | undefined} plugin
 * @returns {string[]}
 */
export function restApiUpcomingFrontMatter(plugin) {
  return isRestApiUpcoming(plugin) ? ['rest_api_upcoming: true'] : [];
}

/**
 * @param {{id?: string, label?: string} | null | undefined} plugin
 * @returns {string}
 */
export function restApiIndexDescription(plugin) {
  const label = plugin?.label || 'this plugin';
  const base = `REST API reference for ${label}, including routes, parameters, and wire error codes.`;
  return isRestApiUpcoming(plugin) ? `${base} Upcoming; not a stable public API yet.` : base;
}

/**
 * @param {string} pluginLabel
 * @returns {string}
 */
export function restApiIndexTitle(pluginLabel) {
  return `${pluginLabel} REST API reference`;
}

/**
 * @param {object} document
 * @param {{id?: string, label?: string, routeBasePath?: string}} plugin
 * @param {string | null | undefined} [introMarkdown]
 * @returns {string}
 */
export function renderRestApiIndex(document, plugin, introMarkdown = null) {
  const pluginLabel = plugin.label || plugin.id || 'Plugin';
  const intro = typeof introMarkdown === 'string' ? introMarkdown.trim() : '';
  const endpoints = prepareRestApiEndpoints(document);
  const namespace = String(document.namespace || '');
  const baseUrl = String(document.baseUrl || `{site}/wp-json/${namespace}`);
  const upcoming = isRestApiUpcoming(plugin);

  const lines = [
    '---',
    `title: ${yamlString(restApiIndexTitle(pluginLabel))}`,
    'sidebar_label: Overview',
    `description: ${yamlString(restApiIndexDescription(plugin))}`,
    ...restApiUpcomingFrontMatter(plugin),
    '---',
    '',
    '{/* Generated by scripts/generate-rest-api.mjs. Do not edit. */}',
    '',
    '# REST API',
    '',
  ];

  if (upcoming) {
    lines.push(restApiUpcomingCallout(), '');
  }

  if (intro) {
    lines.push(intro, '');
  }

  lines.push(
    `Namespace: \`${escapeMdx(namespace)}\`. Base URL pattern: \`${escapeMdx(baseUrl)}\`.`,
    '',
    '## Permissions',
    '',
    escapeMdx(document.permissions || ''),
    '',
    '## Response shape',
    '',
  );

  const shape = document.responseShape || {};
  if (shape.successWithData) {
    lines.push(`- ${escapeMdx(shape.successWithData)}`);
  }
  if (shape.successWithoutData) {
    lines.push(`- ${escapeMdx(shape.successWithoutData)}`);
  }
  if (shape.errors) {
    lines.push(`- ${escapeMdx(shape.errors)}`);
  }
  lines.push('');

  lines.push('## Endpoints', '');
  if (endpoints.length === 0) {
    lines.push('No REST endpoints are listed yet.', '');
  } else {
    /** @type {Map<string, typeof endpoints>} */
    const byResource = new Map();
    for (const endpoint of endpoints) {
      const key = endpoint.resourceId || endpoint.resourceTitle;
      if (!byResource.has(key)) {
        byResource.set(key, []);
      }
      byResource.get(key).push(endpoint);
    }

    for (const group of byResource.values()) {
      const first = group[0];
      lines.push(`### ${escapeMdx(first.resourceTitle)}`, '');
      if (first.resourceDescription) {
        lines.push(escapeMdx(first.resourceDescription), '');
      }
      for (const endpoint of group) {
        const summary = oneLine(endpoint.notes || '');
        // Keep path placeholders inside the code span; braces there are valid MDX.
        const link = `[\`${endpoint.label}\`](${restApiEndpointHref(plugin, endpoint.slug)})`;
        lines.push(summary ? `- ${link} — ${escapeMdx(summary)}` : `- ${link}`);
      }
      lines.push('');
    }
  }

  lines.push(
    '## Error codes',
    '',
    `Wire error codes (\`fc_api_*\`) for this plugin are listed on the [REST API errors](${restApiErrorsHref(plugin)}) page.`,
    '',
  );

  return `${lines.join('\n').trim()}\n`;
}

/**
 * Shared errors page for a plugin.
 *
 * @param {object} document
 * @param {{id?: string, label?: string, routeBasePath?: string}} plugin
 * @param {{id: string, label: string, linkLabel: string, href: string}[]} [related]
 * @returns {string}
 */
export function renderRestApiErrorsPage(document, plugin, related = []) {
  const pluginLabel = plugin.label || plugin.id || 'Plugin';
  const upcoming = isRestApiUpcoming(plugin);
  const lines = [
    '---',
    `title: ${yamlString(`${pluginLabel} REST API errors`)}`,
    'sidebar_label: Errors',
    `description: ${yamlString(`Wire error codes (fc_api_*) for the ${pluginLabel} REST API.`)}`,
    ...restApiUpcomingFrontMatter(plugin),
    '---',
    '',
    '{/* Generated by scripts/generate-rest-api.mjs. Do not edit. */}',
    '',
    '# REST API errors',
    '',
  ];

  if (upcoming) {
    lines.push(restApiUpcomingCallout(), '');
  }

  lines.push(
    'Wire codes returned in the REST error JSON `code` field. Feature-layer or WooCommerce-internal codes are not published here.',
    '',
  );

  if (related.length > 0) {
    lines.push('## Related error catalogs', '');
    for (const entry of related) {
      lines.push(relatedRestApiErrorsCallout(entry), '');
    }
  }

  lines.push(...renderErrorsSection(document.errors, 'Error codes'));

  return `${lines.join('\n').trim()}\n`;
}

/**
 * One page per route. Do not render PHP source (file, class, or handler);
 * see fc-rest-api.mdc Developer docs export.
 *
 * @param {ReturnType<typeof prepareRestApiEndpoints>[number]} endpoint
 * @param {object} document
 * @param {{id?: string, label?: string, routeBasePath?: string}} plugin
 * @param {{exampleMarkdown?: string | null}} [options]
 * @returns {string}
 */
export function renderRestApiEndpointPage(endpoint, document, plugin, options = {}) {
  const label = endpoint.label || restApiRouteLabel(endpoint.methods, endpoint.path);
  const exampleMarkdown = typeof options.exampleMarkdown === 'string' ? options.exampleMarkdown.trim() : '';
  const notes = oneLine(endpoint.notes || '');
  const description = notes || `REST API route ${label}.`;
  const namespace = String(document.namespace || '');
  const fullPath = `/wp-json/${namespace}${endpoint.path.startsWith('/') ? endpoint.path : `/${endpoint.path}`}`;

  const upcoming = isRestApiUpcoming(plugin);
  const lines = [
    '---',
    `title: ${yamlString(label)}`,
    `sidebar_label: ${yamlString(label)}`,
    `description: ${yamlString(description)}`,
  ];
  if (endpoint.resourceTitle) {
    lines.push(`rest_api_resource: ${yamlString(endpoint.resourceTitle)}`);
  }
  lines.push(...restApiUpcomingFrontMatter(plugin));
  lines.push(
    '---',
    '',
    '{/* Generated by scripts/generate-rest-api.mjs. Do not edit. */}',
    '',
  );

  if (upcoming) {
    lines.push(restApiUpcomingCallout(), '');
  }

  lines.push(
    `**Method:** ${escapeMdx(endpoint.methods || '')}`,
    '',
  );

  if (endpoint.resourceTitle) {
    lines.push(`**Resource:** ${escapeMdx(endpoint.resourceTitle)}`, '');
  }

  if (endpoint.notes) {
    lines.push(escapeMdx(endpoint.notes), '');
  }

  lines.push(
    '## Route',
    '',
    '```',
    `${endpoint.methods} ${fullPath}`,
    '```',
    '',
    '## Parameters',
    '',
  );
  lines.push(...renderArgsTable(endpoint.args));

  lines.push(
    '## Error codes',
    '',
    `See the [REST API errors](${restApiErrorsHref(plugin)}) page for every wire code this plugin may return.`,
    '',
  );

  if (exampleMarkdown) {
    lines.push('## Examples', '', escapeMdx(exampleMarkdown), '');
  }

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

/**
 * @param {object | null | undefined} args
 * @returns {string[]}
 */
function renderArgsTable(args) {
  const entries = args && typeof args === 'object' ? Object.entries(args) : [];
  if (entries.length === 0) {
    return ['This route has no registered parameters.', ''];
  }

  const lines = [
    '| Parameter | Type | Required | Description |',
    '| --- | --- | --- | --- |',
  ];
  for (const [name, schema] of entries) {
    const type = escapePipes(String(schema?.type || 'string'));
    const required = schema?.required ? 'yes' : 'no';
    const description = escapePipes(oneLine(schema?.description || ''));
    lines.push(`| \`${escapePipes(name)}\` | \`${type}\` | ${required} | ${escapeMdx(description)} |`);
  }
  lines.push('');
  return lines;
}

/**
 * @param {object | null | undefined} errors
 * @param {string} heading
 * @returns {string[]}
 */
function renderErrorsSection(errors, heading) {
  const entries = errors && typeof errors === 'object' ? Object.entries(errors) : [];
  if (entries.length === 0) {
    return [
      `## ${heading}`,
      '',
      'No wire error codes are listed for this plugin yet.',
      '',
    ];
  }

  const lines = [
    `## ${heading}`,
    '',
    '| Code | HTTP status | Message |',
    '| --- | --- | --- |',
  ];

  for (const [code, definition] of entries) {
    const status = definition?.status != null ? String(definition.status) : '';
    const message = escapePipes(oneLine(definition?.message || ''));
    lines.push(`| \`${escapePipes(code)}\` | ${escapePipes(status)} | ${escapeMdx(message)} |`);
  }
  lines.push('');
  return lines;
}

/**
 * Sidebar under the REST API category: Overview, Errors, then one category per
 * feature (resource) with that feature's endpoint pages.
 *
 * @param {{slug: string, label: string, resourceId?: string, resourceTitle?: string}[]} endpoints
 * @returns {object[]}
 */
export function renderRestApiSidebarItems(endpoints) {
  /** @type {object[]} */
  const items = [
    {
      type: 'doc',
      id: 'rest-api/index',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'rest-api/errors',
      label: 'Errors',
    },
  ];

  /** @type {Map<string, {label: string, items: object[]}>} */
  const byResource = new Map();
  for (const endpoint of endpoints) {
    const key = String(endpoint.resourceId || endpoint.resourceTitle || 'resource').trim() || 'resource';
    const label = String(endpoint.resourceTitle || endpoint.resourceId || 'Resource').trim() || 'Resource';
    if (!byResource.has(key)) {
      byResource.set(key, {label, items: []});
    }
    byResource.get(key).items.push({
      type: 'doc',
      id: `rest-api/${endpoint.slug}`,
      label: endpoint.label || endpoint.slug,
    });
  }

  for (const group of byResource.values()) {
    items.push({
      type: 'category',
      label: group.label,
      items: group.items,
    });
  }

  return items;
}
