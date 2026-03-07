import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        className="w-5 h-5 rounded-md border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition duration-200"
        {...props}
      />
      {label && <label className="text-gray-700 cursor-pointer font-medium">{label}</label>}
    </div>
  );
};
