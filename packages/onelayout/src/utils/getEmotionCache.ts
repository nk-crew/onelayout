import _createCache from "@emotion/cache";

// Hack since there is no full ESM support.
// @link https://github.com/emotion-js/emotion/issues/2730
// const createCache = _createCache.default || _createCache;
const createCache =
  typeof _createCache.default !== "undefined"
    ? (_createCache.default as any)
    : _createCache;

const emotionCache = createCache({ key: "onelayout" });

export function getEmotionCache() {
  return emotionCache;
}
