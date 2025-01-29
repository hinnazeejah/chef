import React, { useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  autoHideDuration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onClose,
  autoHideDuration = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg
        border border-primary/10 flex items-center gap-2 group hover:bg-white
        transition-all duration-300">
        <ExclamationCircleIcon className="w-5 h-5 text-primary/60" />
        <p className="text-sm font-medium text-food-brown/80">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage; 