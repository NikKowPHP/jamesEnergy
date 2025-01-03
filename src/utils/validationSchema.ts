import { US_STATES } from '@/types/form';
import * as yup from 'yup';



export const formSchema = yup.object({
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Business name must be at least 2 characters'),
  
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Please enter a valid address'),
  
  city: yup
    .string()
    .required('City is required')
    .min(2, 'Please enter a valid city name'),
  
  state: yup
    .string()
    .required('State is required')
    .oneOf(US_STATES.map(state => state.value), 'Please select a valid state'),
  
  currentProvider: yup
    .string()
    .optional(),
  
  contractEndDate: yup
    .string()
    .optional()
    .test('future-date', 'Date cannot be in the past', value => {
      if (!value) return true;
      return new Date(value) > new Date();
    }),
  
  estimatedMonthlyBill: yup
    .string()
    .optional()
    .test('positive-number', 'Amount must be positive', value => {
      if (!value) return true;
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    })
}).strict();

// Helper function for validation with consistent options
export const validateForm = (data: unknown) => 
  formSchema.validate(data, { 
    abortEarly: false,
    stripUnknown: true 
  });

export type FormData = yup.InferType<typeof formSchema>; 