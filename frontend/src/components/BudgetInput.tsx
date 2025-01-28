import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Tooltip from './Tooltip';

interface BudgetInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
}

const BudgetInput: React.FC<BudgetInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange('');
      return;
    }

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange(numValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="block text-dark font-semibold mb-2 text-lg">
          Enter Your Budget
        </label>
        <Tooltip content="Enter your budget to filter recipes that fit your needs">
          <QuestionMarkCircleIcon className="w-5 h-5 text-food-sage" />
        </Tooltip>
      </div>
      
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark">$</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={handleChange}
          placeholder="e.g., 20"
          className="w-full px-4 py-2 pl-8 bg-white rounded-xl border-2 border-food-orange/20 focus:border-food-orange focus:outline-none"
        />
      </div>
    </div>
  );
};

export default BudgetInput; 