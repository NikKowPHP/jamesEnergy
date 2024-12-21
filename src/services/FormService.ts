import { ApiService } from './api';
import { MockFormService } from './mockHandlers';

interface FormData {
  [key: string]: string;
}

interface FormResponse {
  success: boolean;
  message: string;
}

export class FormService extends ApiService {
  private static readonly ENDPOINTS = {
    SUBMIT: '/form/submit',
    INITIAL_DATA: '/form/initial-data',
  };

  private static readonly IS_DEV = import.meta.env.DEV;

  static async fetchInitialData(): Promise<Record<string, string>> {
    if (this.IS_DEV) {
      return MockFormService.fetchInitialData();
    }

    const response = await this.get<FormData>(this.ENDPOINTS.INITIAL_DATA);
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.data || {};
  }

  static async submit(data: Record<string, string>): Promise<void> {
    if (this.IS_DEV) {
      return MockFormService.submit(data);
    }

    const response = await this.post<FormResponse>(this.ENDPOINTS.SUBMIT, data);
    
    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Submission failed');
    }
  }

  static validateFormData(data: Record<string, string>): string | null {
    const requiredFields = ['name', 'email'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return `${field} is required`;
      }
    }

    // Email validation
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'Invalid email format';
    }

    // Phone validation (if provided)
    if (data.phone && !/^\+?[\d\s-]{10,}$/.test(data.phone)) {
      return 'Invalid phone number format';
    }

    return null;
  }
} 