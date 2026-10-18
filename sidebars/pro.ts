import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './pro.hooks.json';
import restApiItems from './pro.rest-api.json';
import {withChangelogAfterAllHooks} from './with-changelog';

const sidebars: SidebarsConfig = {
  pro: [
    'index',
    {
      type: 'category',
      label: 'REST API',
      items: restApiItems as SidebarsConfig[string],
    },
    {
      type: 'category',
      label: 'Hooks',
      items: withChangelogAfterAllHooks(hookItems) as SidebarsConfig[string],
    },
  ],
};

export default sidebars;
