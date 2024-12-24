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
  options,
  placeholder,
  onChange
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={id}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
            required={required}
            className={`
              w-full px-3 py-2 rounded-md border
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
              }
            `}
          >
            <option value="">Select a state...</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <input
            id={id}
            type="date"
            value={value}
            onChange={onChange}
            required={required}
            placeholder={helperText}
            min={new Date().toISOString().split('T')[0]}
            className={`
              w-full px-3 py-2 rounded-md border
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
              }
            `}
          />
        );
      
      default:
        return (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={helperText}
            className={`
              w-full px-3 py-2 rounded-md border
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
              }
            `}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1 text-start"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      
      {/* {helperText && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )} */}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}; 