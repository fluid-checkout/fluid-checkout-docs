import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './lite.hooks.json';
import restApiItems from './lite.rest-api.json';
import {changelogSidebarItem} from './with-changelog';

const sidebars: SidebarsConfig = {
  lite: [
    'index',
    {
      type: 'category',
      label: 'REST API',
      items: restApiItems as SidebarsConfig[string],
    },
    {
      type: 'category',
      label: 'Hooks',
      items: hookItems as SidebarsConfig[string],
    },
    changelogSidebarItem,
  ],
};

export default sidebars;
