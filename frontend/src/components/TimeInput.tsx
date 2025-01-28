import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import Tooltip from './Tooltip';

interface TimeOption {
  minutes: number;
  label: string;
  description: string;
}

const timeOptions: TimeOption[] = [
  { minutes: 15, label: '15 min', description: 'urgent' },
  { minutes: 30, label: '30 min', description: 'quick' },
  { minutes: 45, label: '45 min', description: 'leisurely' },
  { minutes: 60, label: '1 hour', description: 'chill' },
  { minutes: 90, label: '1.5 hours', description: 'weekend vibes' },
  { minutes: 120, label: '2 hours', description: 'meal prep' },
];

interface TimeInputProps {
  selectedTime: number | null;
  onChange: (minutes: number) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ selectedTime, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="block text-food-brown font-medium">I have...</label>
        <Tooltip content="Filter recipes by your schedule!">
          <ClockIcon className="w-5 h-5 text-food-sage" />
        </Tooltip>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {timeOptions.map((option) => {
          const isSelected = selectedTime === option.minutes;
          return (
            <button
              key={option.minutes}
              type="button"
              onClick={() => onChange(option.minutes)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium 
                transition-all duration-200 
                ${isSelected ? 'animate-bounce-sm shadow-lg ring-2 ring-food-orange' : ''}
                ${getGradientClass(option.minutes)}
              `}
            >
              <span>{option.label}</span>
              <span className="ml-1 text-xs opacity-75">({option.description})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const getGradientClass = (minutes: number): string => {
  const baseClasses = 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ';
  if (minutes <= 30) {
    return baseClasses + 'bg-primary text-white hover:bg-primary-light';
  } else if (minutes <= 60) {
    return baseClasses + 'bg-food-brown text-white hover:bg-food-brown/90';
  } else {
    return baseClasses + 'bg-secondary text-white hover:bg-secondary/90';
  }
};

export default TimeInput; 