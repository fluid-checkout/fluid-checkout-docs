import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

function isIndividualHookPage(docId: string): boolean {
  return docId.startsWith('hooks/') && docId !== 'hooks/index';
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
      {isIndividualHookPage(metadata.id) ? (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      ) : null}
    </>
  );
}
