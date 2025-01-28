import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe, Store, Price } from '../types';
import RecipeCard from '../components/RecipeCard';
import StoreList from '../components/StoreList';
import PriceTable from '../components/PriceTable';
import IngredientForm from '../components/IngredientForm';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location. Using default location.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (
    ingredients: string[], 
    preferences: string[], 
    time: number,
    appliances: string[]
  ) => {
    setIsLoading(true);
    setError('');
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock recipe data
      const mockRecipes = [{
        id: '1',
        title: 'Chicken Rice Bowl',
        image: 'https://via.placeholder.com/300',
        prepTime: '30 mins',
        description: 'A delicious chicken and rice bowl',
        dietaryTags: preferences,
        estimatedCost: 15.99,
        missingIngredients: [
          {
            name: 'soy sauce',
            price: 3.99,
            stores: [
              {
                name: 'Local Grocery',
                address: '123 Main St',
                distance: 0.5,
                price: 3.99
              }
            ]
          }
        ],
        totalCost: 15.99
      }];

      navigate('/recipe-results', {
        state: {
          recipes: mockRecipes,
          userIngredients: ingredients,
          preferences: preferences,
          appliances: appliances,
          userLocation: userLocation
        }
      });
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto">
        <IngredientForm onSubmit={handleSubmit} />
      </div>
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
        showResults && (
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
        )
      )}
    </div>
  );
};

export default Home;