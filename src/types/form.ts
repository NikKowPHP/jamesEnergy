export interface FormState {
  formData: Record<string, any>;
  loading: boolean;
  error: string | null;
}

export type FormAction =
  | { type: "SET_FIELD"; payload: { field: string; value: any } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_INITIAL_DATA"; payload: Record<string, any> }
  | { type: "RESET_FORM" };

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "number";
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface FormContextProps {
  state: FormState;
  setField: (field: string, value: any) => void;
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 