import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './pro.hooks.json';
import {withChangelogAfterAllHooks} from './with-changelog';

const sidebars: SidebarsConfig = {
  pro: [
    'index',
    {
      type: 'category',
      label: 'Hooks',
      items: withChangelogAfterAllHooks(hookItems) as SidebarsConfig[string],
    },
  ],
};

export default sidebars;
