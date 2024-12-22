import { FormService } from '@/services/FormService';

describe('FormService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
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
  });

  describe('saveData', () => {
    it('should save data to session storage', () => {
      const mockData = { name: 'Test', email: 'test@example.com' };
      FormService.saveData(mockData);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        FormService.storageKey,
        JSON.stringify(mockData)
      );
    });
  });
}); 