export type AuthResponse = {
  token: string;
  user: { email: string; name?: string };
};

// Mock login API - replace with real API call
export async function loginApi(email: string, password: string): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 600));
  if (!email || !password) {
    throw new Error("Invalid credentials");
  }
  // Create a fake JWT (for demo only) - replace with real token from server
  const payload = { email, iat: Date.now() / 1000 | 0, exp: (Date.now() + 1000 * 60 * 60) / 1000 | 0 };
  const token = btoa(JSON.stringify(payload));
  return { token, user: { email } };
}

export function setAuthToken(token: string) {
  try {
    localStorage.setItem("authToken", token);
  } catch (e) {
    // localStorage might be disabled; fall back to in-memory in future
    console.error("Failed to set auth token", e);
  }
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem("authToken");
  } catch (e) {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const t = getAuthToken();
  return !!t;
}

export function logout() {
  try {
    localStorage.removeItem("authToken");
  } catch (e) {
    console.error(e);
  }
}
