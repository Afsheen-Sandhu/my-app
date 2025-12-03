import React, { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  children: ReactNode | ((args: { close: () => void }) => ReactNode);
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, children, className }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div className={`relative ${className || ""}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-md border shadow-sm text-base-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        <span>{label}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-30">
          {typeof children === 'function' ? children({ close }) : children}
        </div>
      )}
    </div>
  );
};
