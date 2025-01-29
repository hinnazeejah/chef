import React from 'react';
import { useSavedRecipes } from '../contexts/SavedRecipesContext';
import RecipeCard from '../components/RecipeCard';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const SavedRecipes: React.FC = () => {
  const { savedRecipes, removeRecipe } = useSavedRecipes();

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-food-brown">Saved Recipes</h1>
          <BookmarkIcon className="w-6 h-6 text-food-orange" />
        </div>

        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="bg-gray-50 rounded-xl p-8 max-w-md">
            <BookmarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No saved recipes yet.
            </p>
            <p className="text-gray-500 mt-2">
              Your favorite recipes will appear here once you save them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;