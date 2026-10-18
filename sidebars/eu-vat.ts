import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './eu-vat.hooks.json';
import {changelogSidebarItem} from './with-changelog';

const sidebars: SidebarsConfig = {
  euVat: [
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
