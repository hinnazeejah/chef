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
  { id: 'microwave', label: 'Microwave', icon: '', description: 'Quick meals and reheating' },
  { id: 'blender', label: 'Blender', icon: '', description: 'Smoothies and sauces' },
  { id: 'airfryer', label: 'Air Fryer', icon: '', description: 'Crispy cooking without oil' },
  { id: 'stovetop', label: 'Stovetop Only', icon: '', description: 'Basic cooking setup' },
  { id: 'toaster', label: 'Toaster', icon: '', description: 'Quick breakfast' },
  { id: 'ricecooker', label: 'Rice Cooker', icon: '', description: 'Perfect rice every time' },
  { id: 'all', label: 'I have everything', icon: '', description: 'All appliances available' },
];

interface KitchenToolsProps {
  selectedAppliances: string[];
  onChange: (appliances: string[]) => void;
}

const KitchenTools: React.FC<KitchenToolsProps> = ({ selectedAppliances, onChange }) => {
  const toggleAppliance = (applianceId: string) => {
    if (applianceId === 'all') {
      // If all appliances are currently selected, deselect everything
      if (selectedAppliances.length === appliances.length - 1) {
        onChange([]);
      } else {
        // Otherwise, select all appliances except 'all'
        onChange(appliances.filter(a => a.id !== 'all').map(a => a.id));
      }
      return;
    }

    // If selecting individual appliance, add/remove it from selection
    const newSelection = selectedAppliances.includes(applianceId)
      ? selectedAppliances.filter(id => id !== applianceId)
      : [...selectedAppliances, applianceId];
    
    onChange(newSelection);
  };

  return (
    <div className="space-y-3">
      <label className="block text-dark font-semibold mb-2 text-lg">
        What appliances do you own?
      </label>
      
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
        {appliances.map((appliance) => {
          const isSelected = appliance.id === 'all' 
            ? selectedAppliances.length === appliances.length - 1 
            : selectedAppliances.includes(appliance.id);
          return (
            <button
              key={appliance.id}
              type="button"
              onClick={() => toggleAppliance(appliance.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium 
                transition-all duration-200 flex items-center gap-2
                ${isSelected 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 text-food-brown hover:bg-gray-200'
                }
                ${appliance.id === 'all' ? 'col-span-2 md:w-full justify-center' : ''}
              `}
            >
              <span>{appliance.label}</span>
              {isSelected && (
                <CheckIcon className="w-4 h-4 animate-bounce-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenTools; 