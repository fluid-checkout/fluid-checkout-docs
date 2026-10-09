import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import catalog from '../../plugins.json';

type PluginCard = {
  id: string;
  label: string;
  description: string;
  status: 'available' | 'coming-soon';
  routeBasePath?: string;
};

const pluginCards = catalog.plugins as PluginCard[];

function PluginList(): ReactNode {
  return (
    <div className="plugin-grid">
      {pluginCards.map((plugin) => {
        const available = plugin.status === 'available' && plugin.routeBasePath;
        return (
          <article key={plugin.id} className="plugin-card">
            <span
              className={
                available
                  ? 'plugin-card__status plugin-card__status--available'
                  : 'plugin-card__status plugin-card__status--soon'
              }>
              {available ? 'Available' : 'Coming soon'}
            </span>
            <Heading as="h2">{plugin.label}</Heading>
            <p>{plugin.description}</p>
            {available ? (
              <Link className="button button--primary" to={`/${plugin.routeBasePath}/`}>
                Read the docs
              </Link>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Developer docs" description={siteConfig.tagline}>
      <header className="hero--fc">
        <div className="container">
          <Heading as="h1">{siteConfig.title}</Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main className="container">
        <PluginList />
      </main>
    </Layout>
  );
}
