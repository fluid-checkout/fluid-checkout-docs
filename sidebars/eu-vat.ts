import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import hookItems from './eu-vat.hooks.json';

const sidebars: SidebarsConfig = {
  euVat: [
    'index',
    {
      type: 'category',
      label: 'Hooks',
      items: hookItems as SidebarsConfig[string],
    },
  ],
};

export default sidebars;
