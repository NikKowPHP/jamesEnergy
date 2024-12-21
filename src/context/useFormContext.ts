import { createContext, useContext } from "react";
import { FormContextProps } from "@/types/form";

export const FormContext = createContext<FormContextProps | undefined>(undefined);
export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}; 