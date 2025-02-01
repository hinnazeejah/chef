import React from 'react';
import { Recipe, RecipeDetails } from '../types';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useSavedRecipes } from '../contexts/SavedRecipesContext';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: Recipe | RecipeDetails;
  onViewRecipe: (id: string) => void;
  showSaveButton?: boolean;
  showDietaryTags?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onViewRecipe, 
  showSaveButton = true,
  showDietaryTags = true,
}) => {
  const { saveRecipe, removeRecipe, isSaved } = useSavedRecipes();
  const saved = isSaved(recipe.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeRecipe(recipe.id);
    } else {
      const recipeDetails = recipe as RecipeDetails;
      if (!('missingIngredients' in recipe)) {
        recipeDetails.missingIngredients = [];
        recipeDetails.totalCost = recipe.estimatedCost || 0;
      }
      saveRecipe(recipeDetails);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative"
    >
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {showSaveButton && (
        <button
          onClick={handleSaveToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 hover:scale-105 shadow-md"
        >
          {saved ? (
            <BookmarkSolid className="w-5 h-5 text-food-orange" />
          ) : (
            <BookmarkOutline className="w-5 h-5 text-food-orange" />
          )}
        </button>
      )}

      {showDietaryTags && (
        <div className="absolute top-4 left-4 flex gap-1">
          {recipe.dietaryTags?.map(tag => (
            <span key={tag} className="bg-white/90 backdrop-blur-sm text-food-brown text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="absolute inset-x-4 bottom-4 flex justify-between items-end">
        <h3 className="text-xl font-semibold text-white max-w-[60%] leading-tight">
          {recipe.title}
        </h3>
        
        <button 
          onClick={() => onViewRecipe(recipe.id)}
          className="px-4 py-1.5 bg-food-orange text-white text-sm font-medium rounded-full
            hover:bg-food-orange/90 transform hover:scale-105 transition-all duration-300
            shadow-md hover:shadow-lg"
        >
          View Recipe
        </button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;