/**
 * Hand-written hook examples live in examples/<plugin>/<hook-slug>.md.
 * Generation reads them. It renames a file, or rewrites a related_hooks entry,
 * only when that slug ends in -N and the suffix is no longer a published page.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * @param {string} source
 * @returns {{relatedHooks: string[], body: string}}
 */
export function parseExampleMarkdown(source) {
  const text = String(source).replace(/^\uFEFF/, '');
  const match = text.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!match) {
    return {relatedHooks: [], body: text.trim()};
  }

  return {
    relatedHooks: parseRelatedHooks(match[1]),
    body: text.slice(match[0].length).trim(),
  };
}

/**
 * @param {string} examplesDir
 * @param {{slug: string}[]} prepared
 * @param {string} pluginId
 * @returns {{
 *   loaded: Map<string, {relatedHooks: string[], body: string, fileName: string}>,
 *   unused: string[],
 * }}
 */
export function loadHookExamples(examplesDir, prepared, pluginId) {
  /** @type {Map<string, {relatedHooks: string[], body: string, fileName: string}>} */
  const loaded = new Map();
  if (!fs.existsSync(examplesDir)) {
    return {loaded, unused: []};
  }

  const used = new Set();
  for (const entry of prepared) {
    const fileName = `${entry.slug}.md`;
    const filePath = path.join(examplesDir, fileName);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      continue;
    }

    let parsed;
    try {
      parsed = parseExampleMarkdown(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`examples/${pluginId}/${fileName}: ${message}`);
    }

    loaded.set(entry.slug, {...parsed, fileName});
    used.add(fileName);
  }

  const unused = fs.readdirSync(examplesDir, {withFileTypes: true})
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !used.has(entry.name))
    .map((entry) => entry.name)
    .sort();

  return {loaded, unused};
}

/**
 * @param {{id?: string}} plugin
 * @param {{name: string, slug: string}[]} prepared
 * @param {Map<string, {relatedHooks: string[], body: string, fileName: string}>} loaded
 * @returns {Map<string, {name: string, body: string | null, seeAlso: {name: string, slug: string}[]}>}
 */
export function resolveExampleSections(plugin, prepared, loaded) {
  const byName = new Map(prepared.map((entry) => [entry.name, entry]));
  const bySlug = new Map(prepared.map((entry) => [entry.slug, entry]));
  const publishedSlugs = new Set(prepared.map((entry) => entry.slug));
  /** @type {Map<string, {name: string, slug: string}[]>} */
  const seeAlso = new Map(prepared.map((entry) => [entry.slug, []]));

  for (const entry of prepared) {
    const example = loaded.get(entry.slug);
    if (!example) {
      continue;
    }

    const seen = new Set();
    for (const related of example.relatedHooks) {
      const key = String(related).trim();
      if (!key || seen.has(key)) {
        continue;
      }
      seen.add(key);

      const mapped = mapUnpublishedSuffix(key, publishedSlugs);
      const target = byName.get(key) || bySlug.get(key) || byName.get(mapped) || bySlug.get(mapped);
      if (!target) {
        throw new Error(
          `examples/${plugin.id}/${example.fileName} related_hooks entry "${key}" does not match a published hook for ${plugin.id}.`,
        );
      }
      if (target.slug === entry.slug) {
        continue;
      }

      const links = seeAlso.get(target.slug);
      if (!links.some((link) => link.slug === entry.slug)) {
        links.push({name: entry.name, slug: entry.slug});
      }
    }
  }

  /** @type {Map<string, {name: string, body: string | null, seeAlso: {name: string, slug: string}[]}>} */
  const sections = new Map();
  for (const entry of prepared) {
    const example = loaded.get(entry.slug);
    const body = example && example.body.trim() ? example.body.trim() : null;
    sections.set(entry.slug, {
      name: entry.name,
      body,
      seeAlso: seeAlso.get(entry.slug) || [],
    });
  }
  return sections;
}

/**
 * A `-N` slug that is not itself published points at the unsuffixed hook
 * when that hook is published. A suffix that is still a page (two different
 * names that share a slug) is left alone.
 *
 * @param {string} value
 * @param {Set<string>} publishedSlugs
 * @returns {string}
 */
export function mapUnpublishedSuffix(value, publishedSlugs) {
  const match = String(value).match(/^(.*)-(\d+)$/);
  if (!match || publishedSlugs.has(value) || !publishedSlugs.has(match[1])) {
    return value;
  }
  return match[1];
}

/**
 * Move example files named `<slug>-N.md` onto `<slug>.md` when `<slug>-N` is
 * not a published page and `<slug>` is. Rewrite related_hooks entries the same way.
 *
 * @param {string} examplesDir
 * @param {{slug: string}[]} prepared
 * @returns {{from: string, to: string}[]}
 */
