import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import RecipeResults from './pages/RecipeResults';
import CreateRecipe from './pages/CreateRecipe';
import { SavedRecipesProvider } from './contexts/SavedRecipesContext';

function App() {
  return (
    <SavedRecipesProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/recipe-results" element={<RecipeResults />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SavedRecipesProvider>
  );
}

export default App;