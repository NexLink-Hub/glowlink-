import { errorLogger } from "./errorLogger";

/**
 * Wrapper for async operations to handle errors gracefully
 * @param fn - The async function to execute
 * @param fallback - Value to return if error occurs
 * @param context - Context info for error logging
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  fallback?: T,
  context?: Record<string, unknown>
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    errorLogger.error("Async operation failed", error as Error, { context });
    return fallback;
  }
}

/**
 * Wrapper for synchronous operations
 */
export function safeSync<T>(fn: () => T, fallback?: T, context?: Record<string, unknown>): T | undefined {
  try {
    return fn();
  } catch (error) {
    errorLogger.error("Sync operation failed", error as Error, { context });
    return fallback;
  }
}

/**
 * Create a promise that rejects after a timeout
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 30000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]);
}

/**
 * Retry failed operations with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = delayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

/**
 * Validate API response structure
 */
export function validateResponse<T>(response: unknown, expectedKeys: (keyof T)[]): response is T {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid response: must be an object");
  }

  for (const key of expectedKeys) {
    if (!(key in response)) {
      throw new Error(`Invalid response: missing required key "${String(key)}"`);
    }
  }

  return true;
}
