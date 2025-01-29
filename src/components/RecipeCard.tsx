import React from 'react';
import { Recipe, RecipeDetails } from '../types';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useSavedRecipes } from '../contexts/SavedRecipesContext';

interface RecipeCardProps {
  recipe: Recipe | RecipeDetails;
  onViewRecipe: (id: string) => void;
  showSaveButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onViewRecipe, 
  showSaveButton = true,
}) => {
  const { saveRecipe, removeRecipe, isSaved } = useSavedRecipes();
  const saved = isSaved(recipe.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeRecipe(recipe.id);
    } else {
      // Cast recipe to RecipeDetails if it's not already
      const recipeDetails = recipe as RecipeDetails;
      if (!('missingIngredients' in recipe)) {
        recipeDetails.missingIngredients = [];
        recipeDetails.totalCost = recipe.estimatedCost || 0;
      }
      saveRecipe(recipeDetails);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {showSaveButton && (
            <button
              onClick={handleSaveToggle}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
            >
              {saved ? (
                <BookmarkSolid className="w-5 h-5 text-food-orange" />
              ) : (
                <BookmarkOutline className="w-5 h-5 text-food-orange" />
              )}
            </button>
          )}
          <div className="flex gap-1">
            {recipe.dietaryTags?.map(tag => (
              <span key={tag} className="bg-white/90 backdrop-blur-sm text-food-brown text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-food-brown">{recipe.title}</h3>
        <p className="text-food-sage mt-2 text-sm">{recipe.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-food-orange font-medium">
            ~${recipe.estimatedCost}/serving
          </p>
          <p className="text-sm text-food-brown/60">
            {recipe.prepTime}
          </p>
        </div>
        <button
          onClick={() => onViewRecipe(recipe.id)}
          className="mt-4 w-full bg-food-cream text-food-brown px-4 py-2 rounded-lg hover:bg-food-peach transition-colors duration-200"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;