import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
  icon?: string;
};

const pluginCards = catalog.plugins as PluginCard[];

function PluginIcon({src, name}: {src: string; name: string}): ReactNode {
  const iconSrc = useBaseUrl(src);
  return (
    <img className="plugin-card__icon" src={iconSrc} alt={name} width={56} height={56} />
  );
}

function PluginList(): ReactNode {
  return (
    <div className="plugin-grid">
      {pluginCards.map((plugin) => {
        const available = plugin.status === 'available' && plugin.routeBasePath;
        return (
          <article key={plugin.id} className="plugin-card">
            <div className="plugin-card__header">
              {plugin.icon ? <PluginIcon src={plugin.icon} name={plugin.label} /> : null}
              <div className="plugin-card__intro">
                <span
                  className={
                    available
                      ? 'plugin-card__status plugin-card__status--available'
                      : 'plugin-card__status plugin-card__status--soon'
                  }>
                  {available ? 'Available' : 'Coming soon'}
                </span>
                <Heading as="h2">{plugin.label}</Heading>
              </div>
            </div>
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
