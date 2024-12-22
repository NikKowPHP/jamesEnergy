import { FormService } from '@/services/FormService';

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