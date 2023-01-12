import React from "react";
import { css, CacheProvider } from "@emotion/react";
import { getBreakpoints } from "../utils/getBreakpoints";
import { getContainerWidth } from "../utils/getContainerWidth";
import { getMediaCSS } from "../utils/getMediaCSS";
import { getEmotionCache } from "../utils/getEmotionCache";

type ContainerProps = {
  as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
  xl?: boolean;
  lg?: boolean;
  md?: boolean;
  sm?: boolean;
  children?: React.ReactNode; // Accepts everything React can render
  childrenElement: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: React.ComponentPropsWithoutRef<"div">; // to impersonate all the props of a button element and explicitly not forwarding its ref
};

export function Container({
  as = "div",
  xl = false,
  lg = false,
  md = false,
  sm = false,
  ...restProps
}: ContainerProps): JSX.Element {
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

  const breakpoints = getBreakpoints("first", size);

  return (
    <CacheProvider value={getEmotionCache()}>
      <Element
        css={css`
          margin-left: auto;
          margin-right: auto;
          width: 100%;

          ${breakpoints.map((bp) => {
            return getMediaCSS(bp, `max-width: ${getContainerWidth(bp)};`);
          })}
        `}
        {...restProps}
      />
    </CacheProvider>
  );
}
