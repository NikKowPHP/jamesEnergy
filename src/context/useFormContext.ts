import { useContext } from "react";
import { FormContextProps } from "@types/form";
import { FormContext } from "./FormProvider";

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}; 