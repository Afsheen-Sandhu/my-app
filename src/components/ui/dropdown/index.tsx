import React, { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  children: ReactNode | ((args: { close: () => void }) => ReactNode);
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  className,
  variant = "outline",
}) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const baseStyles =
    "flex items-center justify-between w-full rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    outline:
      "border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
  };

  const buttonClass = `${baseStyles} ${variants[variant]} px-4 py-2 shadow-sm`;

  return (
    <div className={`relative w-full ${className || ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={buttonClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        <span>{label}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 flex-shrink-0 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-full bg-base-100 text-base-content border border-base-300 rounded-md shadow-xl z-50">
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
};
