import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  BookmarkIcon as BookmarkOutline
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import chefIcon from '../assets/icons/stir-fry.png';
import { useSavedRecipes } from '../contexts/SavedRecipesContext';
import ingredientsIcon from '../assets/icons/ingredients.png';
import mealtypeIcon from '../assets/icons/mealtype.png';
import kitchentoolsIcon from '../assets/icons/kitchentools.png';
import preferencesIcon from '../assets/icons/preferences.png';
import timeandbudgetIcon from '../assets/icons/timeandbudget.png';
import timeIcon from '../assets/icons/time.png';
import budgetIcon from '../assets/icons/budget.png';
import { motion } from 'framer-motion';

interface LocationState {
  userIngredients: string[];
  preferences: string[];
  appliances: string[];
  timeLimit: number;
  budget: number;
  selectedMealType: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RecipeResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveRecipe, removeRecipe, isSaved } = useSavedRecipes();

  // Add this useEffect to scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { userIngredients, preferences, appliances, timeLimit, budget, selectedMealType } = 
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
      <main className="container mx-auto pt-32 px-6 md:px-8 lg:px-6">
        {/* Desktop View - Search Summary Section */}
        <div className="hidden md:block">
          <div className="mb-12">
            <div className="relative mb-8">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-cinderela font-normal text-food-orange relative">
                  Your Search
                </h2>
              </div>
              <p className="text-center text-food-brown/60 mt-2">
                Here's what we found based on your preferences
              </p>
              <div className="absolute inset-x-0 -bottom-4">
                <div className="h-px bg-gradient-to-r from-transparent via-food-orange/20 to-transparent" />
              </div>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8"
            >
              {/* Ingredients Card */}
              <motion.div variants={item} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={ingredientsIcon}
                    alt="Ingredients"
                    className="w-5 h-5 filter-[#FF6B6B]"
                  />
                  <h3 className="font-medium text-food-brown">Your Ingredients</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userIngredients.map((ingredient, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Meal Type Card */}
              <motion.div variants={item} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={mealtypeIcon}
                    alt="Meal Type"
                    className="w-5 h-5 filter-[#FF6B6B]"
                  />
                  <h3 className="font-medium text-food-brown">Meal Type</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange">
                    {selectedMealType 
                      ? selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)
                      : 'Any Meal'}
                  </span>
                </div>
              </motion.div>

              {/* Appliances Card */}
              <motion.div variants={item} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={kitchentoolsIcon}
                    alt="Kitchen Tools"
                    className="w-5 h-5 filter-[#FF6B6B]"
                  />
                  <h3 className="font-medium text-food-brown">Kitchen Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {appliances.length > 0 ? (
                    appliances.map((appliance, index) => (
                      <span 
                        key={`app-${index}`} 
                        className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange"
                      >
                        {appliance}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-food-brown/60">All appliances considered</span>
                  )}
                </div>
              </motion.div>

              {/* Preferences Card */}
              <motion.div variants={item} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={preferencesIcon}
                    alt="Preferences"
                    className="w-5 h-5 filter-[#FF6B6B]"
                  />
                  <h3 className="font-medium text-food-brown">Preferences</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.map((pref, index) => (
                    <span key={`pref-${index}`} className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange">
                      {pref}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Time & Budget Card */}
              <motion.div variants={item} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={timeandbudgetIcon}
                    alt="Time and Budget"
                    className="w-5 h-5 filter-[#FF6B6B]"
                  />
                  <h3 className="font-medium text-food-brown">Time & Budget</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange flex items-center gap-2">
                    <img 
                      src={timeIcon}
                      alt="Time"
                      className="w-4 h-4 filter-[#FF6B6B]"
                    />
                    {timeLimit} minutes
                  </span>
                  <span className="px-3 py-1 bg-food-orange/10 rounded-full text-sm text-food-orange flex items-center gap-2">
                    <img 
                      src={budgetIcon}
                      alt="Budget"
                      className="w-4 h-4 filter-[#FF6B6B]"
                    />
                    Under ${budget}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Divider - Only show on desktop */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-food-orange/10"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-transparent via-white to-transparent px-12">
                <div className="bg-food-cream/30 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <img 
                    src={chefIcon}
                    alt="Stir fry icon" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Only Recipe Suggestions */}
        <div className="md:hidden text-center mb-12">
          <h2 className="text-3xl font-cinderela text-food-orange mb-2">
            Recipe Suggestions
          </h2>
          <span className="inline-block px-3 py-1 bg-food-orange/10 rounded-full text-food-orange/80 text-base font-medium">
            {mockRecipes.length} Recipes Found
          </span>
        </div>

        {/* Recipe Results Section - Shown on both mobile and desktop */}
        <div className="md:block">
          <div className="hidden md:flex items-center gap-3 mb-8 px-2 md:px-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-cinderela font-normal text-food-orange">
              Recipe Suggestions
            </h2>
            <span className="text-food-orange/60 text-lg md:text-xl font-medium mt-1">
              ({mockRecipes.length})
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
            {mockRecipes.map(recipe => (
              <motion.div
                key={recipe.id}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                  transition-all duration-300 relative group"
              >
                <div className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-64 object-cover transition-transform duration-300 
                      group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                    opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Save Button with hover effect */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSaved(recipe.id)) {
                        removeRecipe(recipe.id);
                      } else {
                        saveRecipe({
                          ...recipe,
                          missingIngredients: [],
                          totalCost: recipe.estimatedCost || 0
                        });
                      }
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm 
                      hover:bg-white transition-all duration-200 hover:scale-110 shadow-md
                      transform hover:rotate-3"
                  >
                    {isSaved(recipe.id) ? (
                      <BookmarkSolid className="w-5 h-5 text-food-orange" />
                    ) : (
                      <BookmarkOutline className="w-5 h-5 text-food-orange" />
                    )}
                  </button>
                  
                  <div className="absolute inset-x-4 bottom-4 flex justify-between items-end
                    transform transition-transform duration-300 group-hover:translate-y-0
                    group-hover:opacity-100">
                    <h3 className="text-xl font-semibold text-white max-w-[60%] leading-tight
                      transform group-hover:scale-105 transition-transform duration-300">
                      {recipe.title}
                    </h3>
                    
                    <button 
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="px-4 py-1.5 bg-food-orange text-white text-sm font-medium rounded-full
                        hover:bg-food-orange/90 transform hover:scale-110 transition-all duration-300
                        shadow-md hover:shadow-lg hover:rotate-1"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeResults; 