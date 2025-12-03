"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "../button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "2xl",
  showCloseButton = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md">
      <div
        ref={containerRef}
        className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[95vh] sm:max-h-[90vh] bg-base-100/95 backdrop-blur-sm text-base-content rounded-lg sm:rounded-2xl shadow-2xl flex flex-col border border-base-300/50`}
      >
        {title && (
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-base-200 border-b flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              {title}
            </h2>
          </div>
        )}

        {showCloseButton && (
          <Button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 btn btn-circle btn-ghost btn-sm hover:bg-base-200"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}

        <div className="p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
