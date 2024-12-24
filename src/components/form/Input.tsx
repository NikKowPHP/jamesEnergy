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
    const baseClasses = `
      w-full px-3 py-2 rounded-md border
      focus:outline-none focus:ring-2 focus:ring-offset-2
      ${error 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-gray-300 focus:ring-indigo-500'
      }
    `;

    switch (type) {
      case 'select':
        return (
          <select
            id={id}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
            required={required}
            className={baseClasses}
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
            placeholder={placeholder}
            min={new Date().toISOString().split('T')[0]}
            className={baseClasses}
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
            placeholder={placeholder}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div className="mb-4 group relative">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1 text-start"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      
      {/* Helper text tooltip */}
      {helperText && (
        <div className="absolute left-0 -bottom-1 transform translate-y-full opacity-0 
                      group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 max-w-xs">
            {helperText}
            {/* Tooltip arrow */}
            <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45" />
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}; 