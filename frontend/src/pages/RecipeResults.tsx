import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { RecipeDetails, MissingIngredient, Store } from '../types';
import StoreMap from '../components/StoreMap';

const RecipeResults: React.FC = () => {
  const location = useLocation();

  // Redirect to home if there's no state
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { recipes, userIngredients, preferences, appliances, userLocation } = location.state as {
    recipes: RecipeDetails[];
    userIngredients: string[];
    preferences: string[];
    appliances: string[];
    userLocation: { lat: number; lng: number };
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
    <div className="p-6 space-y-8">
      <div className="bg-food-cream rounded-xl p-6">
        <h2 className="text-2xl font-bold text-food-brown mb-2">Your Search</h2>
        <div className="flex flex-wrap gap-2">
          <div>
            <span className="text-food-brown font-medium">Ingredients: </span>
            {userIngredients.join(', ')}
          </div>
          {preferences.length > 0 && (
            <div>
              <span className="text-food-brown font-medium">Preferences: </span>
              {preferences.join(', ')}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {recipes.map((recipe: RecipeDetails) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
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
          ))}
        </div>

        <div className="sticky top-6 h-[calc(100vh-4rem)]">
          <StoreMap stores={stores} userLocation={userLocation} />
        </div>
      </div>
    </div>
  );
};

export default RecipeResults; 