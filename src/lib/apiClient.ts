import { getAuthToken } from "./auth";
import { errorLogger } from "./errorLogger";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      ...options,
      method: "GET",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      ...options,
      method: "POST",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      ...options,
      method: "PUT",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      ...options,
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const error = new Error(data?.message || `API Error: ${response.status}`);
      errorLogger.error("API request failed", error, {
        status: response.status,
        path: response.url,
        data,
      });
      throw error;
    }

    return data as T;
  }
}

export const apiClient = new ApiClient();
