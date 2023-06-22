"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Col: () => ColWithContext,
  Container: () => ContainerWithContext,
  Row: () => RowWithContext,
  ThemeProvider: () => import_react5.ThemeProvider,
  getBreakpointNames: () => getBreakpointNames,
  getContainerWidth: () => getContainerWidth,
  getMediaCSS: () => getMediaCSS
});
module.exports = __toCommonJS(src_exports);
var import_react5 = require("@emotion/react");

// src/components/Container.tsx
var import_react2 = require("@emotion/react");

// src/utils/getNormalizedBreakpointName.ts
function getNormalizedBreakpointName(breakpoints, name = "sm") {
  let result;
  if (name === "first") {
    [result] = Object.keys(breakpoints);
  } else if (name === "last") {
    result = Object.keys(breakpoints)[Object.keys(breakpoints).length - 1];
  } else {
    result = name;
  }
  return result;
}

// src/utils/getBreakpointNames.ts
function getBreakpointNames(breakpoints, from = "first", to = "last") {
  const result = [];
  const fromNormal = getNormalizedBreakpointName(breakpoints, from);
  const toNormal = getNormalizedBreakpointName(breakpoints, to);
  let save = false;
  Object.keys(breakpoints).forEach((bp) => {
    if (save || bp === fromNormal) {
      save = true;
      result.push(bp);
    }
    if (bp === toNormal) {
      save = false;
    }
  });
  return result;
}

// src/utils/getContainerWidth.ts
function getContainerWidth(bp, containerMaxWidths, breakpoints) {
  let bpNormal = getNormalizedBreakpointName(breakpoints, bp);
  return typeof bpNormal !== "undefined" && typeof containerMaxWidths[bpNormal] !== "undefined" ? containerMaxWidths[bpNormal] : 0;
}

// src/utils/getMediaCSS.ts
function getMediaCSS(bp, content, breakpoints) {
  return `
    @media screen and (min-width: ${breakpoints[bp]}) {
      ${content}
    }
  `;
}

// src/utils/getEmotionCache.ts
var import_cache = __toESM(require("@emotion/cache"), 1);
var emotionCache = (0, import_cache.default)({ key: "ol" });
function getEmotionCache() {
  return emotionCache;
}

// src/components/Context.tsx
var import_react = require("@emotion/react");

// src/theme.ts
var theme = {
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px"
  },
  containerMaxWidths: {
    sm: "540px",
    md: "740px",
    lg: "996px",
    xl: "1200px",
    xxl: "1490px"
  }
};
var theme_default = theme;

// src/components/Context.tsx
var import_jsx_runtime = require("@emotion/react/jsx-runtime");
function Context(props) {
  const { breakpoints, containerMaxWidths } = (0, import_react.useTheme)();
  const theme2 = {
    breakpoints: {
      ...theme_default.breakpoints,
      ...breakpoints
    },
    containerMaxWidths: {
      ...theme_default.containerMaxWidths,
      ...containerMaxWidths
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.CacheProvider, { value: getEmotionCache(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.ThemeProvider, { theme: theme2, children: props.children }) });
}

// src/components/Container.tsx
var import_jsx_runtime2 = require("@emotion/react/jsx-runtime");
function Container({
  as = "div",
  min = "first",
  max = "last",
  ...restProps
}) {
  const Element = as;
  const { breakpoints, containerMaxWidths } = (0, import_react2.useTheme)();
  const breakpointNames = getBreakpointNames(breakpoints, min, max);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.CacheProvider, { value: getEmotionCache(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Element,
    {
      css: import_react2.css`
          margin-left: auto;
          margin-right: auto;
          width: 100%;

          ${breakpointNames.map((bp) => {
        return getMediaCSS(
          bp,
          `max-width: ${getContainerWidth(
            bp,
            containerMaxWidths,
            breakpoints
          )};`,
          breakpoints
        );
      })}
        `,
      ...restProps
    }
  ) });
}
function ContainerWithContext(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Context, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Container, { ...props }) });
}

// src/components/Row.tsx
var import_react3 = require("@emotion/react");

