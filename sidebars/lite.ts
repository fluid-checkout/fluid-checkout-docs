import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './lite.hooks.json';

const sidebars: SidebarsConfig = {
  lite: [
    'index',
    {
      type: 'category',
      label: 'Hooks',
      items: hookItems as SidebarsConfig[string],
    },
  ],
};

export default sidebars;
