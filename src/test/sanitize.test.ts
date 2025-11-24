import { describe, it, expect } from "vitest";
import { sanitizeInput } from "@/lib/sanitize";

describe("Sanitize Utilities", () => {
  describe("sanitizeInput", () => {
    it("should remove HTML tags", () => {
      const input = "<script>alert('xss')</script>Hello";
      const result = sanitizeInput(input);
      expect(result).not.toContain("<script>");
      expect(result).toContain("Hello");
    });

    it("should remove dangerous attributes", () => {
      const input = '<img src="x" onerror="alert(\'xss\')" />';
      const result = sanitizeInput(input);
      expect(result).not.toContain("onerror");
    });

    it("should allow safe HTML", () => {
      const input = "<p>Safe paragraph</p>";
      const result = sanitizeInput(input);
      expect(result).toContain("Safe paragraph");
    });

    it("should handle empty strings", () => {
      expect(sanitizeInput("")).toBe("");
    });

    it("should handle special characters", () => {
      const input = "Test & < > \" ' Characters";
      const result = sanitizeInput(input);
      expect(result).toBeTruthy();
    });
  });
});
