import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import RecipeResults from './pages/RecipeResults';
import SavedRecipes from './pages/SavedRecipes';
import { SavedRecipesProvider } from './contexts/SavedRecipesContext';

const App: React.FC = () => {
  return (
    <SavedRecipesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe-results" element={<RecipeResults />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </SavedRecipesProvider>
  );
};

export default App;