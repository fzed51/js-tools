import type { CacheEntry, ExecutionEntry } from "./simple-cache.types";

/**
 * SimpleCache class provides in-memory caching with TTL (Time To Live) support.
 * It prevents duplicate requests for the same key by managing both result cache
 * and execution cache.
 */
export class SimpleCache {
  private resultCache = new Map<string, CacheEntry<unknown>>();
  private executionCache = new Map<string, ExecutionEntry<unknown>>();
  private readonly ttlMs: number;

  /**
   * Creates a new SimpleCache instance
   * @param ttlMs Time to live in milliseconds for cached entries
   */
  constructor(ttlMs: number) {
    this.ttlMs = ttlMs;
  }

  /**
   * Fetches a value from cache or executes the callback if not cached.
   * Manages concurrent requests to prevent duplicate executions.
   *
   * @param key Cache key
   * @param callback Function to execute if value is not in cache
   * @returns Cached value or result from callback execution
   */
  async fetch<T>(key: string, callback: () => T | Promise<T>): Promise<T> {
    // Clean expired entries
    this.cleanExpiredEntries();

    // Check if result exists in cache
    const cachedResult = this.resultCache.get(key);
    if (cachedResult && cachedResult.expiresAt > Date.now()) {
      return cachedResult.value as T;
    }

    // Check if callback is currently executing
    const executionEntry = this.executionCache.get(key);
    if (executionEntry) {
      return executionEntry.promise as Promise<T>;
    }

    // Execute callback and manage caching
    const promise = this.executeAndCache(key, callback);

    // Add to execution cache
    this.executionCache.set(key, { promise });

    return promise;
  }

  /**
   * Executes the callback and manages caching logic
   */
  private async executeAndCache<T>(
    key: string,
    callback: () => T | Promise<T>,
  ): Promise<T> {
    try {
      const result = await callback();

      // Remove from execution cache
      this.executionCache.delete(key);

      // Add result to cache
      const expiresAt = Date.now() + this.ttlMs;
      this.resultCache.set(key, { value: result, expiresAt });

      return result;
    } catch (error) {
      // Remove from execution cache on error
      this.executionCache.delete(key);
      throw error;
    }
  }

  /**
   * Removes expired entries from the result cache to limit memory usage
   */
  private cleanExpiredEntries(): void {
    const now = Date.now();
    for (const [key, entry] of this.resultCache.entries()) {
      if (entry.expiresAt <= now) {
        this.resultCache.delete(key);
      }
    }
  }

  /**
   * Manually clears all cache entries
   */
  clear(): void {
    this.resultCache.clear();
    this.executionCache.clear();
  }

  /**
   * Gets the current size of the result cache
   */
  get size(): number {
    return this.resultCache.size;
  }

  /**
   * Gets the number of currently executing callbacks
   */
  get executingCount(): number {
    return this.executionCache.size;
  }

  /**
   * Manually removes a specific key from cache
   */
  delete(key: string): boolean {
    const resultDeleted = this.resultCache.delete(key);
    const executionDeleted = this.executionCache.delete(key);
    return resultDeleted || executionDeleted;
  }

  /**
   * Checks if a key exists in cache (and is not expired)
   */
  has(key: string): boolean {
    const entry = this.resultCache.get(key);
    return entry ? entry.expiresAt > Date.now() : false;
  }
}
