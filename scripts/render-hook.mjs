/**
 * Render one hook reference page and the shared index sections.
 * Pages are MDX, so `{` outside code spans is escaped.
 */

const CALLEE = {
  action: 'do_action',
  filter: 'apply_filters',
  action_reference: 'do_action_ref_array',
  filter_reference: 'apply_filters_ref_array',
};

const TYPE_LABEL = {
  action: 'Action',
  filter: 'Filter',
  action_reference: 'Action',
  filter_reference: 'Filter',
};

/**
 * @param {string} markdown
 * @returns {string}
 */
export function escapeMdx(markdown) {
  const parts = String(markdown).split(/(```[\s\S]*?```|`[^`\n]*`)/g);
  return parts
    .map((part) => {
      if (part.startsWith('`')) {
        return part;
      }
      return part.replace(/[{}]/g, (char) => (char === '{' ? "{'{'}" : "{'}'}"));
    })
    .join('');
}

/**
 * @param {object} hook
 * @param {string} normalizedName
 * @returns {string}
 */
export function buildSignature(hook, normalizedName) {
  const params = paramTags(hook);
  const count = Number.isInteger(hook.args) ? hook.args : params.length;
  const argNames = [];

  for (let index = 0; index < count; index += 1) {
    const variable = params[index]?.variable;
    if (typeof variable === 'string' && variable.trim()) {
      const name = variable.trim();
      argNames.push(name.startsWith('$') ? name : `$${name}`);
    } else {
      argNames.push(`$arg${index + 1}`);
    }
  }

  const type = hook.type || 'filter';
  const callee = CALLEE[type] || 'apply_filters';
  const quotedName = `'${normalizedName.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

  if (type === 'action_reference' || type === 'filter_reference') {
    return `${callee}( ${quotedName}, array( ${argNames.join(', ')} ) );`;
  }

  return `${callee}( ${[quotedName, ...argNames].join(', ')} );`;
}

/**
 * Git ref for a source link. A recorded commit SHA outlives a branch name.
 * Order: hook.sourceCommit (from the JSON document), repository.commit, repository.branch, then main.
 *
 * @param {object} hook
 * @param {{commit?: string, branch?: string} | null | undefined} repository
 * @returns {string}
 */
export function sourceRef(hook, repository) {
  const commit = firstCommit(hook?.sourceCommit, repository?.commit);
  if (commit) {
    return commit;
  }
  const branch = typeof repository?.branch === 'string' ? repository.branch.trim() : '';
  return branch || 'main';
}

/**
 * @param {object} hook
 * @param {{repository?: {url?: string, branch?: string, commit?: string} | null}} plugin
 * @returns {{label: string, url: string | null}}
 */
export function sourceLocation(hook, plugin) {
  let file = typeof hook.file === 'string' ? hook.file : '';
  let line = integerOrNull(hook.line);

  const inline = file.match(/^(.*?):(\d+)$/);
  if (inline && line == null) {
    file = inline[1];
    line = Number(inline[2]);
  }

  const endLine = integerOrNull(hook.end_line);
  let label = file || 'Unknown file';
  if (line != null && endLine != null && endLine !== line) {
    label = `${file}:${line}-${endLine}`;
  } else if (line != null) {
    label = `${file}:${line}`;
  }

  const repository = plugin.repository;
  if (!repository?.url || !file) {
    return {label, url: null};
  }

  const base = String(repository.url).replace(/\/+$/, '');
  const hash = line != null ? `#L${line}` : '';
  return {
    label,
    url: `${base}/blob/${sourceRef(hook, repository)}/${file}${hash}`,
  };
}

/**
 * @param {...unknown} values
 * @returns {string}
 */
function firstCommit(...values) {
  for (const value of values) {
    if (typeof value === 'string' && /^[0-9a-f]{7,40}$/i.test(value.trim())) {
      return value.trim();
    }
  }
  return '';
}

/**
 * @param {object} hook
 * @param {object} options
 * @param {string} options.normalizedName
 * @param {string} options.slug
 * @param {{repository?: {url?: string, branch?: string} | null}} options.plugin
 * @param {string | null | undefined} options.exampleMarkdown Example body. Front matter is already removed.
 * @param {{name: string, slug: string}[] | undefined} options.relatedExampleLinks
 * @returns {string}
 */
