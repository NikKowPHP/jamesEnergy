export interface FormState {
  formData: Record<string, string>;
  loading: boolean;
  error: string | null;
}
export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];


export const formFields: FormField[] = [
  {
    id: 'businessName',
    label: 'Business Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your registered business name',
    helperText: 'Enter the name of your registered business',
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email address',
    helperText: 'We\'ll send your quote to this email',
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    placeholder: '(555) 555-5555',
    helperText: 'Enter your business phone number',
    validation: {
      pattern: /^\+?[\d\s-()]{10,}$/,
      message: 'Please enter a valid phone number',
    },
  },
  {
    id: 'address',
    label: 'Address',
    type: 'autocomplete',
    required: true,
    placeholder: 'Enter your business address',
    helperText: 'Enter the address where your business is located',
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    required: true,
    placeholder: 'Enter your city',
    helperText: 'Enter the city where your business is located',
  },
  {
    id: 'state',
    label: 'State',
    type: 'select',
    required: true,
    options: US_STATES,
    placeholder: 'Select a state',
    helperText: 'Select the state where your business is located',
  },
  {
    id: 'currentProvider',
    label: 'Current Energy Provider',
    type: 'text',
    placeholder: 'e.g. Xcel Energy',
    helperText: 'Optional - Your current energy provider',
  },
  {
    id: 'contractEndDate',
    label: 'Contract End Date',
    type: 'date',
    placeholder: 'MM/DD/YYYY',
    helperText: 'Optional - When does your current contract end?',
  },
  {
    id: 'estimatedMonthlyBill',
    label: 'Estimated Monthly Bill',
    type: 'text',
    placeholder: '$0.00',
    helperText: 'Optional - Your average monthly energy bill',
  },
];

export type FormAction =
  | { type: "SET_FIELD"; payload: { field: string; value: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_INITIAL_DATA"; payload: Record<string, string> }
  | { type: "RESET_FORM" };

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select" | "autocomplete";
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    message?: string;
  };
  helperText?: string;
  placeholder?: string;
}

export interface FormContextProps {
  state: FormState;
  setField: (field: string, value: string) => void;
  submitForm: () => Promise<void>;
}

export interface InputProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
} 



