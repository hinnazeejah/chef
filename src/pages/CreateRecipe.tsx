import React, { useState } from 'react';
import IngredientForm from '../components/IngredientForm';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, SparklesIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import cookingIcon from '../assets/icons/cooking.png';

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
    appliances: string[],
    timeLimit: number,
    budget: number
  ) => {
    // Mock recipe data for now
    const mockRecipes = [{
      id: '1',
      title: 'Chicken Rice Bowl',
      image: 'https://via.placeholder.com/300',
      prepTime: `${timeLimit} mins`,
      description: 'A delicious chicken and rice bowl',
      dietaryTags: preferences,
      estimatedCost: budget,
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
        timeLimit: timeLimit,
        budget: budget,
        userLocation: userLocation
      },
      replace: true
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto pt-36 px-4 md:px-6">
        <div className="text-center mb-10 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinderela font-normal text-food-orange mb-2 tracking-tight">
              Find Your Perfect Recipe
            </h1>
          </div>
          <p className="text-food-brown/80 text-base md:text-lg font-medium mt-3 mb-5">
            Tell us what you have, and we'll do the magic!
          </p>
          <div className="flex justify-center">
            <img 
              src={cookingIcon}
              alt="Cooking icon"
              className="w-10 h-10 opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
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

        <div className="relative">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-food-cream rounded-full opacity-50" />
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-food-cream rounded-full opacity-50" />
          <IngredientForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default CreateRecipe; 