import { BreakPointHooks } from "@react-hooks-library/core";

export const breakpointsTailwind = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
export const { useSmaller } = BreakPointHooks(breakpointsTailwind);
