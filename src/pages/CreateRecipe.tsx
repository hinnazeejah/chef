import React, { useState } from 'react';
import IngredientForm from '../components/IngredientForm';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-food-brown mb-8 text-center">
        Create Your Perfect Recipe
      </h1>
      <IngredientForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRecipe; 