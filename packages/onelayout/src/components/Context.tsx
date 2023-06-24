import { ThemeProvider, useTheme } from "@emotion/react";

import defaultTheme from "../theme";

type ContextProps =
  // TODO: remove this any. We added it because there is an unresolved TS error.
  any;

export default function Context(props: ContextProps): JSX.Element {
  const { breakpoints, containerMaxWidths } = useTheme();

  const theme = {
    breakpoints: {
      ...defaultTheme.breakpoints,
      ...breakpoints,
    },
    containerMaxWidths: {
      ...defaultTheme.containerMaxWidths,
      ...containerMaxWidths,
    },
  };

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
