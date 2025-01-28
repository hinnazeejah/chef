import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe, Store, Price } from '../types';
import RecipeCard from '../components/RecipeCard';
import StoreList from '../components/StoreList';
import PriceTable from '../components/PriceTable';
import IngredientForm from '../components/IngredientForm';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
    appliances: string[],
    budget: number | null
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
    <div>
      <Hero />
    </div>
  );
};

export default Home;