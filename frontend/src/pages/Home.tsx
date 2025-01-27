import React, { useState } from 'react';
import axios from 'axios';
import { Recipe, Store, Price } from '../types';
import RecipeCard from '../components/RecipeCard';
import StoreList from '../components/StoreList';
import PriceTable from '../components/PriceTable';
import IngredientForm from '../components/IngredientForm';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (ingredients: string[], preferences: string[]) => {
    setIsLoading(true);
    setError('');
    try {
      const recipesResponse = await axios.get('/api/recipes', {
        params: { ingredients, preferences }
      });
      setRecipes(recipesResponse.data);
      const storesResponse = await axios.get('/api/stores');
      setStores(storesResponse.data);
      const pricesResponse = await axios.get('/api/prices', {
        params: { ingredients }
      });
      setPrices(pricesResponse.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <IngredientForm onSubmit={handleSubmit} />
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewRecipe={(id) => console.log('View recipe:', id)}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StoreList stores={stores} />
            <PriceTable prices={prices} isLoading={isLoading} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;