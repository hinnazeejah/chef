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
  { minutes: 90, label: '1.5 hours', description: 'meal prep' },
  { minutes: 120, label: '2 hours', description: 'weekend vibes' },
  { minutes: 240, label: 'All day', description: 'no rush' },
];

interface TimeInputProps {
  selectedTime: number | null;
  onChange: (minutes: number | null) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ selectedTime, onChange }) => {
  const handleTimeClick = (minutes: number) => {
    if (selectedTime === minutes) {
      onChange(null);
    } else {
      onChange(minutes);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <label className="block text-dark font-semibold text-lg">
            How much time do you have?
          </label>
          <Tooltip content="Filter recipes by your schedule!">
            <ClockIcon className="w-5 h-5 text-food-sage" />
          </Tooltip>
        </div>
        <p className="text-sm text-food-brown/60">
          Includes prep & cook time. Choose what works for you!
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {timeOptions.map((option) => {
          const isSelected = selectedTime === option.minutes;
          return (
            <button
              key={option.minutes}
              type="button"
              onClick={() => handleTimeClick(option.minutes)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium 
                transition-all duration-200 
                hover:scale-105 hover:shadow-md
                active:scale-95
                ${isSelected ? 'animate-bounce-sm shadow-lg ring-2 ring-food-orange' : ''}
                ${getGradientClass(option.minutes)}
                hover:brightness-105 hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-food-orange/50
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
  if (minutes <= 15) return 'bg-gradient-to-r from-red-100 to-orange-100 text-red-700';
  if (minutes <= 30) return 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700';
  if (minutes <= 60) return 'bg-gradient-to-r from-green-100 to-food-sage/30 text-green-700';
  if (minutes <= 120) return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700';
  return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700';
};

export default TimeInput; 