import createCache from "@emotion/cache";

const emotionCache = createCache({ key: "ol" });

export default function getEmotionCache() {
  return emotionCache;
}
