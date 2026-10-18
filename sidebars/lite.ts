import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './lite.hooks.json';
import {changelogSidebarItem} from './with-changelog';

const sidebars: SidebarsConfig = {
  lite: [
    'index',
    {
      type: 'category',
      label: 'Hooks',
      items: hookItems as SidebarsConfig[string],
    },
    changelogSidebarItem,
  ],
};

export default sidebars;
