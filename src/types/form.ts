export interface FormState {
  formData: Record<string, string>;
  loading: boolean;
  error: string | null;
}

export type FormAction =
  | { type: "SET_FIELD"; payload: { field: string; value: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_INITIAL_DATA"; payload: Record<string, string> }
  | { type: "RESET_FORM" };

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select";
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