import createCache from "@emotion/cache";

const emotionCache = createCache({ key: "onelayout" });

export function getEmotionCache() {
  return emotionCache;
}
