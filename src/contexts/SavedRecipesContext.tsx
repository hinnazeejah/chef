import React, { createContext, useContext, useState, useEffect } from 'react';
import { RecipeDetails } from '../types';

interface SavedRecipesContextType {
  savedRecipes: RecipeDetails[];
  saveRecipe: (recipe: RecipeDetails) => void;
  removeRecipe: (recipeId: string) => void;
  isSaved: (recipeId: string) => boolean;
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

export const SavedRecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState<RecipeDetails[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const saveRecipe = (recipe: RecipeDetails) => {
    setSavedRecipes(prev => [...prev, recipe]);
  };

  const removeRecipe = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const isSaved = (recipeId: string) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, saveRecipe, removeRecipe, isSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (context === undefined) {
    throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
  }
  return context;
}; 