export function renderHookPage(hook, options) {
  const {normalizedName, plugin} = options;
  const exampleMarkdown = typeof options.exampleMarkdown === 'string' ? options.exampleMarkdown.trim() : '';
  const relatedExampleLinks = Array.isArray(options.relatedExampleLinks) ? options.relatedExampleLinks : [];
  const summary = oneLine(hook.doc?.description || '');
  const longDescription = formatLongDescription(hook.doc);
  const typeLabel = TYPE_LABEL[hook.type] || 'Hook';
  const signature = buildSignature(hook, normalizedName);
  const source = sourceLocation(hook, plugin);
  const params = paramTags(hook);
  const sinceTags = tagsNamed(hook, 'since');
  const deprecated = tagsNamed(hook, 'deprecated');

  const lines = [
    '---',
    `title: ${yamlString(normalizedName)}`,
    `sidebar_label: ${yamlString(normalizedName)}`,
    `description: ${yamlString(summary || `${typeLabel} ${normalizedName}`)}`,
    '---',
    '',
    '{/* Generated by scripts/generate-hooks.mjs. Do not edit. */}',
    '',
    `**Type:** ${typeLabel}`,
    '',
  ];

  if (Array.isArray(hook.aliases) && hook.aliases.length > 0) {
    const aliases = hook.aliases
      .map((alias) => String(alias).trim())
      .filter((alias) => alias && alias !== normalizedName)
      .map((alias) => `\`${alias}\``);
    if (aliases.length > 0) {
      lines.push(`**Aliases:** ${aliases.join(', ')}`, '');
    }
  }

  if (deprecated.length > 0) {
    const detail = deprecated
      .map((tag) => oneLine(tag.content || ''))
      .filter(Boolean)
      .join(' ');
    lines.push(':::warning Deprecated', '', escapeMdx(detail || 'This hook is deprecated.'), '', ':::', '');
  }

  if (summary) {
    lines.push(escapeMdx(summary), '');
  }

  if (longDescription && longDescription !== summary) {
    lines.push(escapeMdx(longDescription), '');
  }

  lines.push('## Signature', '', '```php', signature, '```', '', '## Parameters', '');

  if (params.length === 0 && !(hook.args > 0)) {
    lines.push('This hook does not pass any parameters.', '');
  } else {
    lines.push('| Name | Type | Description |', '| --- | --- | --- |');
    const rowCount = Math.max(params.length, Number(hook.args) || 0);
    for (let index = 0; index < rowCount; index += 1) {
      const param = params[index];
      const variable = param?.variable
        ? param.variable.startsWith('$')
          ? param.variable
          : `$${param.variable}`
        : `$arg${index + 1}`;
      const types = Array.isArray(param?.types) && param.types.length > 0 ? param.types : ['mixed'];
      const typeCell = types.map((type) => `\`${escapePipes(type)}\``).join(' \\| ');
      const description = escapePipes(oneLine(param?.content || ''));
      lines.push(`| \`${variable}\` | ${typeCell} | ${escapeMdx(description)} |`);
    }
    lines.push('');
  }

  lines.push('## Since', '');
  if (sinceTags.length === 0) {
    lines.push('Not documented.', '');
  } else {
    for (const tag of sinceTags) {
      const version = oneLine(tag.content || '');
      const note = oneLine(tag.description || '');
      if (version && note) {
        lines.push(`- \`${escapePipes(version)}\` — ${escapeMdx(note)}`);
      } else if (version) {
        lines.push(`- \`${escapePipes(version)}\``);
      }
    }
    lines.push('');
  }

  lines.push('## Source', '');
  if (source.url) {
    lines.push(`[\`${source.label}\`](${source.url})`, '');
  } else {
    lines.push(`\`${source.label}\``, '');
  }

  if (exampleMarkdown || relatedExampleLinks.length > 0) {
    lines.push('## Examples', '');
    if (exampleMarkdown) {
      lines.push(escapeMdx(exampleMarkdown), '');
    }
    for (const link of relatedExampleLinks) {
      lines.push(escapeMdx(`See example on [\`${link.name}\`](${hookPageHref(link.slug, plugin)}).`), '');
    }
  }

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

const HOOKS_INDEX_DESCRIPTION = {
  lite: 'Reference for every Fluid Checkout Lite action and filter, including the signature, parameters, and source file.',
  pro: 'Reference for every Fluid Checkout PRO action and filter, including Address Book and Google Address Autocomplete hooks.',
  'eu-vat': 'Reference for every EU-VAT Assistant filter, including the signature, parameters, and source file.',
};

/**
 * Browser title for an All hooks page. The visible heading stays "All hooks".
 *
 * @param {string} pluginLabel
 * @returns {string}
 */
export function hooksIndexTitle(pluginLabel) {
  return `${pluginLabel} hooks reference`;
}

/**
 * Meta description for an All hooks page.
 *
 * @param {{id?: string, label?: string} | null | undefined} plugin
 * @returns {string}
 */
export function hooksIndexDescription(plugin) {
  const specific = plugin?.id ? HOOKS_INDEX_DESCRIPTION[plugin.id] : '';
  if (specific) {
    return specific;
  }
  const label = plugin?.label || 'this plugin';
  return `Reference for the actions and filters in ${label}.`;
}

/**
 * @param {{name: string, slug: string, type: string, summary: string}[]} hooks
 * @param {string} pluginLabel
 * @param {string | null | undefined} [introMarkdown] Hand-written intro placed above the hook lists.
 * @param {string | null | undefined} [description] Meta description. Defaults from the plugin label.
 * @param {string | null | undefined} [routeBasePath] Docs route, used for absolute hook links.
 * @returns {string}
 */
export function renderHooksIndex(hooks, pluginLabel, introMarkdown = null, description = null, routeBasePath = null) {
  const actions = hooks.filter((hook) => hook.type === 'action' || hook.type === 'action_reference');
  const filters = hooks.filter((hook) => hook.type !== 'action' && hook.type !== 'action_reference');
  const intro = typeof introMarkdown === 'string' ? introMarkdown.trim() : '';
  const metaDescription = typeof description === 'string' && description.trim()
    ? description.trim()
    : hooksIndexDescription({label: pluginLabel});

  const lines = [
    '---',
    `title: ${yamlString(hooksIndexTitle(pluginLabel))}`,
    'sidebar_label: All hooks',
    `description: ${yamlString(metaDescription)}`,
    '---',
    '',
    '{/* Generated by scripts/generate-hooks.mjs. Do not edit. */}',
    '',
    '# All hooks',
    '',
  ];

  if (intro) {
    lines.push(intro, '');
  }

  lines.push(`Actions and filters in ${pluginLabel}.`, '');

  lines.push(...renderHookList('Actions', actions, routeBasePath));
  lines.push(...renderHookList('Filters', filters, routeBasePath));

  if (hooks.length === 0) {
    lines.push('No hooks are listed yet.', '');
  }

  return `${lines.join('\n').trim()}\n`;
}

/**
 * @param {{name: string, slug: string, type: string, summary: string}[]} hooks
 * @returns {object[]}
 */
export function renderSidebarItems(hooks) {
  const actions = hooks.filter((hook) => hook.type === 'action' || hook.type === 'action_reference');
  const filters = hooks.filter((hook) => hook.type !== 'action' && hook.type !== 'action_reference');

  /** @type {object[]} */
  const items = [
    {
      type: 'doc',
      id: 'hooks/index',
      label: 'All hooks',
    },
  ];

  if (actions.length > 0) {
    items.push({
      type: 'category',
      label: 'Actions',
      items: actions.map(sidebarDoc),
    });
  }

  if (filters.length > 0) {
    items.push({
      type: 'category',
      label: 'Filters',
      items: filters.map(sidebarDoc),
    });
  }

  return items;
}

/**
 * One list per heading, matching the live docs list at
 * fluidcheckout.com/docs/fclite-filter-and-action-hooks/: the hook name is a
 * code link, and the short description follows it. An empty description is
 * omitted.
 *
 * @param {string} heading
 * @param {{name: string, slug: string, summary: string}[]} hooks
 * @param {string | null | undefined} routeBasePath
 * @returns {string[]}
 */
function renderHookList(heading, hooks, routeBasePath) {
  if (hooks.length === 0) {
    return [];
  }

  const lines = [`## ${heading}`, '', '<div className="hook-list">', ''];
  for (const hook of hooks) {
    const summary = escapeMdx(oneLine(hook.summary || ''));
    const link = `[\`${hook.name}\`](${hookPageHref(hook.slug, {routeBasePath})})`;
    lines.push(summary ? `- ${link} ${summary}` : `- ${link}`);
  }
  lines.push('', '</div>', '');
  return lines;
}

/**
 * Absolute slash URL when the plugin route is known. A relative `./slug` link
 * is resolved from the current page, and with trailingSlash that page is a
 * directory, so the relative form points at a child path.
 *
 * @param {string} slug
 * @param {{routeBasePath?: string} | null | undefined} plugin
 * @returns {string}
 */
export function hookPageHref(slug, plugin) {
  const route = typeof plugin?.routeBasePath === 'string' ? plugin.routeBasePath.trim() : '';
  if (!route) {
    return `./${slug}`;
  }
  return `/${route.replace(/^\/+|\/+$/g, '')}/hooks/${slug}/`;
}

/**
 * @param {{slug: string, name: string}} hook
 */
function sidebarDoc(hook) {
  return {
    type: 'doc',
    id: `hooks/${hook.slug}`,
    label: hook.name,
  };
}

/**
 * @param {object} hook
 */
function paramTags(hook) {
  return tagsNamed(hook, 'param');
}

/**
 * @param {object} hook
 * @param {string} name
 */
function tagsNamed(hook, name) {
  const tags = hook.doc?.tags;
  if (!Array.isArray(tags)) {
    return [];
  }
  return tags.filter((tag) => tag && tag.name === name);
}

/**
 * @param {unknown} value
 * @returns {number | null}
 */
function integerOrNull(value) {
  if (typeof value === 'number' && Number.isInteger(value)) {
    return value;
  }
  if (typeof value === 'string' && /^[0-9]+$/.test(value)) {
    return Number(value);
  }
  return null;
}

/**
 * Docblock long descriptions are Markdown. Some exports keep a real list in
 * `long_description_html` while `long_description` has joined the items onto
 * one line (`- name - name`). Prefer the HTML list, and otherwise split a
 * collapsed Markdown list so each item is on its own line.
 *
 * @param {object | null | undefined} doc
 * @returns {string}
 */
function formatLongDescription(doc) {
  const text = String(doc?.long_description || '').trim();
  const html = String(doc?.long_description_html || '').trim();
  if (/<(ul|ol)\b/i.test(html)) {
    const markdown = htmlDescriptionToMarkdown(html);
    if (markdown) {
      return markdown;
    }
  }
  return expandCollapsedMarkdownLists(text);
}

/**
 * @param {string} html
 * @returns {string}
 */
function htmlDescriptionToMarkdown(html) {
  const blocks = [];
  const re = /<(p|ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = re.exec(html))) {
    const tag = match[1].toLowerCase();
    if (tag === 'p') {
      const paragraph = inlineHtmlToMarkdown(match[2]);
      if (paragraph) {
        blocks.push(paragraph);
      }
      continue;
    }
    const items = [...match[2].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((item) => inlineHtmlToMarkdown(item[1]))
      .filter(Boolean);
    if (items.length === 0) {
      continue;
    }
    blocks.push(
      items
        .map((item, index) => (tag === 'ol' ? `${index + 1}. ${item}` : `- ${item}`))
        .join('\n'),
    );
  }
  return blocks.join('\n\n').trim();
}

/**
 * @param {string} html
 * @returns {string}
 */
function inlineHtmlToMarkdown(html) {
  let value = String(html);
  value = value.replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => `\`${decodeHtmlEntities(code)}\``);
  value = value.replace(/<(em|strong)>([\s\S]*?)<\/\1>/gi, (_, tag, inner) => {
    const marker = tag.toLowerCase() === 'strong' ? '**' : '*';
    return `${marker}${inlineHtmlToMarkdown(inner)}${marker}`;
  });
  value = value.replace(/<br\s*\/?>/gi, '\n');
  value = value.replace(/<[^>]+>/g, '');
  return decodeHtmlEntities(value).replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim();
}

