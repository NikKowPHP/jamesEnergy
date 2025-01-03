import React from 'react';
import { useFormContext } from '@context/useFormContext';
import { Input } from './Input';
import {  formFields  } from '@/types/form';
import { formSchema, FormData } from '@/utils/validationSchema';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FormService } from '@/services/FormService';
import { debounce } from 'lodash';



const Form = () => {
  const navigate = useNavigate();
  const { state, setField, submitForm } = useFormContext();
  const { formData, loading, error } = state;
  const [validationErrors, setValidationErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});
  const [addressSuggestions, setAddressSuggestions] = React.useState<Array<{
    address: string;
    city: string;
    state: string;
    zip: string;
  }>>([]);

  const searchAddresses = React.useMemo(
    () =>
      debounce(async (query: string) => {
        const results = await FormService.searchAddresses(query);
        setAddressSuggestions(results);
      }, 300),
    []
  );
  const handleAddressSelect = async (suggestion: { address: string; city: string; state: string; zip: string }) => {
    setField('address', suggestion.address);
    setField('city', suggestion.city);
    setField('state', suggestion.state);
    await validateField('address', suggestion.address);
    await validateField('city', suggestion.city);
    await validateField('state', suggestion.state);
    setAddressSuggestions([]); // Clear suggestions after selection
  };

 

  const validateField = async (field: keyof FormData, value: string) => {
    try {
      await formSchema.validateAt(field, { [field]: value });
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setValidationErrors(prev => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const formatCurrency = (value: string): string => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Parse the numeric value
    const number = parseFloat(numericValue);
    
    // Return empty string if not a valid number
    if (isNaN(number)) return '';
    
    // Format as currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    let processedValue = value;
    
    if (field === 'address') {
      searchAddresses(value);
    }
    // Handle special formatting for currency
    if (field === 'estimatedMonthlyBill') {
      // Store the raw numeric value but display formatted
      processedValue = value.replace(/[^0-9.]/g, '');
      const formattedValue = formatCurrency(processedValue);
      
      // Update the input display with formatted value
      const input = document.getElementById('estimatedMonthlyBill') as HTMLInputElement;
      if (input) {
        input.value = formattedValue;
      }
    }
    
    setField(field, processedValue);
    validateField(field, processedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await formSchema.validate(formData, { abortEarly: false });
      await submitForm();
      navigate('/thank-you');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.reduce((acc, curr) => ({
          ...acc,
          [curr.path!]: curr.message
        }), {});
        
        setValidationErrors(errors);
      }
    }
  };

  return (
    <div className="w-full max-w-full bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8">
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Business Name and Address fields */}
          <div className="space-y-3">
            {formFields
              .filter(field => ['businessName', 'address'].includes(field.id))
              .map((field) => {
                if (field.type === 'autocomplete' && field.id === 'address') {
                  return (
                    <div key={field.id} className="relative">
                      <Input
                        {...field}
                        type="text"
                        value={formData[field.id] || ''}
                        error={validationErrors[field.id as keyof FormData]}
                        onChange={(e) => handleChange(field.id as keyof FormData, e.target.value)}
                      />
                      {addressSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                          {addressSuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => handleAddressSelect(suggestion)}
                            >
                              <div className="font-medium">{suggestion.address}</div>
                              <div className="text-sm text-gray-600">
                                {suggestion.city}, {suggestion.state} {suggestion.zip}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Input
                    key={field.id}
                    {...field}
                    value={formData[field.id] || ''}
                    error={validationErrors[field.id as keyof FormData]}
                    onChange={(e) => handleChange(field.id as keyof FormData, e.target.value)}
                  />
                );
              })}
          </div>

          {/* City and State group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {formFields
              .filter(field => ['city', 'state'].includes(field.id))
              .map((field) => (
                <Input
                  key={field.id}
                  {...field}
                  value={formData[field.id] || ''}
                  error={validationErrors[field.id as keyof FormData]}
                  onChange={(e) => handleChange(field.id as keyof FormData, e.target.value)}
                />
            ))}
          </div>

          {/* Contract End Date */}
          <div className="w-full">
            {formFields
              .filter(field => ['contractEndDate'].includes(field.id))
              .map((field) => (
                <Input
                  key={field.id}
                  {...field}
                  value={formData[field.id] || ''}
                  error={validationErrors[field.id as keyof FormData]}
                  onChange={(e) => handleChange(field.id as keyof FormData, e.target.value)}
                />
            ))}
          </div>

          {/* Provider and Monthly Bill group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {formFields
              .filter(field => ['currentProvider', 'estimatedMonthlyBill'].includes(field.id))
              .map((field) => (
                <Input
                  key={field.id}
                  {...field}
                  value={field.id === 'estimatedMonthlyBill' && formData[field.id] 
                    ? formatCurrency(formData[field.id]) 
                    : formData[field.id] || ''}
                  error={validationErrors[field.id as keyof FormData]}
                  onChange={(e) => handleChange(field.id as keyof FormData, e.target.value)}
                />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full flex justify-center py-3 sm:py-2.5 px-4 
              border border-transparent rounded-md 
              shadow-sm text-base sm:text-sm font-medium text-white 
              bg-black hover:bg-gray-800 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-black 
              transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? 'Processing...' : 'Get a Free Quote'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form; 