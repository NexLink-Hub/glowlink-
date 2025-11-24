import { describe, it, expect, vi } from "vitest";
import {
  safeAsync,
  withTimeout,
  retryAsync,
  validateResponse,
} from "@/lib/errorHandling";

describe("Error Handling Utilities", () => {
  describe("safeAsync", () => {
    it("should execute async function and return result", async () => {
      const asyncFn = async () => "success";
      const result = await safeAsync(asyncFn);
      expect(result).toBe("success");
    });

    it("should catch and return fallback on error", async () => {
      const asyncFn = async () => {
        throw new Error("Test error");
      };
      const fallback = "fallback-value";
      const result = await safeAsync(asyncFn, fallback);
      expect(result).toBe(fallback);
    });

    it("should return undefined if no fallback provided", async () => {
      const asyncFn = async () => {
        throw new Error("Test error");
      };
      const result = await safeAsync(asyncFn);
      expect(result).toBeUndefined();
    });
  });

  describe("withTimeout", () => {
    it("should return result if completed within timeout", async () => {
      const asyncFn = async () => {
        await new Promise((r) => setTimeout(r, 50));
        return "completed";
      };
      const result = await withTimeout(asyncFn(), 200);
      expect(result).toBe("completed");
    });

    it("should throw error if timeout exceeded", async () => {
      const asyncFn = async () => {
        await new Promise((r) => setTimeout(r, 300));
        return "completed";
      };
      
      await expect(withTimeout(asyncFn(), 100)).rejects.toThrow("Operation timed out");
    });

    it("should use default timeout of 30 seconds", async () => {
      const asyncFn = async () => "success";
      const result = await withTimeout(asyncFn());
      expect(result).toBe("success");
    });
  });

  describe("retryAsync", () => {
    it("should succeed on first attempt", async () => {
      const asyncFn = async () => "success";
      const result = await retryAsync(asyncFn, 3);
      expect(result).toBe("success");
    });

    it("should throw after max retries exceeded", async () => {
      const asyncFn = async () => {
        throw new Error("Always fails");
      };

      await expect(retryAsync(asyncFn, 2, 10)).rejects.toThrow("Always fails");
    });

    it("should use exponential backoff", async () => {
      const startTime = Date.now();
      let attempts = 0;
      
      const asyncFn = async () => {
        attempts++;
        if (attempts === 1) throw new Error("Fail");
        return "success";
      };

      await retryAsync(asyncFn, 3, 10);
      const elapsed = Date.now() - startTime;
      
      // Should have some delay due to exponential backoff (first retry after 10ms)
      expect(elapsed).toBeGreaterThan(5);
      expect(attempts).toBe(2);
    });
  });

  describe("validateResponse", () => {
    it("should validate response with required keys", () => {
      const response = { status: 200, data: { id: 1 } };
      const result = validateResponse(response, ["status", "data"]);
      expect(result).toBe(true);
    });

    it("should throw on missing required keys", () => {
      const response = { status: 200 };
      expect(() => validateResponse(response, ["status", "data"])).toThrow("missing required key");
    });

    it("should throw on null/undefined response", () => {
      expect(() => validateResponse(null, ["status"])).toThrow("must be an object");
    });

    it("should throw on non-object response", () => {
      expect(() => validateResponse("string", ["key"])).toThrow("must be an object");
    });
  });
});
