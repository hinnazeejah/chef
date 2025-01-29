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
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' }
];

interface IngredientFormProps {
  onSubmit: (
    ingredients: string[], 
    preferences: string[],
    appliances: string[],
    timeLimit: number,
    budget: number
  ) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [appliances, setAppliances] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | ''>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    let completedSteps = 0;
    
    if (ingredientsList.length > 0) {
      completedSteps++;
      completedSteps++; // Automatically complete appliances step
    }
    
    if (timeLimit !== null) {
      completedSteps++;
    }
    
    if (preferences.length > 0) {
      completedSteps++;
    }

    if (budget !== 0) {
      completedSteps++;
    }
    
    setCurrentStep(completedSteps);
  }, [ingredientsList, timeLimit, preferences, budget]);

  const togglePreference = (preferenceId: string): void => {
    if (preferenceId === 'none') {
      setPreferences(['none']);
      return;
    }
    
    setPreferences((prev: string[]) => {
      if (prev.includes('none')) {
        return [preferenceId];
      }
      
      if (prev.includes(preferenceId)) {
        return prev.filter(id => id !== preferenceId);
      } else {
        return [...prev, preferenceId];
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (timeLimit === null) return;
    
    onSubmit(
      ingredientsList,
      preferences,
      appliances,
      timeLimit,
      budget || 0
    );
  };

  const handleIngredientsChange = (value: string) => {
    setIngredients(value);
    setIngredientsList(value.split(',').map(i => i.trim()).filter(i => i));
  };

  const isSectionEnabled = (section: 'ingredients' | 'appliances' | 'time' | 'preferences' | 'budget'): boolean => {
    switch (section) {
      case 'ingredients':
        return true;
      case 'appliances':
        return ingredientsList.length > 0;
      case 'time':
        return ingredientsList.length > 0;
      case 'preferences':
        return ingredientsList.length > 0 && timeLimit !== null;
      case 'budget':
        return ingredientsList.length > 0 && timeLimit !== null && preferences.length > 0;
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
            onChange={handleIngredientsChange}
            placeholder="e.g. ramen, eggs, cheese"
            className="w-full px-4 py-3 bg-neutral rounded-xl border-2 border-primary/10 focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('appliances') ? 'opacity-50 pointer-events-none' : ''}`}>
          <KitchenTools 
            selectedAppliances={appliances}
            onChange={setAppliances}
          />
        </div>

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('time') ? 'opacity-50 pointer-events-none' : ''}`}>
          <TimeInput 
            selectedTime={timeLimit || 0} 
            onChange={(minutes: number | null) => setTimeLimit(minutes)}
          />
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
                    preferences.includes(preference.id)
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
          <BudgetInput 
            value={budget} 
            onChange={(value: number | '') => setBudget(value)}
          />
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