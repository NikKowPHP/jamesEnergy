import React from 'react';
import { useFormContext } from '@context/useFormContext';
import { Input } from './Input';
import { FormField } from '@/types/form';
import { formSchema, FormData } from '@/utils/validationSchema';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  // ... add all US states
];

const formFields: FormField[] = [
  {
    id: 'businessName',
    label: 'Business Name',
    type: 'text',
    required: true,
    helperText: 'Enter your registered business name',
  },
  {
    id: 'address',
    label: 'Address',
    type: 'text',
    required: true,
    helperText: 'Enter your business address',
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    required: true,
  },
  {
    id: 'state',
    label: 'State',
    type: 'select',
    required: true,
    options: US_STATES,
  },
  {
    id: 'currentProvider',
    label: 'Current Energy Provider',
    type: 'text',
    helperText: 'Optional - Your current energy provider',
  },
  {
    id: 'contractEndDate',
    label: 'Contract End Date',
    type: 'date',
    helperText: 'Optional - When does your current contract end?',
  },
  {
    id: 'estimatedMonthlyBill',
    label: 'Estimated Monthly Bill',
    type: 'text',
    helperText: 'Optional - Your average monthly energy bill',
    placeholder: '$0.00',
  },
];

const Form = () => {
  const navigate = useNavigate();
  const { state, setField, submitForm } = useFormContext();
  const { formData, loading, error } = state;
  const [validationErrors, setValidationErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});

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
    <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {formFields.map((field) => (
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

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full flex justify-center py-2 px-4 
              border border-transparent rounded-md 
              shadow-sm text-sm font-medium text-white 
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