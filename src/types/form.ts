export interface FormState {
  formData: Record<string, string>;
  loading: boolean;
  error: string | null;
}


const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  // ... add all US states
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