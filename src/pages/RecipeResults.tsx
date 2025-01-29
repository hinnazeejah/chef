import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  SparklesIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

interface LocationState {
  userIngredients: string[];
  preferences: string[];
  appliances: string[];
  timeLimit: number;
  budget: number;
}

const RecipeResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { userIngredients, preferences, appliances, timeLimit, budget } = 
    location.state as LocationState;

  // Extended mock recipes to fill 3x3 grid
  const mockRecipes = [
    {
      id: '1',
      title: 'Banana Bread',
      image: '/images/banana-bread.jpg',
      description: 'Moist and delicious banana bread with a hint of vanilla.',
      prepTime: '45 mins',
      estimatedCost: 12.99,
      dietaryTags: ['vegetarian']
    },
    {
      id: '2',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '3',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '4',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '5',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '6',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '7',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '8',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
    {
      id: '9',
      title: 'Bean Sprout Stir Fry',
      image: '/images/stir-fry.jpg',
      description: 'Quick and healthy stir-fried bean sprouts with garlic.',
      prepTime: '20 mins',
      estimatedCost: 8.99,
      dietaryTags: ['vegan', 'gluten-free']
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-24 px-4 md:px-6">
        {/* Search Summary Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-food-brown">Your Search</h2>
            <SparklesIcon className="w-6 h-6 text-food-orange/40" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ingredients Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBagIcon className="w-5 h-5 text-food-orange" />
                <h3 className="font-medium text-food-brown">Your Ingredients</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {userIngredients.map((ingredient, index) => (
                  <span key={index} className="px-3 py-1 bg-food-cream rounded-full text-sm text-food-brown/80">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Appliances Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BeakerIcon className="w-5 h-5 text-food-orange" />
                <h3 className="font-medium text-food-brown">Kitchen Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {appliances.length > 0 ? (
                  appliances.map((appliance, index) => (
                    <span key={`app-${index}`} className="px-3 py-1 bg-food-cream rounded-full text-sm text-food-brown/80">
                      {appliance}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-food-brown/60">All appliances considered</span>
                )}
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <HeartIcon className="w-5 h-5 text-food-orange" />
                <h3 className="font-medium text-food-brown">Preferences</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferences.map((pref, index) => (
                  <span key={`pref-${index}`} className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange">
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {/* Time & Budget Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ClockIcon className="w-5 h-5 text-food-orange" />
                <h3 className="font-medium text-food-brown">Time & Budget</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-food-orange/60" />
                  <span className="text-sm text-food-brown">{timeLimit} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="w-4 h-4 text-food-orange/60" />
                  <span className="text-sm text-food-brown">Under ${budget}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-food-orange/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4">
              <SparklesIcon className="w-6 h-6 text-food-orange/30" />
            </span>
          </div>
        </div>

        {/* Recipe Results Section */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-2xl font-bold text-food-brown">Recipe Suggestions</h2>
            <span className="text-food-orange/60 text-lg">({mockRecipes.length})</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-w-16 aspect-h-12">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{recipe.title}</h3>
                    <div className="flex gap-2">
                      {recipe.dietaryTags?.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/90 rounded-full text-xs text-food-brown">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-food-sage text-sm mb-4">{recipe.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-food-orange font-medium">${recipe.estimatedCost}</span>
                    <span className="text-food-brown/60 text-sm">{recipe.prepTime}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="mt-4 w-full bg-food-cream text-food-brown px-4 py-2 rounded-lg 
                      hover:bg-food-peach transition-colors duration-200"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeResults; 