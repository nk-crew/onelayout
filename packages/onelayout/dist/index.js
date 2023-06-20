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
var emotionCache = createCache({ key: "onelayout" });
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
function ContainerInner({
  as = "div",
  xl = false,
  lg = false,
  md = false,
  sm = false,
  ...restProps
}) {
  const Element = as;
  let size = "xxl";
  if (xl) {
    size = "xl";
  } else if (lg) {
    size = "lg";
  } else if (md) {
    size = "md";
  } else if (sm) {
    size = "sm";
  }
  const { breakpoints, containerMaxWidths } = useTheme2();
  const breakpointNames = getBreakpointNames(breakpoints, "first", size);
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
function Container(props) {
  return /* @__PURE__ */ jsx2(Context, { children: /* @__PURE__ */ jsx2(ContainerInner, { ...props }) });
}

// src/components/Row.tsx
import { css as css2, CacheProvider as CacheProvider3, useTheme as useTheme3 } from "@emotion/react";
import { jsx as jsx3 } from "@emotion/react/jsx-runtime";
function getStyles(props) {
  let result = "";
  if (true === props.wrap) {
    props.wrap = "wrap";
  } else if (false === props.wrap) {
    props.wrap = "nowrap";
  }
  const gapArray = typeof props.gap !== "undefined" ? props.gap.split(" ") : [];
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
function RowInner(props) {
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
function Row(props) {
  return /* @__PURE__ */ jsx3(Context, { children: /* @__PURE__ */ jsx3(RowInner, { ...props }) });
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
      const sizeFromWidth = parseFloat(width) / 100;
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
function ColInner(props) {
  const {
    as = "div",
    size = "grow",
    justify = "start",
    align = "start",
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
function Col(props) {
  return /* @__PURE__ */ jsx4(Context, { children: /* @__PURE__ */ jsx4(ColInner, { ...props }) });
}
export {
  Col,
  Container,
  Row,
  ThemeProvider2 as ThemeProvider,
  getBreakpointNames,
  getContainerWidth,
  getMediaCSS
};
//# sourceMappingURL=index.js.map