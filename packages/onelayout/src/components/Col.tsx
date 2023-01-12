import { css, CacheProvider } from "@emotion/react";
import { getBreakpoints } from "../utils/getBreakpoints";
import { getEmotionCache } from "../utils/getEmotionCache";
import { getMediaCSS } from "../utils/getMediaCSS";
import round from "../utils/round";

type ColStyleProps = {
  as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
  size?: "grow" | "auto" | number;
  justify?: "start" | "end" | "center" | "stretch";
  align?: "start" | "end" | "center" | "stretch";
};

type ColProps =
  // TODO: remove this any. We added it because there is an unresolved TS error.
  | any
  | (ColStyleProps & {
      sm?: ColStyleProps;
      md?: ColStyleProps;
      lg?: ColStyleProps;
      xl?: ColStyleProps;
      xxl?: ColStyleProps;
    });

function getStyles(props: ColStyleProps) {
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

    result += `flex: ${flex};\n`;
  }

  if (typeof props.justify !== "undefined") {
    result += `justify-self: ${props.justify};\n`;
  }

  if (typeof props.align !== "undefined") {
    result += `align-self: ${props.align};\n`;
  }

  if (width) {
    // Prepare percent width to work with gap properly.
    if (width.endsWith("%")) {
      const sizeFromWidth = parseFloat(width) / 100;

      if (sizeFromWidth !== 1) {
        width = `calc(${width} - var(--ol-col-gap) + ${sizeFromWidth} * var(--ol-col-gap));\n`;
      }
    }

    result += `width: ${width};\n`;
  }

  return result;
}

export function Col(props: ColProps): JSX.Element {
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
  const breakpoints = getBreakpoints();

  return (
    <CacheProvider value={getEmotionCache()}>
      <Element
        css={css`
          ${getStyles({
            size,
            justify,
            align,
          })}

          ${breakpoints.map((bp) => {
            if (typeof props[bp] !== "undefined") {
              return getMediaCSS(bp, getStyles(props[bp]));
            }

            return "";
          })}
        `}
        {...restProps}
      />
    </CacheProvider>
  );
}