/**
 * @param {string} value
 * @returns {string}
 */
function decodeHtmlEntities(value) {
  return String(value)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * A collapsed docblock list is one Markdown item line with further ` - `
 * separators. Two code items, or three or more items of any kind, are split.
 * A single prose dash inside one item is left alone.
 *
 * @param {string} markdown
 * @returns {string}
 */
function expandCollapsedMarkdownLists(markdown) {
  return String(markdown)
    .split('\n')
    .flatMap((line) => {
      const marker = line.match(/^\s*([-*+]|\d+[.)])\s+/);
      if (!marker) {
        return [line];
      }
      const pieces = line
        .slice(marker[0].length)
        .split(/\s+-\s+/)
        .map((piece) => piece.trim())
        .filter(Boolean);
      const codeItems = pieces.every((piece) => piece.startsWith('`'));
      if (pieces.length < 2 || (pieces.length < 3 && !codeItems)) {
        return [line];
      }
      const numbered = /^\d+[.)]$/.test(marker[1]);
      const bullet = marker[1] === '*' || marker[1] === '+' ? marker[1] : '-';
      return pieces.map((piece, index) => `${numbered ? `${index + 1}. ` : `${bullet} `}${piece}`);
    })
    .join('\n');
}

/**
 * @param {string} value
 * @returns {string}
 */
function oneLine(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapePipes(value) {
  return String(value).replace(/\|/g, '\\|');
}

/**
 * @param {string} value
 * @returns {string}
 */
function yamlString(value) {
  return JSON.stringify(oneLine(value));
}
