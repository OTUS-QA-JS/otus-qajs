type AsyncFunction<Args extends unknown[], Result> = (...payload: Args) => Promise<Result>

export const cached =
  <Args extends unknown[], Result>(fn: AsyncFunction<Args, Result>, cache = new Map<string, Promise<Result>>()) =>
  async (...payload: Args) => {
    const cacheKey = JSON.stringify(payload)

    let cachedValue = cache.get(cacheKey)
    if (!cachedValue) {
      cachedValue = fn(...payload)
      cache.set(cacheKey, cachedValue)
    }

    try {
      return await cachedValue
    } catch (error) {
      cache.delete(cacheKey)
      throw error
    }
  }
