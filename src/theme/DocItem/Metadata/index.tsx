import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

/**
 * Individual hook and REST endpoint pages are noindex. The plugin hub, Using
 * PHP hooks, REST API overview, REST API errors, and the changelog stay indexable.
 */
function isNoindexDocPage(docId: string): boolean {
  if (docId.startsWith('hooks/') && docId !== 'hooks/index') {
    return true;
  }
  if (docId.startsWith('rest-api/') && docId !== 'rest-api/index' && docId !== 'rest-api/errors') {
    return true;
  }
  return false;
}

export default function DocItemMetadata(): ReactNode {
  const {metadata, frontMatter, assets} = useDoc();
  return (
    <>
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
      {isNoindexDocPage(metadata.id) ? (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      ) : null}
    </>
  );
}
