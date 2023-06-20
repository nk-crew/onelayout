// TODO: remove string type. For some reason in some utils there is an TS error when we don't use string here.
export type BreakpointsTypes = "sm" | "md" | "lg" | "xl" | "xxl" | string;

export type BreakpointsSizeTypes = {
  [key in BreakpointsTypes]: string;
};
