import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-base-content text-sm font-normal placeholder:text-base-content/40 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 placeholder:font-normal ${className}`}
        {...props}
      />
    );
  }
);
