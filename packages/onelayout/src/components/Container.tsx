import React from "react";
import { css, useTheme } from "@emotion/react";
import getBreakpointNames from "../utils/getBreakpointNames";
import getContainerWidth from "../utils/getContainerWidth";
import getMediaCSS from "../utils/getMediaCSS";
import Context from "./Context";

type ContainerProps = {
  as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
  min?: string;
  max?: string;
  children?: React.ReactNode; // Accepts everything React can render
  childrenElement: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: React.ComponentPropsWithoutRef<"div">; // to impersonate all the props of a button element and explicitly not forwarding its ref
};

function Container({
  as = "div",
  min = "first",
  max = "last",
  ...restProps
}: ContainerProps): JSX.Element {
  const Element = as;

  const { breakpoints, containerMaxWidths } = useTheme();
  const breakpointNames = getBreakpointNames(breakpoints, min, max);

  return (
    <Element
      css={css`
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
      `}
      {...restProps}
    />
  );
}

export default function ContainerWithContext(
  props: ContainerProps
): JSX.Element {
  return (
    <Context>
      <Container {...props} />
    </Context>
  );
}
