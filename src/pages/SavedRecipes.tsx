import React from 'react';
import { useSavedRecipes } from '../contexts/SavedRecipesContext';
import RecipeCard from '../components/RecipeCard';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SavedRecipes: React.FC = () => {
  const { savedRecipes } = useSavedRecipes();
  const navigate = useNavigate();

  const handleViewRecipe = (id: string) => {
    // Handle viewing the recipe
    navigate(`/recipe/${id}`);
  };

  if (savedRecipes.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <div className="relative inline-block">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinderela font-normal text-food-orange mb-2 tracking-tight">
                  Saved Recipes
                </h1>
              </div>
              <p className="text-food-brown/60 text-base md:text-lg mt-2">
                Your collection of favorite recipes!
              </p>
              <div className="absolute inset-x-0 -bottom-4">
                <div className="h-px bg-gradient-to-r from-transparent via-food-orange/20 to-transparent" />
              </div>
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
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinderela font-normal text-food-orange mb-2 tracking-tight">
                Saved Recipes
              </h1>
            </div>
            <p className="text-food-brown/60 text-base md:text-lg mt-2">
              Your collection of favorite recipes
            </p>
            <div className="absolute inset-x-0 -bottom-4">
              <div className="h-px bg-gradient-to-r from-transparent via-food-orange/20 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
            {savedRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onViewRecipe={handleViewRecipe}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedRecipes;