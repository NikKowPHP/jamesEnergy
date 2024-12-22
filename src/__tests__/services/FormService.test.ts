import { FormService } from '@/services/FormService';
import { formSchema } from '@/utils/validationSchema';

describe('FormService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
    // Setup process.env for tests
    process.env = { ...originalEnv, NODE_ENV: 'test' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('loadStoredData', () => {
    it('should return empty object when no data in storage', () => {
      jest.spyOn(sessionStorage, 'getItem').mockReturnValue(null);
      const result = FormService.loadStoredData();
      expect(result).toEqual({});
    });

    it('should return parsed data from storage', () => {
      const mockData = { name: 'Test', email: 'test@example.com' };
      jest.spyOn(sessionStorage, 'getItem').mockReturnValue(JSON.stringify(mockData));
      const result = FormService.loadStoredData();
      expect(result).toEqual(mockData);
    });

    it('should handle JSON parse errors gracefully', () => {
      jest.spyOn(sessionStorage, 'getItem').mockReturnValue('invalid json');
      const result = FormService.loadStoredData();
      expect(result).toEqual({});
    });
  });

  describe('saveData', () => {
    it('should save data to session storage', () => {
      const mockData = { name: 'Test', email: 'test@example.com' };
      const setItemSpy = jest.spyOn(sessionStorage, 'setItem');
      
      FormService.saveData(mockData);
      
      expect(setItemSpy).toHaveBeenCalledWith(
        FormService.storageKey,
        JSON.stringify(mockData)
      );
    });
  });
});

describe('Form Validation', () => {
  describe('FormService.validateFormData', () => {
    it('should validate required fields', () => {
      const invalidData = { phone: '1234567890' };
      const error = FormService.validateFormData(invalidData);
      expect(error).toBe('name is required');
    });

    it('should validate email format', () => {
      const invalidData = {
        name: 'Test User',
        email: 'invalid-email'
      };
      const error = FormService.validateFormData(invalidData);
      expect(error).toBe('Invalid email format');
    });

    it('should validate phone format if provided', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '123'  // too short
      };
      const error = FormService.validateFormData(invalidData);
      expect(error).toBe('Invalid phone number format');
    });

    it('should return null for valid data', () => {
      const validData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '123-456-7890'
      };
      const error = FormService.validateFormData(validData);
      expect(error).toBeNull();
    });
  });

  describe('Yup Schema Validation', () => {
    it('should validate required fields', async () => {
      const invalidData = {};
      
      try {
        await formSchema.validate(invalidData, { abortEarly: false });
        fail('Validation should have failed');
      } catch (error: any) {
        // Verify that all required field errors are present
        expect(error.errors).toEqual(
          expect.arrayContaining([
            'Business name is required',
            'Address is required',
            'City is required',
            'State is required'
          ])
        );
      }
    });

    // Alternative approach using validateSync
    it('should collect all validation errors', async () => {
      const invalidData = {};
      
      try {
        formSchema.validateSync(invalidData, { abortEarly: false });
      } catch (error: any) {
        expect(error.errors).toContain('Business name is required');
        expect(error.errors).toContain('State is required');
        expect(error.errors).toContain('Address is required');
        expect(error.errors).toContain('City is required');
      }
    });

    it('should validate business name length', async () => {
      const invalidData = {
        businessName: 'A',  // too short
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL'
      };

      await expect(formSchema.validate(invalidData))
        .rejects
        .toThrow('Business name must be at least 2 characters');
    });

    it('should validate state selection', async () => {
      const invalidData = {
        businessName: 'Test Business',
        address: '123 Main St',
        city: 'Springfield',
        state: 'XX'  // invalid state
      };

      await expect(formSchema.validate(invalidData))
        .rejects
        .toThrow('Please select a valid state');
    });

    it('should validate contract end date', async () => {
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 1);

      const invalidData = {
        businessName: 'Test Business',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        contractEndDate: pastDate
      };

      await expect(formSchema.validate(invalidData))
        .rejects
        .toThrow('Date cannot be in the past');
    });

    it('should validate estimated monthly bill', async () => {
      const invalidData = {
        businessName: 'Test Business',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        estimatedMonthlyBill: -100  // negative amount
      };

      await expect(formSchema.validate(invalidData))
        .rejects
        .toThrow('Amount must be positive');
    });

    it('should accept valid form data', async () => {
      const validData = {
        businessName: 'Test Business',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        currentProvider: 'Current Co',
        contractEndDate: new Date('2025-01-01'),
        estimatedMonthlyBill: 500
      };

      const validated = await formSchema.validate(validData);
      expect(validated).toEqual(validData);
    });
  });
}); 