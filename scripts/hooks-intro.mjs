/**
 * Hand-written hooks index intros live in hooks-intro/<plugin>/index.md.
 * The generator copies the body onto docs/<plugin>/hooks/index.md.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * @param {string} markdown
 * @returns {string}
 */
export function stripFrontMatter(markdown) {
  const text = String(markdown).replace(/^\uFEFF/, '');
  const match = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? text.slice(match[0].length) : text;
}

/**
 * Point relative intro images at @site/ so the generated hooks index can
 * resolve them from docs/<plugin>/hooks/index.md.
 *
 * @param {string} markdown
 * @param {string} introDir Directory of the intro source file.
 * @param {string} siteRoot
 * @returns {string}
 */
export function rewriteIntroImagePaths(markdown, introDir, siteRoot) {
  const parts = String(markdown).split(/(```[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (part.startsWith('```')) {
        return part;
      }
      return part.replace(
        /!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"([^"]*)")?\s*\)/g,
        (full, alt, dest, title) => {
          if (!isLocalRelative(dest)) {
            return full;
          }
          const absolute = path.resolve(introDir, dest);
          const siteRelative = path.relative(siteRoot, absolute).split(path.sep).join('/');
          if (!siteRelative || siteRelative.startsWith('..') || path.isAbsolute(siteRelative)) {
            throw new Error(`Intro image ${dest} is outside the site root.`);
          }
          const url = `@site/${siteRelative}`;
          return title ? `![${alt}](${url} "${title}")` : `![${alt}](${url})`;
        },
      );
    })
    .join('');
}

/**
 * @param {string} dest
 * @returns {boolean}
 */
function isLocalRelative(dest) {
  if (
    dest.startsWith('@site/')
    || dest.startsWith('/')
    || dest.startsWith('#')
    || dest.includes('://')
  ) {
    return false;
  }
  return true;
}

/**
 * Intro markdown for a plugin, or null when hooks-intro/<plugin>/index.md is absent.
 * Front matter is removed. Relative images are rewritten for the generated index.
 *
 * @param {string} pluginId
 * @param {string} baseDir Site root.
 * @returns {string | null}
 */
export function readHooksIntro(pluginId, baseDir) {
  const introFile = path.join(baseDir, 'hooks-intro', pluginId, 'index.md');
  if (!fs.existsSync(introFile)) {
    return null;
  }

  const body = stripFrontMatter(fs.readFileSync(introFile, 'utf8')).trim();
  if (!body) {
    return null;
  }

  return rewriteIntroImagePaths(body, path.dirname(introFile), baseDir).trim();
}

/**
 * Redirects from retired "Getting started" guides to the hooks index.
 * An available plugin gets one when hooks-intro/<id>/index.md exists.
 *
 * @param {{id?: string, status?: string, routeBasePath?: string}[]} plugins
 * @param {string} baseDir
 * @returns {{from: string, to: string}[]}
 */
export function gettingStartedRedirects(plugins, baseDir) {
  if (!Array.isArray(plugins)) {
    return [];
  }

  return plugins.flatMap((plugin) => {
    if (plugin?.status !== 'available' || !plugin.routeBasePath || !plugin.id) {
      return [];
    }
    if (!readHooksIntro(plugin.id, baseDir)) {
      return [];
    }
    return [
      {
        from: `/${plugin.routeBasePath}/guides/getting-started/`,
        to: `/${plugin.routeBasePath}/hooks/`,
      },
    ];
  });
}
