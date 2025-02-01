import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Appliance {
  id: string;
  label: string;
  icon: string;
}

const appliances: Appliance[] = [
  { id: 'microwave', label: 'Microwave', icon: '' },
  { id: 'blender', label: 'Blender', icon: '' },
  { id: 'airfryer', label: 'Air Fryer', icon: '' },
  { id: 'stovetop', label: 'Stovetop Only', icon: '' },
  { id: 'toaster', label: 'Toaster', icon: '' },
  { id: 'ricecooker', label: 'Rice Cooker', icon: '' }
];

interface KitchenToolsProps {
  selectedAppliances: string[];
  onChange: (appliances: string[]) => void;
}

const KitchenTools: React.FC<KitchenToolsProps> = ({ selectedAppliances, onChange }) => {
  return (
    <div>
      <label className="block text-dark font-semibold mb-2 text-lg">
        What appliances do you have?
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {appliances.map(appliance => (
          <button
          key={appliance.id}
          type="button"
          onClick={() => {
            const newSelection = selectedAppliances.includes(appliance.id)
              ? selectedAppliances.filter(id => id !== appliance.id)
              : [...selectedAppliances, appliance.id];
            onChange(newSelection);
          }}
          className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between
            ${selectedAppliances.includes(appliance.id)
              ? 'bg-food-orange text-white shadow-md'
              : 'bg-white border-2 border-food-orange/20 hover:border-food-orange text-food-brown'
            }`}
        >
          {appliance.label}
          {selectedAppliances.includes(appliance.id) && (
            <CheckIcon className="w-5 h-5" />
          )}
        </button>
        ))}
      </div>
      <p className="text-sm text-food-brown/60 mt-2">
        Select appliances you have. If none selected, all will be considered.
      </p>
    </div>
  );
};

export default KitchenTools; 