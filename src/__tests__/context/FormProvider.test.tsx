import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider } from '@/context/FormProvider';
import { useFormContext } from '@/context/useFormContext';
import { FormService } from '@/services/FormService';

// Add proper type for the test component
const TestComponent: React.FC = () => {
  const { state, setField } = useFormContext();
  return (
    <div>
      <input
        data-testid="test-input"
        value={state.formData.testField || ''}
        onChange={(e) => setField('testField', e.target.value)}
      />
      <div data-testid="form-data">{JSON.stringify(state.formData)}</div>
    </div>
  );
};

describe('FormProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should load initial data from session storage', () => {
    const mockData = { testField: 'initial value' };
    jest.spyOn(FormService, 'loadStoredData').mockReturnValue(mockData);

    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    expect(screen.getByTestId('form-data')).toHaveTextContent(JSON.stringify(mockData));
  });

  it('should update form data when setField is called', async () => {
    jest.spyOn(FormService, 'saveData');

    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'new value' } });

    await waitFor(() => {
      expect(FormService.saveData).toHaveBeenCalledWith({ testField: 'new value' });
    });
  });
}); 