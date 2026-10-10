import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';

const CRUMB_NAME = 'Changelog format';
const PAGE_PATH = '/changelog-format/';

/**
 * Visible breadcrumb and BreadcrumbList for the shared changelog-format page.
 * Docs pages get theirs from the swizzled DocBreadcrumbs component.
 */
export default function ChangelogFormatBreadcrumb(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const siteUrl = siteConfig.url.replace(/\/+$/, '');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: CRUMB_NAME,
        item: `${siteUrl}${PAGE_PATH}`,
      },
    ],
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <nav className="changelog-format-breadcrumbs" aria-label="Breadcrumbs">
        <ul className="breadcrumbs">
          <HomeBreadcrumbItem />
          <li className="breadcrumbs__item breadcrumbs__item--active">
            <span className="breadcrumbs__link">{CRUMB_NAME}</span>
          </li>
        </ul>
      </nav>
    </>
  );
}
