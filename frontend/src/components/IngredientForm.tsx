import React, { useState, FormEvent } from 'react';
import AutocompleteInput from './AutocompleteInput';
import TimeInput from './TimeInput';
import KitchenTools from './KitchenTools';

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
  onSubmit: (ingredients: string[], preferences: string[], time: number, appliances: string[]) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);

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
    const ingredientList = ingredients.split(',').map(i => i.trim());
    onSubmit(ingredientList, selectedPreferences, selectedTime || 0, selectedAppliances);
  };

  return (
    <div className="bg-food-cream rounded-2xl p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-food-brown font-medium mb-2">
            What ingredients do you have?
          </label>
          <AutocompleteInput
            value={ingredients}
            onChange={setIngredients}
            placeholder="e.g. ramen, eggs, cheese"
            className="w-full px-4 py-2 bg-white rounded-xl border-2 border-food-orange/20 focus:border-food-orange focus:outline-none"
          />
        </div>

        <KitchenTools 
          selectedAppliances={selectedAppliances}
          onChange={setSelectedAppliances}
        />

        <TimeInput selectedTime={selectedTime} onChange={setSelectedTime} />

        <div>
          <label className="block text-food-brown font-medium mb-3">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryPreferences.map(preference => (
              <button
                key={preference.id}
                type="button"
                onClick={() => togglePreference(preference.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedPreferences.includes(preference.id)
                    ? 'bg-food-orange text-white shadow-md hover:bg-food-orange/90'
                    : 'bg-white text-food-brown border border-food-orange/20 hover:border-food-orange'
                }`}
              >
                {preference.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-food-orange to-food-brown text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
        >
          Find Recipes
        </button>
      </form>
    </div>
  );
};

export default IngredientForm;