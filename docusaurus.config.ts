import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {sortPlugins} from './src/sort-plugins';
import catalog from './plugins.json';

type PluginStatus = 'available' | 'coming-soon';

type RepositoryConfig = {
  url: string;
  branch?: string;
  commit?: string;
};

type PluginEntry = {
  id: string;
  label: string;
  navLabel?: string;
  description: string;
  pluginPrefix?: string;
  hookPrefixes?: string[];
  status: PluginStatus;
  routeBasePath?: string;
  repository?: RepositoryConfig | null;
  order?: number;
  productUrl?: string;
};

const plugins = sortPlugins(catalog.plugins as PluginEntry[]);
const availablePlugins = plugins.filter(
  (plugin): plugin is PluginEntry & {routeBasePath: string} =>
    plugin.status === 'available' && Boolean(plugin.routeBasePath),
);

function envValue(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

const algoliaAppId = envValue('ALGOLIA_APP_ID');
const algoliaApiKey = envValue('ALGOLIA_API_KEY');
const algoliaIndexName = envValue('ALGOLIA_INDEX_NAME');
const useAlgolia = Boolean(algoliaAppId && algoliaApiKey && algoliaIndexName);

const config: Config = {
  title: 'Fluid Checkout Docs',
  tagline: 'Developer documentation for Fluid Checkout plugins',
  favicon: 'img/favicon.png',
  url: 'https://docs.fluidcheckout.com',
  baseUrl: '/',
  // GitHub Pages redirects slashless URLs. Canonicals, the sitemap, and links use the slash form.
  trailingSlash: true,
  organizationName: 'fluid-checkout',
  projectName: 'fluid-checkout-docs',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  future: {
    v4: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        sitemap: {
          // noindex routes are omitted: individual hook pages and /search.
          // Home, plugin hubs, All hooks, and the three changelog pages stay in.
          ignorePatterns: ['/search', '/search/', '/search/**'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    ...availablePlugins.map((plugin) => [
      '@docusaurus/plugin-content-docs',
      {
        id: plugin.id,
        path: `docs/${plugin.id}`,
        routeBasePath: plugin.routeBasePath,
        sidebarPath: `./sidebars/${plugin.id}.ts`,
        exclude: ['**/README.md'],
      },
    ]),
  ],
  themes: useAlgolia
    ? []
    : [
        [
          require.resolve('@easyops-cn/docusaurus-search-local'),
          {
            hashed: true,
            language: ['en'],
            indexDocs: true,
            indexBlog: false,
            indexPages: false,
            docsRouteBasePath: availablePlugins.map((plugin) => plugin.routeBasePath),
            docsDir: availablePlugins.map((plugin) => `docs/${plugin.id}`),
            // The default docs instance is disabled. Point version lookup at a real instance
            // so the search bar can render on pages outside the docs (home, 404, /search).
            docsPluginIdForPreferredVersion: availablePlugins[0]?.id,
          },
        ],
      ],
  themeConfig: {
    image: 'img/social-card.png',
    metadata: [{property: 'og:type', content: 'website'}],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      title: 'Fluid Checkout',
      logo: {
        alt: 'Fluid Checkout',
        src: 'img/logo.png',
      },
      items: [
        ...availablePlugins.map((plugin) => ({
          type: 'doc' as const,
          docId: 'index',
          docsPluginId: plugin.id,
          position: 'left' as const,
          label: plugin.navLabel || plugin.label,
        })),
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Fluid Checkout',
          items: [
            {label: 'Website', href: 'https://fluidcheckout.com/'},
            ...plugins.flatMap((plugin) =>
              plugin.productUrl ? [{label: plugin.label, href: plugin.productUrl}] : [],
            ),
            {label: 'Support', href: 'https://fluidcheckout.com/support/'},
            {label: 'Product docs', href: 'https://fluidcheckout.com/docs/'},
          ],
        },
        {
          title: 'Developer docs',
          items: availablePlugins.map((plugin) => ({
            label: plugin.label,
            to: `/${plugin.routeBasePath}/`,
          })),
        },
      ],
      copyright: `© ${new Date().getFullYear()} Fluid Checkout OÜ. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php'],
    },
    ...(useAlgolia
      ? {
          algolia: {
            appId: algoliaAppId!,
            apiKey: algoliaApiKey!,
            indexName: algoliaIndexName!,
            contextualSearch: true,
          },
        }
      : {}),
  } satisfies Preset.ThemeConfig,
};

export default config;
