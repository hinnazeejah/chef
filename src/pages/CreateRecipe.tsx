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
    <div className="max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto pt-28 px-4 md:px-6">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-food-orange mb-3 drop-shadow-lg tracking-tight">
          Create Your Perfect Recipe
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-food-orange/40 via-food-orange to-food-orange/40 mx-auto mb-6" />
        <p className="text-food-brown/80 text-lg font-medium mb-8">
          Tell us what you have, and we'll do the magic ✨
        </p>
        
        <div className="grid grid-cols-3 gap-3 md:gap-6 mt-8 px-2">
          <div className="bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <ClockIcon className="w-5 h-5 text-food-orange" />
            </div>
            <h3 className="font-medium text-food-brown text-xs md:text-sm">Quick Results</h3>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <SparklesIcon className="w-5 h-5 text-food-orange" />
            </div>
            <h3 className="font-medium text-food-brown text-xs md:text-sm">AI-Powered</h3>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <ShoppingCartIcon className="w-5 h-5 text-food-orange" />
            </div>
            <h3 className="font-medium text-food-brown text-xs md:text-sm">Cost Efficient</h3>
          </div>
        </div>
      </div>

      <div className="relative max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-food-cream rounded-full opacity-50" />
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-food-cream rounded-full opacity-50" />
        <IngredientForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateRecipe; 