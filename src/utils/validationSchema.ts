import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .matches(
      /^\+?[\d\s-]{10,}$/,
      'Please enter a valid phone number'
    )
    .optional(),
  
  message: yup
    .string()
    .optional()
    .max(500, 'Message must be less than 500 characters'),
});

export type FormData = yup.InferType<typeof formSchema>; 