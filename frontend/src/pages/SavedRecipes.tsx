import React from 'react';
import { useSavedRecipes } from '../contexts/SavedRecipesContext';
import RecipeCard from '../components/RecipeCard';

const SavedRecipes: React.FC = () => {
  const { savedRecipes, removeRecipe } = useSavedRecipes();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-food-brown mb-8">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewRecipe={() => {}}
              showSaveButton={false}
              onRemove={() => removeRecipe(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;