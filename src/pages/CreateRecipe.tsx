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
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-food-orange mb-3 drop-shadow-lg tracking-tight">
          Create Your Perfect Recipe
        </h1>
        <div className="w-24 h-1 bg-food-orange mx-auto rounded-full mb-4 transform hover:scale-110 transition-transform duration-300" />
        <p className="text-food-brown/80 text-lg font-medium">
          Tell us what you have, and we'll do the magic
        </p>
        
        {/* Added Features */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-food-brown/70">
            <ClockIcon className="w-5 h-5" />
            <span>Quick Results</span>
          </div>
          <div className="flex items-center gap-2 text-food-brown/70">
            <SparklesIcon className="w-5 h-5" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 text-food-brown/70">
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Cost Efficient</span>
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