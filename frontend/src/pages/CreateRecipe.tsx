import React, { useState } from 'react';
import IngredientForm from '../components/IngredientForm';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, SparklesIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  // Get user location when component mounts
  React.useEffect(() => {
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
        }
      );
    }
  }, []);

  const handleSubmit = async (
    ingredients: string[], 
    preferences: string[], 
    time: number,
    appliances: string[],
    budget: number | null
  ) => {
    // Mock recipe data for now
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
  };

  return (
    <div className="max-w-2xl mx-auto pt-28 px-6">
      <div className="text-center mb-12 animate-fade-in">
        <div className="relative inline-block">
          <h1 className="text-2xl md:text-3xl font-sans font-bold text-food-orange mb-6 drop-shadow-lg tracking-tight">
            Find Your Perfect Recipe
          </h1>
          <div className="absolute -left-4 -right-4 h-2 bg-gradient-to-r from-transparent via-food-orange/10 to-transparent bottom-1" />
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <SparklesIcon className="w-5 h-5 text-food-orange animate-pulse" />
          <p className="text-food-brown/80 text-lg font-medium">
            Tell us what you have, and we'll do the magic
          </p>
          <SparklesIcon className="w-5 h-5 text-food-orange animate-pulse" />
        </div>
        
        <div className="flex justify-center gap-12 mt-8">
          <div className="flex flex-col items-center gap-2 text-food-brown/70 hover:text-food-orange transition-colors duration-300">
            <div className="p-3 bg-food-cream rounded-full">
              <ClockIcon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Quick Results</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-food-brown/70 hover:text-food-orange transition-colors duration-300">
            <div className="p-3 bg-food-cream rounded-full">
              <ShoppingCartIcon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Cost Efficient</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-food-cream rounded-full opacity-50" />
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-food-cream rounded-full opacity-50" />
        <IngredientForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateRecipe; 