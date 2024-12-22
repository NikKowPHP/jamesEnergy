import * as yup from 'yup';

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  // ... add all US states
];

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
    .date()
    .optional()
    .min(new Date(), 'Date cannot be in the past'),
  
  estimatedMonthlyBill: yup
    .number()
    .optional()
    .positive('Amount must be positive')
    .transform((value) => (isNaN(value) ? undefined : value))
}).strict();

// Helper function for validation with consistent options
export const validateForm = (data: unknown) => 
  formSchema.validate(data, { 
    abortEarly: false,
    stripUnknown: true 
  });

export type FormData = yup.InferType<typeof formSchema>; 