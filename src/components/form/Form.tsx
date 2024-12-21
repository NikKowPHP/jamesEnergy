import React from 'react';
import { useFormContext } from '@context/useFormContext';
import { Input } from './Input';
import { FormField } from '@/types/form';
import { formSchema, FormData } from '@/utils/validationSchema';
import * as yup from 'yup';
const formFields: FormField[] = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    helperText: 'Please enter your full name',
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    helperText: 'Please enter your email address',
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    helperText: 'Optional - Include country code',
  },
  {
    id: 'message',
    label: 'Message',
    type: 'text',
    helperText: 'Tell us about your energy needs',
  },
];

const Form = () => {
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

  const handleChange = (field: keyof FormData, value: string) => {
    setField(field, value);
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate all fields
      await formSchema.validate(formData, { abortEarly: false });
      
      // If validation passes, submit the form
      await submitForm();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Transform Yup's validation errors into our format
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
              id={field.id}
              label={field.label}
              type={field.type}
              value={formData[field.id] || ''}
              required={field.required}
              helperText={field.helperText}
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
            {loading ? 'Processing...' : 'Get Started'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form; 