export function relocateUnpublishedSuffixExamples(examplesDir, prepared) {
  /** @type {{from: string, to: string}[]} */
  const moved = [];
  if (!examplesDir || !fs.existsSync(examplesDir)) {
    return moved;
  }

  const published = new Set(prepared.map((entry) => entry.slug));
  const names = fs.readdirSync(examplesDir).filter((name) => name.endsWith('.md'));

  for (const fileName of names) {
    const match = fileName.match(/^(.*)-(\d+)\.md$/);
    if (!match) {
      continue;
    }
    const suffixedSlug = fileName.slice(0, -'.md'.length);
    const baseSlug = match[1];
    if (published.has(suffixedSlug) || !published.has(baseSlug)) {
      continue;
    }

    const destinationName = `${baseSlug}.md`;
    const destinationPath = path.join(examplesDir, destinationName);
    if (names.includes(destinationName) || fs.existsSync(destinationPath)) {
      throw new Error(
        `examples file ${fileName} uses an unpublished -N slug, but ${destinationName} already exists. Keep the example on ${destinationName}.`,
      );
    }

    const fromPath = path.join(examplesDir, fileName);
    const rewritten = rewriteUnpublishedSuffixReferences(fs.readFileSync(fromPath, 'utf8'), published);
    fs.writeFileSync(destinationPath, rewritten.endsWith('\n') ? rewritten : `${rewritten}\n`);
    fs.unlinkSync(fromPath);
    names.push(destinationName);
    moved.push({from: fileName, to: destinationName});
  }

  for (const fileName of fs.readdirSync(examplesDir).filter((name) => name.endsWith('.md'))) {
    const filePath = path.join(examplesDir, fileName);
    const original = fs.readFileSync(filePath, 'utf8');
    const rewritten = rewriteUnpublishedSuffixReferences(original, published);
    if (rewritten === original) {
      continue;
    }
    fs.writeFileSync(filePath, rewritten);
    moved.push({from: fileName, to: fileName});
  }

  return moved;
}

/**
 * @param {string} markdown
 * @param {Set<string>} publishedSlugs
 * @returns {string}
 */
export function rewriteUnpublishedSuffixReferences(markdown, publishedSlugs) {
  const source = String(markdown);
  const match = source.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!match) {
    return source;
  }

  const front = rewriteRelatedHooksFrontMatter(match[1], publishedSlugs);
  if (front === match[1]) {
    return source;
  }

  const start = match.index + match[0].indexOf(match[1]);
  return source.slice(0, start) + front + source.slice(start + match[1].length);
}

/**
 * @param {string} front
 * @param {Set<string>} publishedSlugs
 * @returns {string}
 */
function rewriteRelatedHooksFrontMatter(front, publishedSlugs) {
  const entries = parseRelatedHooks(front);
  let next = front;
  for (const entry of entries) {
    const mapped = mapUnpublishedSuffix(entry, publishedSlugs);
    if (mapped === entry) {
      continue;
    }
    const pattern = new RegExp(`(^|[\\s\\[,])${escapeRegExp(entry)}(?=$|[\\s,\\]])`, 'm');
    if (!pattern.test(next)) {
      throw new Error(`Could not rewrite related_hooks entry "${entry}".`);
    }
    next = next.replace(pattern, `$1${mapped}`);
  }
  return next;
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * @param {string} frontMatter
 * @returns {string[]}
 */
function parseRelatedHooks(frontMatter) {
  const lines = frontMatter.split(/\r?\n/);
  const index = lines.findIndex((line) => /^related_hooks\s*:/.test(line));
  if (index === -1) {
    return [];
  }

  const rest = lines[index].replace(/^related_hooks\s*:\s*/, '').trim();
  if (rest.startsWith('[')) {
    if (!rest.endsWith(']')) {
      throw new Error('related_hooks flow list must be on one line, or use a YAML list.');
    }
    return parseFlowList(rest);
  }
  if (rest.startsWith('{')) {
    throw new Error('related_hooks must be a list of hook names.');
  }
  if (rest) {
    const single = unquote(rest);
    return single ? [single] : [];
  }

  /** @type {string[]} */
  const items = [];
  for (let lineIndex = index + 1; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (line.trim() === '' || /^\s*#/.test(line)) {
      continue;
    }

    const item = line.match(/^\s*-\s+(.*)$/);
    if (item) {
      const value = unquote(item[1]);
      if (value) {
        items.push(value);
      }
      continue;
    }

    if (/^\S/.test(line)) {
      break;
    }

    throw new Error('related_hooks list items must use "- hook_name".');
  }

  return items;
}

/**
 * @param {string} value
 * @returns {string[]}
 */
function parseFlowList(value) {
  const inner = value.slice(1, -1);
  /** @type {string[]} */
  const items = [];
  let current = '';
  let quote = '';

  for (let index = 0; index < inner.length; index += 1) {
    const char = inner[index];
    if (quote) {
      if (char === quote) {
        quote = '';
      } else {
        current += char;
      }
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === ',') {
      const item = current.trim();
      if (item) {
        items.push(item);
      }
      current = '';
      continue;
    }
    current += char;
  }

  if (quote) {
    throw new Error('related_hooks flow list has an unclosed quote.');
  }

  const last = current.trim();
  if (last) {
    items.push(last);
  }
  return items;
}

/**
 * @param {string} value
 * @returns {string}
 */
function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    const quote = trimmed[0];
    if ((quote === '"' || quote === "'") && trimmed.endsWith(quote)) {
      return trimmed.slice(1, -1).trim();
    }
  }
  return trimmed;
}
