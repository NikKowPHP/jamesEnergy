import { mockInitialData } from './mockData';

export class MockFormService {
  static async fetchInitialData(): Promise<Record<string, string>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Randomly decide whether to return data or throw an error (80% success rate)
    if (Math.random() > 0.2) {
      return mockInitialData;
    }
    
    throw new Error('Failed to fetch initial data');
  }

  static async submit(data: Record<string, string>): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log the submitted data
    console.log('Submitted form data:', data);
    
    // Randomly decide whether to succeed or fail (90% success rate)
    if (Math.random() > 0.1) {
      return Promise.resolve();
    }
    
    throw new Error('Form submission failed');
  }
} 