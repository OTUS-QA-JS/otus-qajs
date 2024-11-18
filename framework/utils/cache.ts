/* eslint-disable @typescript-eslint/no-explicit-any */

export const cached =
  (fn: any, cache = new Map()) =>
  async (...payload: any[]) => {
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
