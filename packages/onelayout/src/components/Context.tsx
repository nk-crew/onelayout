import { ThemeProvider, CacheProvider, useTheme } from "@emotion/react";
import { getEmotionCache } from "../utils/getEmotionCache";

import defaultTheme from "../theme";

type ContextProps =
  // TODO: remove this any. We added it because there is an unresolved TS error.
  any;

export function Context(props: ContextProps): JSX.Element {
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

  return (
    <CacheProvider value={getEmotionCache()}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CacheProvider>
  );
}
