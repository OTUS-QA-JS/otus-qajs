export const cached =
  (fn, cache = new Map()) =>
  async (...payload) => {
    const cacheKey = JSON.stringify(payload)

    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, fn(...payload))
    }

    try {
      return await cache.get(cacheKey)
    } catch (error) {
      cache.delete(cacheKey)
      throw error
    }
  }
