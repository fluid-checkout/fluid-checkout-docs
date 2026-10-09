/**
 * Turn wp-hooks/generator hook names into readable docs names.
 *
 * The generator pretty-prints the PHP expression passed to apply_filters()
 * or do_action(). A whole expression wrapped in quotes loses its outer
 * quotes, so this also accepts forms such as:
 *   fc_vat_' . $current_section . '_settings
 */

const PLUGIN_PREFIX_PATTERN =
  /(?:self|parent|static|\$this|[A-Za-z_][A-Za-z0-9_\\]*)::\$plugin_prefix\b|\$this->plugin_prefix\b/g;

/**
 * @param {string} raw
 * @param {string} pluginPrefix
 * @returns {string}
 */
export function normalizeHookName(raw, pluginPrefix = '') {
  let input = String(raw ?? '').trim();
  if (!input) {
    return input;
  }

  const prefix = String(pluginPrefix ?? '').replace(/['"\\]/g, '');
  if (prefix) {
    input = input.replace(PLUGIN_PREFIX_PATTERN, `'${prefix}'`);
  }

  if (!/['"]|\.(?!\d)|::|->/.test(input)) {
    return replaceBraceVars(input);
  }

  input = repairStrippedOuterQuotes(input);

  const tokens = tokenizePhpConcat(input);
  if (tokens.length === 0) {
    return replaceBraceVars(input);
  }

  let name = '';
  for (const token of tokens) {
    if (token.type === 'string') {
      name += replaceBraceVars(token.value);
    } else if (token.type === 'var' && token.name) {
      name += `{${token.name}}`;
    }
  }

  return name || replaceBraceVars(input);
}

/**
 * URL slug for a normalized hook name. Braces are removed so the path is safe.
 * Underscores are kept so the slug stays close to the PHP name.
 *
 * @param {string} name
 * @returns {string}
 */
export function slugifyHookName(name) {
  const slug = String(name)
    .toLowerCase()
    .replace(/[{}]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '');

  return slug || 'hook';
}

/**
 * @param {string} value
 * @returns {string}
 */
function replaceBraceVars(value) {
  return value.replace(/\{\$([A-Za-z_][A-Za-z0-9_]*)\}/g, '{$1}');
}

/**
 * The generator strips one leading and one trailing quote from the whole
 * expression (`^'(.*)'$`). Restore them when the first string literal was
 * left as `prefix_' . $var`.
 *
 * @param {string} input
 * @returns {string}
 */
function repairStrippedOuterQuotes(input) {
  const match = input.match(/^([A-Za-z0-9_]+)(['"])\s*\./);
  if (!match) {
    return input;
  }

  const quote = match[2];
  let repaired = quote + input;
  if (unclosedQuote(repaired)) {
    repaired += quote;
  }
  return repaired;
}

/**
 * @param {string} input
 * @returns {boolean}
 */
function unclosedQuote(input) {
  let quote = '';
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quote) {
      if (char === '\\') {
        i += 1;
        continue;
      }
      if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
    }
  }
  return quote !== '';
}

/**
 * @param {string} input
 * @returns {{type: 'string', value: string} | {type: 'var', name: string}}[]
 */
function tokenizePhpConcat(input) {
  /** @type {{type: 'string', value: string} | {type: 'var', name: string}[]} */
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    while (i < input.length && /\s/.test(input[i])) {
      i += 1;
    }
    if (i >= input.length) {
      break;
    }

    if (input[i] === '.') {
      i += 1;
      continue;
    }

    if (input[i] === "'" || input[i] === '"') {
      const quote = input[i];
      i += 1;
      let value = '';
      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\\' && i + 1 < input.length) {
          value += input[i + 1];
          i += 2;
          continue;
        }
        value += input[i];
        i += 1;
      }
      if (i < input.length && input[i] === quote) {
        i += 1;
      }
      tokens.push({type: 'string', value});
      continue;
    }

    if (input[i] === '$') {
      i += 1;
      if (input.startsWith('this->', i)) {
        i += 'this->'.length;
        let name = '';
        while (i < input.length && /[A-Za-z0-9_]/.test(input[i])) {
          name += input[i];
          i += 1;
        }
        tokens.push({type: 'var', name});
        continue;
      }

      let name = '';
      while (i < input.length && /[A-Za-z0-9_]/.test(input[i])) {
        name += input[i];
        i += 1;
      }
      if (name) {
        tokens.push({type: 'var', name});
      }
      continue;
    }

    i += 1;
  }

  return tokens;
}
