import { describe, it, expect, beforeEach, vi } from "vitest";
import { errorLogger } from "@/lib/errorLogger";

describe("Error Logger", () => {
  beforeEach(() => {
    errorLogger.clearLogs();
    vi.clearAllMocks();
  });

  describe("error", () => {
    it("should log errors", () => {
      const error = new Error("Test error");
      errorLogger.error("Test Error", error, { context: "test" });
      
      const logs = errorLogger.getLogs();
      expect(logs.length).toBeGreaterThan(0);
    });

    it("should store error with context", () => {
      const error = new Error("Detailed error");
      errorLogger.error("Detailed Error", error, { userId: "123", action: "login" });
      
      const logs = errorLogger.getLogs();
      const lastLog = logs[logs.length - 1];
      expect(lastLog.message).toContain("Detailed Error");
    });
  });

  describe("warning", () => {
    it("should log warnings", () => {
      errorLogger.warning("Warning message", "Warning", { severity: "medium" });
      
      const logs = errorLogger.getLogs();
      expect(logs.some((log) => log.message.includes("Warning message"))).toBe(true);
    });
  });

  describe("info", () => {
    it("should log info messages", () => {
      errorLogger.info("Info message");
      
      const logs = errorLogger.getLogs();
      expect(logs.some((log) => log.message.includes("Info message"))).toBe(true);
    });
  });

  describe("getLogs", () => {
    it("should return all logs", () => {
      errorLogger.error("Error 1", new Error("Error 1"));
      errorLogger.warning("Warning 1", "Warning 1");
      errorLogger.info("Info 1");
      
      const logs = errorLogger.getLogs();
      expect(logs.length).toBe(3);
    });

    it("should limit logs to max size", () => {
      // Log many errors
      for (let i = 0; i < 60; i++) {
        errorLogger.error(`Error ${i}`, new Error(`Error ${i}`));
      }
      
      const logs = errorLogger.getLogs();
      expect(logs.length).toBeLessThanOrEqual(50); // Should be capped at 50
    });
  });

  describe("clearLogs", () => {
    it("should clear all logs", () => {
      errorLogger.error("Error 1", new Error("Error 1"));
      errorLogger.warning("Warning 1", "Warning 1");
      
      expect(errorLogger.getLogs().length).toBeGreaterThan(0);
      errorLogger.clearLogs();
      expect(errorLogger.getLogs().length).toBe(0);
    });
  });
});
