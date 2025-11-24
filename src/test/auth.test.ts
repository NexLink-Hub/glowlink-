import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getAuthToken,
  setAuthToken,
  logout,
  isAuthenticated,
} from "@/lib/auth";

describe("Auth Utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("setAuthToken", () => {
    it("should store token in localStorage", () => {
      const token = "test-token-123";
      setAuthToken(token);
      expect(localStorage.getItem("authToken")).toBe(token);
    });
  });

  describe("getAuthToken", () => {
    it("should return stored token", () => {
      const token = "stored-token";
      localStorage.setItem("authToken", token);
      expect(getAuthToken()).toBe(token);
    });

    it("should return null if no token stored", () => {
      expect(getAuthToken()).toBeNull();
    });
  });

  describe("isAuthenticated", () => {
    it("should return true if token exists", () => {
      localStorage.setItem("authToken", "valid-token");
      expect(isAuthenticated()).toBe(true);
    });

    it("should return false if no token", () => {
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe("logout", () => {
    it("should remove token from localStorage", () => {
      localStorage.setItem("authToken", "token");
      
      logout();
      
      expect(localStorage.getItem("authToken")).toBeNull();
    });
  });
});
