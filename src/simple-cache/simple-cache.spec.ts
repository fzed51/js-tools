import { SimpleCache } from "./simple-cache";

describe("SimpleCache", () => {
  let cache: SimpleCache;

  beforeEach(() => {
    cache = new SimpleCache(1000); // 1 second TTL
  });

  afterEach(() => {
    cache.clear();
  });

  it("should create cache with specified TTL", () => {
    expect(cache).toBeInstanceOf(SimpleCache);
    expect(cache.size).toBe(0);
  });

  it("should cache result from callback", async () => {
    const mockCallback = jest.fn().mockResolvedValue([1, 2, 3]);

    const result = await cache.fetch("kevin", mockCallback);

    expect(result).toEqual([1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(cache.size).toBe(1);
  });

  it("should return cached result without executing callback again", async () => {
    const mockCallback = jest.fn().mockResolvedValue([1, 2, 3]);

    // First call
    const result1 = await cache.fetch("kevin", mockCallback);
    // Second call
    const result2 = await cache.fetch("kevin", mockCallback);

    expect(result1).toEqual([1, 2, 3]);
    expect(result2).toEqual([1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledTimes(1); // Called only once
    expect(cache.size).toBe(1);
  });

  it("should handle concurrent requests without duplicating execution", async () => {
    const mockCallback = jest.fn().mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
      return [1, 2, 3];
    });

    // Start multiple concurrent requests
    const promises = [
      cache.fetch("kevin", mockCallback),
      cache.fetch("kevin", mockCallback),
      cache.fetch("kevin", mockCallback),
    ];

    const results = await Promise.all(promises);

    expect(results).toEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);
    expect(mockCallback).toHaveBeenCalledTimes(1); // Called only once
    expect(cache.size).toBe(1);
  });

  it("should expire entries after TTL", async () => {
    cache = new SimpleCache(100); // 100ms TTL
    const mockCallback = jest.fn().mockResolvedValue([1, 2, 3]);

    // First call
    await cache.fetch("kevin", mockCallback);
    expect(cache.has("kevin")).toBe(true);

    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 150));

    // Second call after expiration
    await cache.fetch("kevin", mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(2); // Called twice due to expiration
  });

  it("should clean expired entries automatically", async () => {
    cache = new SimpleCache(50); // 50ms TTL
    const mockCallback = jest.fn().mockResolvedValue([1, 2, 3]);

    await cache.fetch("key1", mockCallback);
    await cache.fetch("key2", mockCallback);
    expect(cache.size).toBe(2);

    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 100));

    // Trigger cleanup by making a new request
    await cache.fetch("key3", mockCallback);

    expect(cache.size).toBe(1); // Only the new entry should remain
  });

  it("should handle synchronous callbacks", async () => {
    const mockCallback = jest.fn().mockReturnValue([1, 2, 3]);

    const result = await cache.fetch("kevin", mockCallback);

    expect(result).toEqual([1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should handle callback errors correctly", async () => {
    const mockCallback = jest.fn().mockRejectedValue(new Error("Test error"));

    await expect(cache.fetch("kevin", mockCallback)).rejects.toThrow("Test error");
    expect(cache.size).toBe(0);
    expect(cache.executingCount).toBe(0);
  });

  it("should support manual cache operations", async () => {
    const mockCallback = jest.fn().mockResolvedValue([1, 2, 3]);

    await cache.fetch("kevin", mockCallback);
    expect(cache.has("kevin")).toBe(true);

    cache.delete("kevin");
    expect(cache.has("kevin")).toBe(false);
    expect(cache.size).toBe(0);
  });

  it("should clear all cache entries", async () => {
    const mockCallback = jest.fn().mockResolvedValue([1, 2, 3]);

    await cache.fetch("key1", mockCallback);
    await cache.fetch("key2", mockCallback);
    expect(cache.size).toBe(2);

    cache.clear();
    expect(cache.size).toBe(0);
  });
});
