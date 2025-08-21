
"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-text/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface rounded-lg shadow-modal max-w-md w-full max-h-[80vh] overflow-auto animate-slide-up">
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-md border-b border-text/10">
            <h2 className="headline">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-text/5 rounded-md transition-colors duration-fast"
            >
              <X size={20} className="text-muted" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-md">
          {children}
        </div>
      </div>
    </div>
  );
}
