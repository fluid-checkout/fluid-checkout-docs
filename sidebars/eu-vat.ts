import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './eu-vat.hooks.json';
import {withChangelogAfterAllHooks} from './with-changelog';

const sidebars: SidebarsConfig = {
  euVat: [
    'index',
    {
      type: 'category',
      label: 'Hooks',
      items: withChangelogAfterAllHooks(hookItems) as SidebarsConfig[string],
    },
  ],
};

export default sidebars;
