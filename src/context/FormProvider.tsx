import React, { useReducer } from "react";
import { FormState, FormAction, FormContextProps } from "@/types/form";
import { FormService } from "@/services/FormService";
import { FormContext } from "./useFormContext";

const initialState: FormState = {
  formData: {},
  loading: false,
  error: null,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.payload.field]: action.payload.value },
        error: null, // Clear error when field is updated
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_INITIAL_DATA":
      return { ...state, formData: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
}


export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    formData: FormService.loadStoredData()
  });

  const setField = (field: string, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
    FormService.saveData({ ...state.formData, [field]: value });
  };

  const submitForm = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Submit the form data
      await FormService.submit(state.formData);
      
      // Clear form data on success
      dispatch({ type: "RESET_FORM" });
      sessionStorage.removeItem(FormService.storageKey);
      
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while submitting the form";
      
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return Promise.reject(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const contextValue: FormContextProps = {
    state,
    setField,
    submitForm,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}; 