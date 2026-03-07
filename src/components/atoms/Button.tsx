import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", ...props }) => {
  const base = "rounded-lg font-semibold transition duration-200 ease-out flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeMap = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
    ghost: "text-gray-700 hover:bg-gray-100 transition-colors",
  };

  return <button className={`${base} ${sizeMap[size]} ${variants[variant]}`} {...props} />;
};
