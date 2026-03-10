/**
 * Cache entry interface for storing cached values with expiration time
 */
export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * Execution cache entry for managing concurrent requests
 */
export interface ExecutionEntry<T> {
  promise: Promise<T>;
}
