/**
 * REST API sidebar category label from plugins.json `restApiStatus`.
 */

import catalog from '../plugins.json';

type CatalogPlugin = {
  id: string;
  restApiStatus?: string;
};

/**
 * @param pluginId
 * @returns Category label, with "(upcoming)" when restApiStatus is upcoming.
 */
export function restApiCategoryLabel(pluginId: string): string {
  const plugin = (catalog.plugins as CatalogPlugin[]).find((entry) => entry.id === pluginId);
  if (plugin?.restApiStatus === 'upcoming') {
    return 'REST API (upcoming)';
  }
  return 'REST API';
}
