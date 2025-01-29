import React, { useState, FormEvent, useEffect } from 'react';
import AutocompleteInput from './AutocompleteInput';
import TimeInput from './TimeInput';
import KitchenTools from './KitchenTools';
import BudgetInput from './BudgetInput';
import { MagnifyingGlassIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Tooltip from './Tooltip';

interface DietaryPreference {
  id: string;
  label: string;
  description?: string;
}

const dietaryPreferences: DietaryPreference[] = [
  { id: 'none', label: 'None' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { 
    id: 'halal', 
    label: 'Halal',
    description: 'No pork, alcohol, and only halal-certified meat.'
  },
  { 
    id: 'kosher', 
    label: 'Kosher',
    description: 'Follows Jewish dietary laws, including meat and dairy separation.'
  }
];

interface IngredientFormProps {
  onSubmit: (ingredients: string[], preferences: string[], time: number, appliances: string[], budget: number | null) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [budget, setBudget] = useState<number | ''>('');
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    let completedSteps = 0;
    
    if (ingredients.trim().length > 0) {
      completedSteps++;
      completedSteps++; // Automatically complete appliances step
    }
    
    if (selectedTime !== null) {
      completedSteps++;
    }
    
    if (selectedPreferences.length > 0) {
      completedSteps++;
    }

    if (typeof budget === 'number' && budget > 0) {
      completedSteps++;
    }
    
    setCurrentStep(completedSteps);
  }, [ingredients, selectedTime, selectedPreferences, budget]);

  const togglePreference = (preferenceId: string): void => {
    if (preferenceId === 'none') {
      setSelectedPreferences([]);
      return;
    }
    
    setSelectedPreferences((prev: string[]) => {
      if (prev.includes(preferenceId)) {
        return prev.filter(id => id !== preferenceId);
      } else {
        return [...prev.filter(id => id !== 'none'), preferenceId];
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      alert('Please enter some ingredients');
      return;
    }
    
    if (selectedTime === null) {
      alert('Please select a cooking time');
      return;
    }

    const ingredientList = ingredients.split(',').map(i => i.trim());
    onSubmit(
      ingredientList, 
      selectedPreferences, 
      selectedTime, 
      selectedAppliances,
      typeof budget === 'number' ? budget : null
    );
  };

  const isSectionEnabled = (section: 'ingredients' | 'appliances' | 'time' | 'preferences' | 'budget'): boolean => {
    switch (section) {
      case 'ingredients':
        return true;
      case 'appliances':
        return ingredients.trim().length > 0;
      case 'time':
        return ingredients.trim().length > 0;
      case 'preferences':
        return ingredients.trim().length > 0 && selectedTime !== null;
      case 'budget':
        return ingredients.trim().length > 0 && selectedTime !== null && selectedPreferences.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 animate-fade-in relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-food-orange/10 to-food-peach/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-food-orange/10 to-food-peach/10 rounded-full blur-2xl" />
      
      {/* New Progress Bar Style */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-xs text-food-brown/60">
          <span>Ingredients</span>
          <span>Appliances</span>
          <span>Time</span>
          <span>Preferences</span>
          <span>Budget</span>
        </div>
        <div className="relative h-1 bg-food-cream rounded-full">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-food-orange to-food-peach rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div>
          <label className="block text-dark font-semibold mb-2 text-lg">
            What ingredients do you have?
          </label>
          <AutocompleteInput
            value={ingredients}
            onChange={setIngredients}
            placeholder="e.g. ramen, eggs, cheese"
            className="w-full px-4 py-3 bg-neutral rounded-xl border-2 border-primary/10 focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('appliances') ? 'opacity-50 pointer-events-none' : ''}`}>
          <KitchenTools 
            selectedAppliances={selectedAppliances}
            onChange={setSelectedAppliances}
          />
        </div>

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('time') ? 'opacity-50 pointer-events-none' : ''}`}>
          <TimeInput selectedTime={selectedTime} onChange={setSelectedTime} />
        </div>

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('preferences') ? 'opacity-50 pointer-events-none' : ''}`}>
          <label className="block text-dark font-semibold mb-3 text-lg">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryPreferences.map(preference => (
              <div key={preference.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => togglePreference(preference.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedPreferences.includes(preference.id)
                      ? 'bg-food-orange text-white shadow-md hover:bg-food-orange/90'
                      : 'bg-neutral text-dark border-2 border-food-orange/10 hover:border-food-orange'
                  }`}
                >
                  {preference.label}
                </button>
                {preference.description && (
                  <Tooltip content={preference.description}>
                    <InformationCircleIcon className="w-4 h-4 ml-1 text-food-brown/60 hover:text-food-orange cursor-help" />
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('budget') ? 'opacity-50 pointer-events-none' : ''}`}>
          <BudgetInput value={budget} onChange={setBudget} />
        </div>

        <button
          type="submit"
          className="group w-full py-4 px-6 bg-primary text-white rounded-xl font-bold text-lg shadow-lg 
            hover:bg-primary-light transition-all duration-300 hover:-translate-y-0.5 
            focus:ring-4 focus:ring-primary/20 relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2">
            <MagnifyingGlassIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="group-hover:tracking-wide transition-all duration-300">
              Find Recipes
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-food-orange/0 via-white/10 to-food-orange/0 
            group-hover:translate-x-full -translate-x-full transition-transform duration-1000">
          </div>
        </button>
      </form>
    </div>
  );
};

export default IngredientForm;