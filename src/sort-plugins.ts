type OrderedPlugin = {
  order?: number;
};

/** Lower `order` comes first. Plugins without `order` stay after the numbered ones, in catalog order. */
export function sortPlugins<T extends OrderedPlugin>(plugins: readonly T[]): T[] {
  return [...plugins].sort((a, b) => {
    const aOrder = a.order ?? Number.POSITIVE_INFINITY;
    const bOrder = b.order ?? Number.POSITIVE_INFINITY;
    return aOrder - bOrder;
  });
}
