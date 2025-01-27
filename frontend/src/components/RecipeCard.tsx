import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewRecipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="text-gray-600 mt-2">{recipe.description}</p>
        <p className="text-sm text-gray-500 mt-2">Prep time: {recipe.prepTime}</p>
        <button
          onClick={() => onViewRecipe(recipe.id)}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;