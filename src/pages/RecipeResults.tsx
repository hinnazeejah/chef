import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Recipe } from '../types';
import StoreMap from '../components/StoreMap';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';

interface LocationState {
  userIngredients: string[];
  preferences: string[];
  appliances: string[];
  timeLimit: number;
  budget: number;
  userLocation: {
    lat: number;
    lng: number;
  };
}

interface MockRecipe extends Recipe {
  missingIngredients: {
    name: string;
    price: number;
    stores: {
      name: string;
      distance: number;
      price: number;
      address: string;
    }[];
  }[];
}

const RecipeResults: React.FC = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { userIngredients, preferences, userLocation, appliances, timeLimit, budget } = 
    location.state as LocationState;

  // Mock recipe data
  const mockRecipes: MockRecipe[] = [
    {
      id: '1',
      title: 'Banana Bread',
      image: '/images/banana-bread.jpg',
      description: 'Moist and delicious banana bread with a hint of vanilla.',
      prepTime: '45 mins',
      estimatedCost: 12.99,
      dietaryTags: ['vegetarian'],
      missingIngredients: [
        {
          name: 'vanilla extract',
          price: 4.99,
          stores: [
            { name: "Trader Joe's", distance: 0.8, price: 4.99, address: '123 Market St' }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free'],
      missingIngredients: []
    },
    // Add more mock recipes as needed
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-24 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search Summary & Recipe Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Summary Card */}
            <div className="bg-food-cream rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold text-food-brown">Your Search</h2>
                <div className="h-8 w-8 rounded-full bg-food-orange/10 flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-5 h-5 text-food-orange" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Ingredients Section */}
                {userIngredients.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-food-brown font-medium min-w-[100px]">Ingredients:</span>
                    <div className="flex flex-wrap gap-2">
                      {userIngredients.map((ingredient: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white rounded-full text-sm text-food-brown/80 shadow-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Appliances Section */}
                {appliances?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-food-brown font-medium min-w-[100px]">Appliances:</span>
                    <div className="flex flex-wrap gap-2">
                      {appliances.map((appliance: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/80 rounded-full text-sm text-food-brown/80 shadow-sm"
                        >
                          {appliance}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Time Limit Section */}
                {timeLimit && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-food-brown font-medium min-w-[100px]">Time:</span>
                    <span className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange shadow-sm">
                      {timeLimit} minutes
                    </span>
                  </div>
                )}

                {/* Budget Section */}
                {budget && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-food-brown font-medium min-w-[100px]">Budget:</span>
                    <span className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange shadow-sm">
                      ${budget}
                    </span>
                  </div>
                )}
                
                {/* Preferences Section */}
                {preferences.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-food-brown font-medium min-w-[100px]">Preferences:</span>
                    <div className="flex flex-wrap gap-2">
                      {preferences.map((pref: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange shadow-sm"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recipe Cards */}
            <div className="space-y-6">
              {mockRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewRecipe={(id) => console.log('View recipe:', id)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-food-brown">Nearby Stores</h3>
                <p className="text-sm text-food-sage">Find missing ingredients</p>
              </div>
              <div className="h-[calc(100vh-12rem)]">
                <StoreMap stores={[]} userLocation={userLocation} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeResults; 