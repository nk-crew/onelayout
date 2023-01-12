export enum BreakpointNames {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
}

// TODO: remove string type. For some reason in some utils there is an TS error when we don't use string here.
export type BreakpointsTypes = "sm" | "md" | "lg" | "xl" | "xxl" | string;

export type BreakpointsSizeTypes = {
  [key in BreakpointsTypes]: number;
};
export const breakpoints: BreakpointsSizeTypes = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

type ContainerMaxWidthsTypes = {
  [key in BreakpointsTypes]: number;
};
export const containerMaxWidths: ContainerMaxWidthsTypes = {
  sm: 540,
  md: 740,
  lg: 996,
  xl: 1200,
  xxl: 1490,
};
