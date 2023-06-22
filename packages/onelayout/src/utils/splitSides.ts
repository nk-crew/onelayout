/**
 * Splits a CSS declaration value (shorthand) using provided separators
 * as the delimiters.
 *
 * @thanks https://github.com/jednano/css-list-helpers/blob/master/src/index.ts
 */
function split(
  /**
   * A CSS declaration value (shorthand).
   */
  value: string,
  /**
   * Any number of separator characters used for splitting.
   */
  separators: string[],
  { last = false } = {}
) {
  const array = [];
  let current = "";
  let splitMe = false;

  let func = 0;
  let quote: '"' | "'" | false = false;
  let escape = false;

  for (const char of value) {
    if (quote) {
      if (escape) {
        escape = false;
      } else if (char === "\\") {
        escape = true;
      } else if (char === quote) {
        quote = false;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "(") {
      func += 1;
    } else if (char === ")") {
      if (func > 0) {
        func -= 1;
      }
    } else if (func === 0) {
      if (separators.indexOf(char) !== -1) {
        splitMe = true;
      }
    }

    if (splitMe) {
      if (current !== "") {
        array.push(current.trim());
      }
      current = "";
      splitMe = false;
    } else {
      current += char;
    }
  }

  if (last || current !== "") {
    array.push(current.trim());
  }
  return array;
}

// Split CSS properties to sides to support different expressions such as:
//  - `10px`
//  - `10px 20px`
//  - `10px clamp(20px, 10vw, 40px)`
//  - `var(--custom-variable, 10px) clamp(20px, 10vw, var(--custom-variable, 40px))`
export default function splitSides(prop: string | undefined): Array<string> {
  if (typeof prop !== "string") {
    return [];
  }

  const separators = [" ", "\n", "\t"];

  const result = split(prop, separators);

  return result;
}
