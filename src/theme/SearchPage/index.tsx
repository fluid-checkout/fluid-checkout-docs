import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import SearchPage from '@theme-original/SearchPage';

export default function SearchPageNoindex(): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <SearchPage />
    </>
  );
}
