import React, { createContext, useReducer, useEffect } from "react";
import { FormState, FormAction, FormContextProps } from "@/types/form";
import { FormService } from "@services/FormService";

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

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const initialData = await FormService.fetchInitialData();
        dispatch({ type: "SET_INITIAL_DATA", payload: initialData });
      } catch (error) {
        console.error("Error fetching initial data:", error);
        dispatch({ type: "SET_ERROR", payload: "Failed to load initial data" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchInitialData();
  }, []);

  const setField = (field: string, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };

  const submitForm = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await FormService.submit(state.formData);
      dispatch({ type: "RESET_FORM" });
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Submission failed";
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