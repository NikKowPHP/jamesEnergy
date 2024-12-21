export class FormService {
  static async fetchInitialData(): Promise<Record<string, string>> {
    // TODO: Implement actual API call
    return Promise.resolve({});
  }

  static async submit(data: Record<string, string>): Promise<void> {
    // TODO: Implement actual API call
    console.log('Submitting form data:', data);
    return Promise.resolve();
  }
} 