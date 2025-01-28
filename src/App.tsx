import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import RecipeResults from './pages/RecipeResults';
import { SavedRecipesProvider } from './contexts/SavedRecipesContext';

function App() {
  return (
    <SavedRecipesProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe-results" element={<RecipeResults />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SavedRecipesProvider>
  );
}

export default App;