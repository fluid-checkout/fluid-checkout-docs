import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './pro.hooks.json';

const sidebars: SidebarsConfig = {
  pro: [
    'index',
    {
      type: 'category',
      label: 'Hooks',
      items: hookItems as SidebarsConfig[string],
    },
  ],
};

export default sidebars;
