// src/index.ts
import { ThemeProvider as ThemeProvider2 } from "@emotion/react";

// src/components/Container.tsx
import { css, CacheProvider as CacheProvider2, useTheme as useTheme2 } from "@emotion/react";

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
import createCache from "@emotion/cache";
var emotionCache = createCache({ key: "ol" });
function getEmotionCache() {
  return emotionCache;
}

// src/components/Context.tsx
import { ThemeProvider, CacheProvider, useTheme } from "@emotion/react";

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
import { jsx } from "@emotion/react/jsx-runtime";
function Context(props) {
  const { breakpoints, containerMaxWidths } = useTheme();
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
  return /* @__PURE__ */ jsx(CacheProvider, { value: getEmotionCache(), children: /* @__PURE__ */ jsx(ThemeProvider, { theme: theme2, children: props.children }) });
}

// src/components/Container.tsx
import { jsx as jsx2 } from "@emotion/react/jsx-runtime";
function Container({
  as = "div",
  min = "first",
  max = "last",
  ...restProps
}) {
  const Element = as;
  const { breakpoints, containerMaxWidths } = useTheme2();
  const breakpointNames = getBreakpointNames(breakpoints, min, max);
  return /* @__PURE__ */ jsx2(CacheProvider2, { value: getEmotionCache(), children: /* @__PURE__ */ jsx2(
    Element,
    {
      css: css`
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
  return /* @__PURE__ */ jsx2(Context, { children: /* @__PURE__ */ jsx2(Container, { ...props }) });
}

// src/components/Row.tsx
import { css as css2, CacheProvider as CacheProvider3, useTheme as useTheme3 } from "@emotion/react";

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
import { jsx as jsx3 } from "@emotion/react/jsx-runtime";
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
  const { breakpoints } = useTheme3();
  const breakpointNames = getBreakpointNames(breakpoints);
  return /* @__PURE__ */ jsx3(CacheProvider3, { value: getEmotionCache(), children: /* @__PURE__ */ jsx3(
    Element,
    {
      css: css2`
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
  return /* @__PURE__ */ jsx3(Context, { children: /* @__PURE__ */ jsx3(Row, { ...props }) });
}

// src/components/Col.tsx
import { css as css3, useTheme as useTheme4 } from "@emotion/react";

// src/utils/round.ts
function round(num, to = 2) {
  const pw = 10 ** to;
  return Math.round((num + Number.EPSILON) * pw) / pw;
}

// src/components/Col.tsx
import { jsx as jsx4 } from "@emotion/react/jsx-runtime";
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
  const { breakpoints } = useTheme4();
  const breakpointNames = getBreakpointNames(breakpoints);
  return /* @__PURE__ */ jsx4(
    Element,
    {
      css: css3`
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
  return /* @__PURE__ */ jsx4(Context, { children: /* @__PURE__ */ jsx4(Col, { ...props }) });
}
export {
  ColWithContext as Col,
  ContainerWithContext as Container,
  RowWithContext as Row,
  ThemeProvider2 as ThemeProvider,
  getBreakpointNames,
  getContainerWidth,
  getMediaCSS
};
//# sourceMappingURL=index.js.map