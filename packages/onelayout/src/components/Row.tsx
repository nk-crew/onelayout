import { css, CacheProvider } from "@emotion/react";
import { getBreakpoints } from "../utils/getBreakpoints";
import { getEmotionCache } from "../utils/getEmotionCache";
import { getMediaCSS } from "../utils/getMediaCSS";

type RowStyleProps = {
  as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "start" | "end" | "center";
  wrap?: false | true | "wrap" | "nowrap" | "wrap-reverse";
  gap?: string;
};

type RowProps =
  // TODO: remove this any. We added it because there is an unresolved TS error.
  | any
  | (RowStyleProps & {
      sm?: RowStyleProps;
      md?: RowStyleProps;
      lg?: RowStyleProps;
      xl?: RowStyleProps;
      xxl?: RowStyleProps;
    });

function getStyles(props: RowStyleProps) {
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
    result += `--ol-row-gap: ${rowGap};\n`;
  }

  if (typeof colGap !== "undefined") {
    result += `--ol-col-gap: ${colGap};\n`;
  }

  if (typeof props.direction !== "undefined") {
    result += `flex-direction: ${props.direction};\n`;
  }

  if (typeof props.justify !== "undefined") {
    result += `justify-content: ${props.justify};\n`;
  }

  if (typeof props.align !== "undefined") {
    result += `align-items: ${props.align};\n`;
  }

  if (typeof props.wrap !== "undefined") {
    result += `flex-wrap: ${props.wrap};\n`;
  }

  return result;
}

export function Row(props: RowProps): JSX.Element {
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
  const breakpoints = getBreakpoints();

  return (
    <CacheProvider value={getEmotionCache()}>
      <Element
        css={css`
          ${getStyles({
            gap,
            direction,
            justify,
            align,
            wrap,
          })}

          ${breakpoints.map((bp) => {
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
        `}
        {...restProps}
      />
    </CacheProvider>
  );
}
