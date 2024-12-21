import React from "react";
import { InputProps } from "@/types/form";

export const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  type = "text",
  error,
  helperText,
  required,
  onChange
}) => (
  <div className="mb-4">
    <label 
      htmlFor={id} 
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`
        w-full px-3 py-2 rounded-md border 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        transition duration-150 ease-in-out
        ${error 
          ? 'border-red-500 focus:ring-red-500' 
          : 'border-gray-300 focus:ring-indigo-500'
        }
      `}
    />
    
    {helperText && (
      <p className="mt-1 text-sm text-gray-500">
        {helperText}
      </p>
    )}
    
    {error && (
      <p className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
); 