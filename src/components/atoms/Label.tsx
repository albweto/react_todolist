import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Label: React.FC<LabelProps> = ({ variant = "primary", size = "md", className = "", ...props }) => {
  const variants = {
    primary: "text-gray-800 font-semibold",
    secondary: "text-gray-500 font-normal",
    success: "text-green-600 font-semibold",
    danger: "text-red-600 font-semibold",
  };

  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return <label className={`${variants[variant]} ${sizeMap[size]} ${className}`} {...props} />;
};
