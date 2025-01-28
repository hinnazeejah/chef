import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import Tooltip from './Tooltip';

interface Appliance {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const appliances: Appliance[] = [
  { id: 'microwave', label: 'Microwave', icon: '🍔', description: 'Quick meals and reheating' },
  { id: 'blender', label: 'Blender', icon: '🥤', description: 'Smoothies and sauces' },
  { id: 'airfryer', label: 'Air Fryer', icon: '🍟', description: 'Crispy cooking without oil' },
  { id: 'stovetop', label: 'Stovetop Only', icon: '🍳', description: 'Basic cooking setup' },
  { id: 'toaster', label: 'Toaster', icon: '🍞', description: 'Quick breakfast' },
  { id: 'ricecooker', label: 'Rice Cooker', icon: '🍚', description: 'Perfect rice every time' },
];

interface KitchenToolsProps {
  selectedAppliances: string[];
  onChange: (appliances: string[]) => void;
}

const KitchenTools: React.FC<KitchenToolsProps> = ({ selectedAppliances, onChange }) => {
  const toggleAppliance = (applianceId: string) => {
    onChange(
      selectedAppliances.includes(applianceId)
        ? selectedAppliances.filter(id => id !== applianceId)
        : [...selectedAppliances, applianceId]
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="block text-food-brown font-medium">What appliances do you own?</label>
        <Tooltip content="We'll only show recipes that match your tools!">
          <span className="cursor-help text-food-sage">ℹ️</span>
        </Tooltip>
      </div>
      
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
        {appliances.map((appliance) => {
          const isSelected = selectedAppliances.includes(appliance.id);
          return (
            <button
              key={appliance.id}
              onClick={() => toggleAppliance(appliance.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium 
                transition-all duration-200 flex items-center gap-2
                ${isSelected 
                  ? 'bg-gradient-to-r from-food-orange to-yellow-500 text-white shadow-md' 
                  : 'bg-gray-100 text-food-brown hover:bg-gray-200'
                }
              `}
            >
              <span>{appliance.icon}</span>
              <span>{appliance.label}</span>
              {isSelected && (
                <CheckIcon className="w-4 h-4 animate-bounce-sm" />
              )}
            </button>
          );
        })}
      </div>
      
      {selectedAppliances.length === 0 && (
        <p className="text-food-sage text-sm">No blender? No problem! We've got recipes for every setup.</p>
      )}
    </div>
  );
};

export default KitchenTools; 