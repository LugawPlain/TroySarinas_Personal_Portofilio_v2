interface Options {
  interval: number;
  uniqueTokenPerInterval?: number;
}

export function rateLimit(options: Options) {
  const tokenCache = new Map<string, number[]>();
  let lastCleanup = Date.now();

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now();

        // Cleanup periodically
        if (now - lastCleanup > options.interval) {
          lastCleanup = now;
          // Prune expired tokens
          for (const [key, timestamps] of tokenCache.entries()) {
            const valid = timestamps.filter((t) => now - t < options.interval);
            if (valid.length === 0) {
              tokenCache.delete(key);
            } else {
              tokenCache.set(key, valid);
            }
          }
        }

        const timestamps = tokenCache.get(token) || [];
        const validTimestamps = timestamps.filter(
          (timestamp) => now - timestamp < options.interval
        );

        if (validTimestamps.length >= limit) {
          reject(new Error("Rate limit exceeded"));
          return;
        }

        validTimestamps.push(now);
        tokenCache.set(token, validTimestamps);
        resolve();
      }),
  };
}
