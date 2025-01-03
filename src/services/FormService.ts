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
    SUBMIT: '/customer/submit',
    INITIAL_DATA: '/form/initial-data',
    ADDRESS_SEARCH: '/ercot-master/search',
  };

  private static readonly IS_DEV =  process.env.NODE_ENV === 'development';

  private static readonly STORAGE_KEY = 'form_data';
  static get storageKey() {
    return this.STORAGE_KEY;
  }

  static async searchAddresses(query: string): Promise<Array<{
    address: string;
    city: string;
    state: string;
    zip: string;
  }>> {
    if (!query || query.length < 3) return [];

    try {
      const response = await this.get<any>(`${this.ENDPOINTS.ADDRESS_SEARCH}?search=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching addresses:', error);
      return [];
    }
  }

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
  
      const payload = {
        phone: data.phone,
        email: data.email,
        company_name: data.businessName,
        address_street: data.address,
        address_city: data.city,
        address_state: data.state,
        address_zip: data.zip,
        contract_end_date: data.contractEndDate,
        energy_provider: data.currentProvider,
        monthly_bill: parseFloat(data.estimatedMonthlyBill.replace(/[^0-9.]/g, '')),
      };
    

    const response = await this.post<FormResponse>(this.ENDPOINTS.SUBMIT, payload);
    
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

  static loadStoredData(): Record<string, string> {
    try {
      const storedData = sessionStorage.getItem(this.STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      if (this.IS_DEV) {
        console.error('Error loading form data:', error);
      }
      return {};
    }
  }

  static saveData(data: Record<string, string>): void {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      if (this.IS_DEV) {
        console.error('Error saving form data:', error);
      }
    }
  }
} 