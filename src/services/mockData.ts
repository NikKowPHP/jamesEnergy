export const mockFormFields = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export const mockInitialData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'Hello, this is a pre-filled message.',
};


export const mockApiResponses = {
  success: {
    data: { success: true, message: 'Form submitted successfully' },
    error: null,
  },
  error: {
    data: null,
    error: 'Something went wrong with the submission',
  },
}; 