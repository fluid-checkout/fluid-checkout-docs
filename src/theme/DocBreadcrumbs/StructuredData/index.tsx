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

/**
 * BreadcrumbList for a docs page. Sidebar crumbs stay as they are.
 * This replaces the one-item list the theme emits.
 *
 * - plugin hub: Home > plugin
 * - All hooks: Home > plugin > All hooks
 * - hook page: Home > plugin > All hooks > hook
 * - changelog: Home > plugin > Changelog
 */
export default function DocBreadcrumbsStructuredData(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const active = useActivePlugin();
  const {metadata} = useDoc();
  if (!active) {
    return null;
  }

  const plugin = (catalog.plugins as CatalogPlugin[]).find((entry) => entry.id === active.pluginId);
  const route = (plugin?.routeBasePath || active.pluginData.path || '').replace(/^\/+|\/+$/g, '');
  if (!route) {
    return null;
  }

  const siteUrl = siteConfig.url;
  const onHooksIndex = metadata.id === 'hooks/index';
  const onHookPage = isIndividualHookPage(metadata.id);
  const crumbs: Crumb[] = [
    {name: 'Home', item: absolute(siteUrl, '/')},
    {name: plugin?.label || active.pluginId, item: absolute(siteUrl, `/${route}/`)},
  ];

  if (onHooksIndex || onHookPage) {
    crumbs.push({name: 'All hooks', item: absolute(siteUrl, `/${route}/hooks/`)});
  }
  if (onHookPage) {
    crumbs.push({name: metadata.title, item: absolute(siteUrl, metadata.permalink)});
  } else if (metadata.id === 'changelog') {
    crumbs.push({name: 'Changelog', item: absolute(siteUrl, `/${route}/changelog/`)});
  } else if (!onHooksIndex && metadata.id !== 'index') {
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
