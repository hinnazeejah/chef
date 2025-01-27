import React, { useState } from 'react';

interface DietaryPreference {
  id: string;
  label: string;
}

const dietaryPreferences: DietaryPreference[] = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' }
];

interface IngredientFormProps {
  onSubmit: (ingredients: string[], preferences: string[]) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(i => i.trim());
    onSubmit(ingredientList, selectedPreferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ingredients (comma-separated)
        </label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="e.g. chicken, rice, tomatoes"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dietary Preferences
        </label>
        <div className="flex flex-wrap gap-2">
          {dietaryPreferences.map(preference => (
            <button
              key={preference.id}
              type="button"
              onClick={() => togglePreference(preference.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPreferences.includes(preference.id)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {preference.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Find Recipes
      </button>
    </form>
  );
};

export default IngredientForm;