import { css, useTheme } from "@emotion/react";
import getMediaCSS from "../utils/getMediaCSS";
import getBreakpointNames from "../utils/getBreakpointNames";
import round from "../utils/round";
import Context from "./Context";

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
      const sizeFromWidth = round(parseFloat(width) / 100, 10);

      if (sizeFromWidth !== 1) {
        width = `calc(${width} - var(--ol-col-gap) + ${sizeFromWidth} * var(--ol-col-gap));\n`;
      }
    }

    result += `width: ${width};\n`;
  }

  return result;
}

function Col(props: ColProps): JSX.Element {
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

  const { breakpoints } = useTheme();
  const breakpointNames = getBreakpointNames(breakpoints);

  return (
    <Element
      css={css`
        ${getStyles({
          size,
          justify,
          align,
        })}

        ${breakpointNames.map((bp) => {
          if (typeof props[bp] !== "undefined") {
            return getMediaCSS(bp, getStyles(props[bp]), breakpoints);
          }

          return "";
        })}
      `}
      {...restProps}
    />
  );
}

export default function ColWithContext(props: ColProps): JSX.Element {
  return (
    <Context>
      <Col {...props} />
    </Context>
  );
}
