// src/components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        variant === "default" ? "bg-blue-600 text-white" : "border border-blue-600 text-blue-600"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
