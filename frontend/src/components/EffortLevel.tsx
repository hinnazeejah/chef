import React from 'react';
import Tooltip from './Tooltip';

interface EffortLevelProps {
  value: number;
  onChange: (value: number) => void;
}

const EffortLevel: React.FC<EffortLevelProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="block text-food-brown font-medium">How ambitious are you?</label>
        <Tooltip content="We'll adjust recipe complexity to match your energy level!">
          <span className="cursor-help text-food-sage">ℹ️</span>
        </Tooltip>
      </div>
      
      <div className="relative pt-1">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-food-cream to-food-orange rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-food-brown mt-2">
          <div className="flex items-center gap-1">
            <span>😴</span>
            <span className="hidden sm:inline">Lazy</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👩‍🍳</span>
            <span className="hidden sm:inline">Home Chef</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortLevel; 