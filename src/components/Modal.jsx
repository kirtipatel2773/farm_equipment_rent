import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-2xl border border-agri-border p-6 z-10 max-h-[90vh] overflow-y-auto transform transition-all`}>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-agri-border">
          {title && <h3 className="text-xl font-semibold text-agri-text">{title}</h3>}
          <button
            onClick={onClose}
            className="p-1.5 text-agri-muted hover:text-agri-text hover:bg-gray-100 rounded-lg transition-colors ml-auto"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
