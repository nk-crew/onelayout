// src/components/Container.tsx
import { css, CacheProvider } from "@emotion/react";

// src/constants.ts
var breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};
var containerMaxWidths = {
  sm: 540,
  md: 740,
  lg: 996,
  xl: 1200,
  xxl: 1490
};

// src/utils/getNormalizedBreakpointName.ts
function getNormalizedBreakpointName(name = "sm") {
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

// src/utils/getBreakpoints.ts
function getBreakpoints(from = "first", to = "last") {
  const result = [];
  const fromNormal = getNormalizedBreakpointName(from);
  const toNormal = getNormalizedBreakpointName(to);
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
function getContainerWidth(bp) {
  let bpNormal = getNormalizedBreakpointName(bp);
  return typeof bpNormal !== "undefined" && typeof containerMaxWidths[bpNormal] !== "undefined" ? `${containerMaxWidths[bpNormal]}px` : 0;
}

// src/utils/getMediaCSS.ts
function getMediaCSS(bp, content) {
  return `
    @media screen and (min-width: ${breakpoints[bp]}px) {
      ${content}
    }
  `;
}

// src/utils/getEmotionCache.ts
import _createCache from "@emotion/cache";
var createCache = typeof _createCache.default !== "undefined" ? _createCache.default : _createCache;
var emotionCache = createCache({ key: "onelayout" });
function getEmotionCache() {
  return emotionCache;
}

// src/components/Container.tsx
import { jsx } from "@emotion/react/jsx-runtime";
function Container({
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
  const breakpoints2 = getBreakpoints("first", size);
  return /* @__PURE__ */ jsx(CacheProvider, { value: getEmotionCache(), children: /* @__PURE__ */ jsx(
    Element,
    {
      css: css`
          margin-left: auto;
          margin-right: auto;
          width: 100%;

          ${breakpoints2.map((bp) => {
        return getMediaCSS(bp, `max-width: ${getContainerWidth(bp)};`);
      })}
        `,
      ...restProps
    }
  ) });
}

// src/components/Row.tsx
import { css as css2, CacheProvider as CacheProvider2 } from "@emotion/react";
import { jsx as jsx2 } from "@emotion/react/jsx-runtime";
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
  const breakpoints2 = getBreakpoints();
  return /* @__PURE__ */ jsx2(CacheProvider2, { value: getEmotionCache(), children: /* @__PURE__ */ jsx2(
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

          ${breakpoints2.map((bp) => {
        if (typeof props[bp] !== "undefined") {
          return getMediaCSS(bp, getStyles(props[bp]));
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

// src/components/Col.tsx
import { css as css3, CacheProvider as CacheProvider3 } from "@emotion/react";

// src/utils/round.ts
function round(num, to = 2) {
  const pw = 10 ** to;
  return Math.round((num + Number.EPSILON) * pw) / pw;
}

// src/components/Col.tsx
import { jsx as jsx3 } from "@emotion/react/jsx-runtime";
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
function Col(props) {
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
  const breakpoints2 = getBreakpoints();
  return /* @__PURE__ */ jsx3(CacheProvider3, { value: getEmotionCache(), children: /* @__PURE__ */ jsx3(
    Element,
    {
      css: css3`
          ${getStyles2({
        size,
        justify,
        align
      })}

          ${breakpoints2.map((bp) => {
        if (typeof props[bp] !== "undefined") {
          return getMediaCSS(bp, getStyles2(props[bp]));
        }
        return "";
      })}
        `,
      ...restProps
    }
  ) });
}
export {
  Col,
  Container,
  Row,
  getBreakpoints,
  getContainerWidth,
  getMediaCSS
};
//# sourceMappingURL=index.js.map