/**
 * Hand-written hooks index intros live in hooks-intro/<plugin>/index.md.
 * The generator copies the body onto docs/<plugin>/hooks/index.md.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Article linked from the Best practices section on every All hooks page.
 * This is the only copy of the URL.
 */
export const CODE_SNIPPETS_ARTICLE_URL = 'https://fluidcheckout.com/docs/how-to-add-code-snippets/';

const CODE_SNIPPETS_ARTICLE_TOKEN = '{{CODE_SNIPPETS_ARTICLE_URL}}';

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

  const body = applyIntroTokens(stripFrontMatter(fs.readFileSync(introFile, 'utf8')).trim());
  if (!body) {
    return null;
  }

  return rewriteIntroImagePaths(body, path.dirname(introFile), baseDir).trim();
}

/**
 * @param {string} markdown
 * @returns {string}
 */
export function applyIntroTokens(markdown) {
  return String(markdown).replaceAll(CODE_SNIPPETS_ARTICLE_TOKEN, CODE_SNIPPETS_ARTICLE_URL);
}
