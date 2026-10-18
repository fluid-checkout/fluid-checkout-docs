import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './pro.hooks.json';
import restApiItems from './pro.rest-api.json';
import {restApiCategoryLabel} from './rest-api-category';
import {changelogSidebarItem} from './with-changelog';

const sidebars: SidebarsConfig = {
  pro: [
    'index',
    {
      type: 'category',
      label: restApiCategoryLabel('pro'),
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
