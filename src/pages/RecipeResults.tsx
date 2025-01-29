import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { RecipeDetails, MissingIngredient, Store } from '../types';
import StoreMap from '../components/StoreMap';
import { MagnifyingGlassIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

const RecipeResults: React.FC = () => {
  const location = useLocation();

  // Redirect to home if there's no state
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { recipes, userIngredients, preferences, userLocation, appliances, timeLimit, budget } = location.state as {
    recipes: RecipeDetails[];
    userIngredients: string[];
    preferences: string[];
    userLocation: { lat: number; lng: number };
    appliances: string[];
    timeLimit: string;
    budget: string;
  };

  // Convert StoreLocation to Store type
  const stores: Store[] = Array.from(new Set(
    recipes.flatMap(recipe => 
      recipe.missingIngredients.flatMap(ing => 
        ing.stores.map(store => ({
          id: `${store.name}-${store.address}`,
          name: store.name,
          address: store.address,
          coordinates: {
            lat: parseFloat(store.latitude || '0'),
            lng: parseFloat(store.longitude || '0')
          }
        }))
      )
    )
  ));

  return (
    <>
      <Navbar />
      <main className="pt-24 p-6 space-y-8">
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
                  {userIngredients.map((ingredient, index) => (
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
                  {appliances.map((appliance, index) => (
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
                  {preferences.map((pref, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {recipes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-food-cream rounded-full flex items-center justify-center">
                  <ExclamationCircleIcon className="w-8 h-8 text-food-orange" />
                </div>
                <h3 className="text-xl font-semibold text-food-brown mb-2">No Recipes Found</h3>
                <p className="text-food-brown/60">Try adjusting your search criteria</p>
              </div>
            ) : (
              recipes.map((recipe: RecipeDetails) => (
                <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {recipe.dietaryTags?.map(tag => (
                        <span key={tag} className="bg-white/90 backdrop-blur-sm text-food-brown text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-food-brown">{recipe.title}</h3>
                    <p className="text-food-sage mt-2">{recipe.description}</p>
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-food-brown mb-3">Missing Ingredients:</h4>
                      {recipe.missingIngredients.map((ingredient: MissingIngredient) => (
                        <div key={ingredient.name} className="mb-4 bg-food-cream rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{ingredient.name}</span>
                            <span className="text-food-orange">~${ingredient.price.toFixed(2)}</span>
                          </div>
                          <div className="text-sm space-y-2">
                            {ingredient.stores.map(store => (
                              <div key={store.name} className="flex justify-between items-center">
                                <span>{store.name} ({store.distance.toFixed(1)} mi)</span>
                                <span>${store.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="text-food-orange font-medium">
                        Total Cost: ${recipe.totalCost.toFixed(2)}
                      </div>
                      <div className="text-food-brown/60">
                        Prep Time: {recipe.prepTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="sticky top-24 h-[calc(100vh-6rem)]">
            <StoreMap stores={stores} userLocation={userLocation} />
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeResults; 