// src/utils/splitSides/index.ts
function split(value, separators, { last = false } = {}) {
  const array = [];
  let current = "";
  let splitMe = false;
  let func = 0;
  let quote = false;
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
function splitSides(prop) {
  if (typeof prop !== "string") {
    return [];
  }
  const separators = [" ", "\n", "	"];
  const result = split(prop, separators);
  return result;
}

// src/components/Row.tsx
var import_jsx_runtime3 = require("@emotion/react/jsx-runtime");
function getStyles(props) {
  let result = "";
  if (true === props.wrap) {
    props.wrap = "wrap";
  } else if (false === props.wrap) {
    props.wrap = "nowrap";
  }
  const gapArray = splitSides(props.gap);
  const rowGap = gapArray[0];
  let colGap = rowGap;
  if (typeof gapArray[1] !== "undefined") {
    colGap = gapArray[1];
  }
  if (typeof rowGap !== "undefined") {
    result += `--ol-row-gap: ${rowGap};
`;
  }
  if (typeof colGap !== "undefined") {
    result += `--ol-col-gap: ${colGap};
`;
  }
  if (typeof props.direction !== "undefined") {
    result += `flex-direction: ${props.direction};
`;
  }
  if (typeof props.justify !== "undefined") {
    result += `justify-content: ${props.justify};
`;
  }
  if (typeof props.align !== "undefined") {
    result += `align-items: ${props.align};
`;
  }
  if (typeof props.wrap !== "undefined") {
    result += `flex-wrap: ${props.wrap};
`;
  }
  return result;
}
function Row(props) {
  const {
    as = "div",
    direction = "row",
    wrap = true,
    justify = "start",
    align = "start",
    gap = "1.5rem",
    sm,
    md,
    lg,
    xl,
    xxl,
    ...restProps
  } = props;
  const Element = as;
  const { breakpoints } = (0, import_react3.useTheme)();
  const breakpointNames = getBreakpointNames(breakpoints);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.CacheProvider, { value: getEmotionCache(), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    Element,
    {
      css: import_react3.css`
          ${getStyles({
        gap,
        direction,
        justify,
        align,
        wrap
      })}

          ${breakpointNames.map((bp) => {
        if (typeof props[bp] !== "undefined") {
          return getMediaCSS(bp, getStyles(props[bp]), breakpoints);
        }
        return "";
      })}

          display: flex;
          row-gap: var(--ol-row-gap);
          column-gap: var(--ol-col-gap);

          > * {
            margin: 0;
          }
        `,
      ...restProps
    }
  ) });
}
function RowWithContext(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Context, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Row, { ...props }) });
}

// src/components/Col.tsx
var import_react4 = require("@emotion/react");

// src/utils/round.ts
function round(num, to = 2) {
  const pw = 10 ** to;
  return Math.round((num + Number.EPSILON) * pw) / pw;
}

// src/components/Col.tsx
var import_jsx_runtime4 = require("@emotion/react/jsx-runtime");
function getStyles2(props) {
  let result = "";
  let width = "auto";
  if (typeof props.size !== "undefined") {
    let flex = "1 1 auto";
    if ("auto" === props.size) {
      flex = "0 1 auto";
    } else if (typeof props.size === "number") {
      flex = "0 0 auto";
      width = `${round(props.size * 100, 4)}%`;
    } else if (props.size !== "grow") {
      flex = "0 0 auto";
      width = props.size;
    }
    result += `flex: ${flex};
`;
  }
  if (typeof props.justify !== "undefined") {
    result += `justify-self: ${props.justify};
`;
  }
  if (typeof props.align !== "undefined") {
    result += `align-self: ${props.align};
`;
  }
  if (width) {
    if (width.endsWith("%")) {
      const sizeFromWidth = round(parseFloat(width) / 100, 10);
      if (sizeFromWidth !== 1) {
        width = `calc(${width} - var(--ol-col-gap) + ${sizeFromWidth} * var(--ol-col-gap));
`;
      }
    }
    result += `width: ${width};
`;
  }
  return result;
}
function Col(props) {
  const {
    as = "div",
    size = "grow",
    justify = "initial",
    align = "initial",
    sm,
    md,
    lg,
    xl,
    xxl,
    ...restProps
  } = props;
  const Element = as;
  const { breakpoints } = (0, import_react4.useTheme)();
  const breakpointNames = getBreakpointNames(breakpoints);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    Element,
    {
      css: import_react4.css`
        ${getStyles2({
        size,
        justify,
        align
      })}

        ${breakpointNames.map((bp) => {
        if (typeof props[bp] !== "undefined") {
          return getMediaCSS(bp, getStyles2(props[bp]), breakpoints);
        }
        return "";
      })}
      `,
      ...restProps
    }
  );
}
function ColWithContext(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Context, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Col, { ...props }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Col,
  Container,
  Row,
  ThemeProvider,
  getBreakpointNames,
  getContainerWidth,
  getMediaCSS
});
//# sourceMappingURL=index.cjs.map