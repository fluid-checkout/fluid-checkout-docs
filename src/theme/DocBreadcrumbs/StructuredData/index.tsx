import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useActivePlugin, useDoc} from '@docusaurus/plugin-content-docs/client';
import catalog from '@site/plugins.json';

type CatalogPlugin = {
  id: string;
  label: string;
  routeBasePath?: string;
};

type Crumb = {
  name: string;
  item: string;
};

function withTrailingSlash(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return path.endsWith('/') ? path : `${path}/`;
}

function absolute(siteUrl: string, pathname: string): string {
  return `${siteUrl}${withTrailingSlash(pathname)}`;
}

function isIndividualHookPage(docId: string): boolean {
  return docId.startsWith('hooks/') && docId !== 'hooks/index';
}

function isIndividualRestApiPage(docId: string): boolean {
  return docId.startsWith('rest-api/') && docId !== 'rest-api/index' && docId !== 'rest-api/errors';
}

/**
 * BreadcrumbList for a docs page. Sidebar crumbs stay as they are.
 * This replaces the one-item list the theme emits.
 *
 * - plugin hub: Home > plugin
 * - Using PHP hooks: Home > plugin > Using PHP hooks
 * - hook page: Home > plugin > Using PHP hooks > hook
 * - REST API overview: Home > plugin > REST API
 * - REST endpoint: Home > plugin > REST API > feature > endpoint
 * - changelog: Home > plugin > Changelog
 */
export default function DocBreadcrumbsStructuredData(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const active = useActivePlugin();
  const {metadata, frontMatter} = useDoc();
  if (!active) {
    return null;
  }

  const plugin = (catalog.plugins as CatalogPlugin[]).find((entry) => entry.id === active.pluginId);
  const compatibilityRoute = active.pluginId === 'compatibility' ? 'compatibility' : '';
  const route = (plugin?.routeBasePath || compatibilityRoute || active.pluginData.path || '')
    .replace(/^\/+|\/+$/g, '');
  if (!route) {
    return null;
  }
  const sectionLabel =
    plugin?.label || (active.pluginId === 'compatibility' ? 'Compatibility' : active.pluginId);

  const siteUrl = siteConfig.url;
  const onHooksIndex = metadata.id === 'hooks/index';
  const onHookPage = isIndividualHookPage(metadata.id);
  const onRestApiIndex = metadata.id === 'rest-api/index';
  const onRestApiErrors = metadata.id === 'rest-api/errors';
  const onRestApiPage = isIndividualRestApiPage(metadata.id);
  const restApiResource =
    typeof (frontMatter as {rest_api_resource?: unknown}).rest_api_resource === 'string'
      ? (frontMatter as {rest_api_resource: string}).rest_api_resource.trim()
      : '';
  const crumbs: Crumb[] = [
    {name: 'Home', item: absolute(siteUrl, '/')},
    {name: sectionLabel, item: absolute(siteUrl, `/${route}/`)},
  ];

  if (onHooksIndex || onHookPage) {
    crumbs.push({name: 'Using PHP hooks', item: absolute(siteUrl, `/${route}/hooks/`)});
  }
  if (onRestApiIndex || onRestApiErrors || onRestApiPage) {
    crumbs.push({name: 'REST API', item: absolute(siteUrl, `/${route}/rest-api/`)});
  }
  if (onRestApiErrors) {
    crumbs.push({name: 'Errors', item: absolute(siteUrl, `/${route}/rest-api/errors/`)});
  }
  if (onRestApiPage && restApiResource) {
    crumbs.push({name: restApiResource, item: absolute(siteUrl, `/${route}/rest-api/`)});
  }
  if (onHookPage || onRestApiPage) {
    crumbs.push({name: metadata.title, item: absolute(siteUrl, metadata.permalink)});
  } else if (metadata.id === 'changelog') {
    crumbs.push({name: 'Changelog', item: absolute(siteUrl, `/${route}/changelog/`)});
  } else if (!onHooksIndex && !onRestApiIndex && !onRestApiErrors && metadata.id !== 'index') {
    crumbs.push({name: metadata.title, item: absolute(siteUrl, metadata.permalink)});
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Head>
  );
}
