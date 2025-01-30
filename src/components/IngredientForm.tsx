import React, { useState, FormEvent, useEffect } from 'react';
import AutocompleteInput from './AutocompleteInput';
import TimeInput from './TimeInput';
import KitchenTools from './KitchenTools';
import BudgetInput from './BudgetInput';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface MealType {
  id: string;
  label: string;
  icon?: string;
}

const mealTypes: MealType[] = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'any', label: 'Any Meal' }
];

interface IngredientFormProps {
  onSubmit: (
    ingredients: string[], 
    preferences: string[],
    appliances: string[],
    timeLimit: number,
    budget: number,
    mealType: string
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
  const [selectedMealType, setSelectedMealType] = useState<string>('any');

  useEffect(() => {
    let completedSteps = 0;
    
    if (ingredientsList.length > 0) {
      completedSteps++;
    }
    
    if (selectedMealType !== '') {
      completedSteps++;
    }
    
    if (appliances.length > 0) {
      completedSteps++;
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
  }, [ingredientsList, selectedMealType, appliances, timeLimit, preferences, budget]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (timeLimit === null) return;
    
    onSubmit(
      ingredientsList,
      preferences,
      appliances,
      timeLimit,
      budget as number,
      selectedMealType
    );
  };

  const handleIngredientsChange = (value: string) => {
    setIngredients(value);
    setIngredientsList(value.split(',').map(i => i.trim()).filter(i => i));
  };

  const isSectionEnabled = (section: 'ingredients' | 'mealType' | 'appliances' | 'time' | 'preferences' | 'budget'): boolean => {
    switch (section) {
      case 'ingredients':
        return true;
      case 'mealType':
        return ingredientsList.length > 0;
      case 'appliances':
        return ingredientsList.length > 0 && selectedMealType !== '';
      case 'time':
        return ingredientsList.length > 0 && selectedMealType !== '';
      case 'preferences':
        return ingredientsList.length > 0 && selectedMealType !== '' && timeLimit !== null;
      case 'budget':
        return ingredientsList.length > 0 && selectedMealType !== '' && timeLimit !== null && preferences.length > 0;
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
          <span>Meal Type</span>
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

        <div className={`transition-opacity duration-300 ${!isSectionEnabled('mealType') ? 'opacity-50 pointer-events-none' : ''}`}>
          <label className="block text-dark font-semibold mb-3 text-lg">
            What type of meal are you looking for?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mealTypes.map(mealType => (
              <button
                key={mealType.id}
                type="button"
                onClick={() => setSelectedMealType(mealType.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                  ${selectedMealType === mealType.id
                    ? 'bg-food-orange text-white shadow-md hover:bg-food-orange/90'
                    : 'bg-white border-2 border-food-orange/20 hover:border-food-orange text-food-brown'
                  }`}
              >
                {mealType.label}
              </button>
            ))}
          </div>
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
            Any dietary preferences?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'none', label: 'None' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'gluten-free', label: 'Gluten-Free' }
            ].map(pref => (
              <button
                key={pref.id}
                type="button"
                onClick={() => setPreferences([pref.id])}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                  ${preferences.includes(pref.id)
                    ? 'bg-food-orange text-white shadow-md hover:bg-food-orange/90'
                    : 'bg-white border-2 border-food-orange/20 hover:border-food-orange text-food-brown'
                  }`}
              >
                {pref.label}
              </button>
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
          className="w-full bg-food-orange text-white px-4 py-3 rounded-xl text-lg font-semibold hover:bg-food-orange/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Find Recipes</span>
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default IngredientForm;