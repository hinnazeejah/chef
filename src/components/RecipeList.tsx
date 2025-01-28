import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/index';

interface RecipeListProps {
  recipes: Recipe[];
  onViewRecipe: (id: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onViewRecipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onViewRecipe={onViewRecipe}
        />
      ))}
    </div>
  );
};

export default RecipeList;