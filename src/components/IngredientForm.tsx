import React, { useState, FormEvent, useEffect } from 'react';
import AutocompleteInput from './AutocompleteInput';
import TimeInput from './TimeInput';
import KitchenTools from './KitchenTools';
import BudgetInput from './BudgetInput';

interface DietaryPreference {
  id: string;
  label: string;
}

const dietaryPreferences: DietaryPreference[] = [
  { id: 'none', label: 'None' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' }
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
    }
    
    if (selectedAppliances.length > 0) {
      completedSteps++;
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
  }, [ingredients, selectedAppliances, selectedTime, selectedPreferences, budget]);

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
    
    // Validation
    if (!ingredients.trim()) {
      alert('Please enter some ingredients');
      return;
    }
    
    if (selectedTime === null) {
      alert('Please select a cooking time');
      return;
    }
    
    if (selectedAppliances.length === 0) {
      alert('Please select at least one appliance');
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

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 animate-fade-in relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-food-orange/10 to-food-peach/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-food-orange/10 to-food-peach/10 rounded-full blur-2xl" />
      
      {/* Updated Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-xs text-food-brown/60">
          <span className={currentStep >= 1 ? "text-food-orange font-medium" : ""}>Ingredients</span>
          <span className={currentStep >= 2 ? "text-food-orange font-medium" : ""}>Appliances</span>
          <span className={currentStep >= 3 ? "text-food-orange font-medium" : ""}>Time</span>
          <span className={currentStep >= 4 ? "text-food-orange font-medium" : ""}>Preferences</span>
          <span className={currentStep >= 5 ? "text-food-orange font-medium" : ""}>Budget</span>
        </div>
        <div className="relative h-1 bg-food-cream rounded-full">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-food-orange to-food-peach rounded-full transition-all duration-500 ease-in-out"
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

        <KitchenTools 
          selectedAppliances={selectedAppliances}
          onChange={setSelectedAppliances}
        />

        <TimeInput selectedTime={selectedTime} onChange={setSelectedTime} />

        <div>
          <label className="block text-dark font-semibold mb-3 text-lg">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryPreferences.map(preference => (
              <button
                key={preference.id}
                type="button"
                onClick={() => togglePreference(preference.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedPreferences.includes(preference.id)
                    ? 'bg-primary text-white shadow-md hover:bg-primary-light'
                    : 'bg-neutral text-dark border-2 border-primary/10 hover:border-primary'
                }`}
              >
                {preference.label}
              </button>
            ))}
          </div>
        </div>

        <BudgetInput value={budget} onChange={setBudget} />

        <button
          type="submit"
          className="w-full py-4 px-6 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-primary-light transition-all duration-200 hover:-translate-y-0.5 focus:ring-4 focus:ring-primary/20"
        >
          Find Recipes
        </button>
      </form>
    </div>
  );
};

export default IngredientForm;