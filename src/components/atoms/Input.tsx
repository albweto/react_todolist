import React from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  error?: boolean;
};

export const Input: React.FC<InputProps> = ({ variant = "primary", size = "md", error = false, ...props }) => {
  const base = "rounded-lg border transition duration-200 focus:outline-none w-full bg-white";
  
  const sizeMap = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const styles = error
    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500"
    : variant === "primary"
    ? "border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500"
    : "border-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:border-gray-400";

  return <input className={`${base} ${sizeMap[size]} ${styles}`} {...props} />;
};
