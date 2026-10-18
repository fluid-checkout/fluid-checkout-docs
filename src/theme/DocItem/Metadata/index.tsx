import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

/**
 * Individual hook pages are noindex. Individual REST endpoint pages are
 * noindex. When `rest_api_upcoming` is set, every REST API page (including
 * overview and errors) is noindex so unfinished docs stay off search.
 * The plugin hub, Using PHP hooks, stable REST overview/errors, and the
 * changelog stay indexable.
 */
function isNoindexDocPage(docId: string, frontMatter: {[key: string]: unknown}): boolean {
  if (docId.startsWith('hooks/') && docId !== 'hooks/index') {
    return true;
  }
  if (docId.startsWith('rest-api/')) {
    if (frontMatter.rest_api_upcoming === true) {
      return true;
    }
    return docId !== 'rest-api/index' && docId !== 'rest-api/errors';
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
      {isNoindexDocPage(metadata.id, frontMatter as {[key: string]: unknown}) ? (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      ) : null}
    </>
  );
}
