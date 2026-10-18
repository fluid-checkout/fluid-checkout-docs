/**
 * Hand-written REST API index intros live in rest-api-intro/<plugin>/index.md.
 * The generator copies the body onto docs/<plugin>/rest-api/index.md.
 */

import fs from 'node:fs';
import path from 'node:path';
import {rewriteIntroImagePaths, stripFrontMatter} from './hooks-intro.mjs';

/**
 * Intro markdown for a plugin, or null when rest-api-intro/<plugin>/index.md is absent.
 *
 * @param {string} pluginId
 * @param {string} baseDir Site root.
 * @returns {string | null}
 */
export function readRestApiIntro(pluginId, baseDir) {
  const introFile = path.join(baseDir, 'rest-api-intro', pluginId, 'index.md');
  if (!fs.existsSync(introFile)) {
    return null;
  }

  const body = stripFrontMatter(fs.readFileSync(introFile, 'utf8')).trim();
  if (!body) {
    return null;
  }

  return rewriteIntroImagePaths(body, path.dirname(introFile), baseDir).trim();
}
