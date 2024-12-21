import { ApiService } from './api';

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

  static async fetchInitialData(): Promise<Record<string, string>> {
    const response = await this.get<FormData>(this.ENDPOINTS.INITIAL_DATA);
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.data || {};
  }

  static async submit(data: Record<string, string>): Promise<void> {
    const response = await this.post<FormResponse>(this.ENDPOINTS.SUBMIT, data);
    
    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Submission failed');
    }
  }

  // Optional: Method to validate form data before submission
  static validateFormData(data: Record<string, string>): string | null {
    // Add any client-side validation logic here
    const requiredFields = ['name', 'email'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return `${field} is required`;
      }
    }

    return null;
  }
} 