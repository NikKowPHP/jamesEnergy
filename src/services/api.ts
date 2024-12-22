type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method: RequestMethod;
  headers?: HeadersInit;
  body?: string;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export class ApiService {
  private static readonly BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';
  
  private static async fetchWithTimeout<T>(
    endpoint: string, 
    options: RequestOptions,
    timeout: number = 5000
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      clearTimeout(timeoutId);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }

  protected static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.fetchWithTimeout<T>(endpoint, { method: 'GET' });
  }

  protected static async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.fetchWithTimeout<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
} 