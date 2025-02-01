import React, { useState, FormEvent } from 'react';
import AutocompleteInput from './AutocompleteInput';
import TimeInput from './TimeInput';
import KitchenTools from './KitchenTools';
import BudgetInput from './BudgetInput';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence as AP } from 'framer-motion';

const AnimatePresence = AP as any;

interface MealType {
  id: string;
  label: string;
  icon?: string;
}

const mealTypes: MealType[] = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'any', label: 'Any Meal' }
];

interface IngredientFormProps {
  onSubmit: (
    ingredients: string[], 
    preferences: string[],
    appliances: string[],
    timeLimit: number,
    budget: number,
    mealType: string
  ) => void;
}

const formSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState<
    'ingredients' | 'mealType' | 'appliances' | 'time' | 'preferences' | 'budget'
  >('ingredients');
  const [ingredients, setIngredients] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [appliances, setAppliances] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | ''>(0);
  const [selectedMealType, setSelectedMealType] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (timeLimit === null) return;
    
    onSubmit(
      ingredientsList,
      preferences,
      appliances,
      timeLimit,
      budget as number,
      selectedMealType
    );
  };

  const handleIngredientsChange = (value: string) => {
    setIngredients(value);
    setIngredientsList(value.split(',').map(i => i.trim()).filter(i => i));
  };

  const handleNextQuestion = () => {
    switch (currentQuestion) {
      case 'ingredients':
        if (ingredientsList.length > 0) setCurrentQuestion('mealType');
        break;
      case 'mealType':
        if (selectedMealType) setCurrentQuestion('appliances');
        break;
      case 'appliances':
        setCurrentQuestion('time');
        break;
      case 'time':
        if (timeLimit !== null) setCurrentQuestion('preferences');
        break;
      case 'preferences':
        if (preferences.length > 0) setCurrentQuestion('budget');
        break;
      case 'budget':
        // Form is complete
        break;
    }
  };

  const handlePreviousQuestion = () => {
    switch (currentQuestion) {
      case 'mealType':
        setCurrentQuestion('ingredients');
        break;
      case 'appliances':
        setCurrentQuestion('mealType');
        break;
      case 'time':
        setCurrentQuestion('appliances');
        break;
      case 'preferences':
        setCurrentQuestion('time');
        break;
      case 'budget':
        setCurrentQuestion('preferences');
        break;
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 'ingredients':
        return (
          <motion.div
            variants={formSectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <h2 className="text-2xl font-cinderela text-food-orange">Step 1: Ingredients</h2>
            <AutocompleteInput
              value={ingredients}
              onChange={handleIngredientsChange}
              placeholder="e.g. ramen, eggs, cheese"
              className="w-full px-6 py-4 bg-white rounded-xl border-2 border-food-orange/20 
                focus-within:border-food-orange/60 shadow-sm hover:shadow-md 
                transition-all duration-300 text-base placeholder:text-food-brown/40
                focus-within:shadow-food-orange/5"
            />
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={ingredientsList.length === 0}
              className="w-full bg-food-orange text-white px-6 py-3 rounded-xl font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-food-orange/90 transition-all duration-200"
            >
              Next Step
            </button>
          </motion.div>
        );

      case 'mealType':
        return (
          <motion.div
            variants={formSectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <h2 className="text-2xl font-cinderela text-food-orange">Step 2: Meal Type</h2>
            <div>
              <label className="block text-dark font-semibold mb-3 text-lg">
                What type of meal are you looking for?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mealTypes.map(mealType => (
                  <button
                    key={mealType.id}
                    type="button"
                    onClick={() => {
                      if (selectedMealType === mealType.id) {
                        setSelectedMealType('');
                      } else {
                        setSelectedMealType(mealType.id);
                      }
                    }}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                      ${selectedMealType === mealType.id
                        ? 'bg-food-orange text-white shadow-md hover:bg-food-orange/90'
                        : 'bg-white border-2 border-food-orange/20 hover:border-food-orange text-food-brown'
                      }`}
                  >
                    {mealType.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                className="w-1/3 bg-white border-2 border-food-orange/20 text-food-brown px-6 py-3 rounded-xl font-medium
                  hover:border-food-orange transition-all duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={!selectedMealType}
                className="w-2/3 bg-food-orange text-white px-6 py-3 rounded-xl font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-food-orange/90 transition-all duration-200"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );

      case 'appliances':
        return (
          <motion.div
            variants={formSectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <h2 className="text-2xl font-cinderela text-food-orange">Step 3: Appliances</h2>
            <KitchenTools 
              selectedAppliances={appliances}
              onChange={setAppliances}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                className="w-1/3 bg-white border-2 border-food-orange/20 text-food-brown px-6 py-3 rounded-xl font-medium
                  hover:border-food-orange transition-all duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-2/3 bg-food-orange text-white px-6 py-3 rounded-xl font-medium
                  hover:bg-food-orange/90 transition-all duration-200"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );

      case 'time':
        return (
          <motion.div
            variants={formSectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <h2 className="text-2xl font-cinderela text-food-orange">Step 4: Time</h2>
            <TimeInput 
              selectedTime={timeLimit || 0} 
              onChange={(minutes: number | null) => setTimeLimit(minutes)}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                className="w-1/3 bg-white border-2 border-food-orange/20 text-food-brown px-6 py-3 rounded-xl font-medium
                  hover:border-food-orange transition-all duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={timeLimit === null}
                className="w-2/3 bg-food-orange text-white px-6 py-3 rounded-xl font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-food-orange/90 transition-all duration-200"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );

      case 'preferences':
        return (
          <motion.div
            variants={formSectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <h2 className="text-2xl font-cinderela text-food-orange">Step 5: Preferences</h2>
            <div>
              <label className="block text-dark font-semibold mb-3 text-lg">
                Any dietary preferences?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'vegetarian', label: 'Vegetarian' },
                  { id: 'vegan', label: 'Vegan' },
                  { id: 'gluten-free', label: 'Gluten-Free' },
                  { id: 'kosher', label: 'Kosher' },
                  { id: 'halal', label: 'Halal' }
                ].map(pref => (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => {
                      if (preferences.includes(pref.id)) {
                        setPreferences([]);
                      } else {
                        setPreferences([pref.id]);
                      }
                    }}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                      ${preferences.includes(pref.id)
                        ? 'bg-food-orange text-white shadow-md hover:bg-food-orange/90'
                        : 'bg-white border-2 border-food-orange/20 hover:border-food-orange text-food-brown'
                      }`}
                  >
                    {pref.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                className="w-1/3 bg-white border-2 border-food-orange/20 text-food-brown px-6 py-3 rounded-xl font-medium
                  hover:border-food-orange transition-all duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={preferences.length === 0}
                className="w-2/3 bg-food-orange text-white px-6 py-3 rounded-xl font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-food-orange/90 transition-all duration-200"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );

      case 'budget':
        return (
          <motion.div
            variants={formSectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <h2 className="text-2xl font-cinderela text-food-orange">Final Step: Budget</h2>
            <BudgetInput 
              value={budget}
              onChange={setBudget}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                className="w-1/3 bg-white border-2 border-food-orange/20 text-food-brown px-6 py-3 rounded-xl font-medium
                  hover:border-food-orange transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={budget === 0}
                className="w-2/3 bg-food-orange/90 text-white px-6 py-4 rounded-xl font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-food-orange transform hover:scale-[1.02] transition-all duration-300
                  shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span className="text-lg">Find Recipes</span>
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 animate-fade-in relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-food-orange/10 to-food-peach/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-food-orange/10 to-food-peach/10 rounded-full blur-2xl" />
      
      {/* New Progress Bar Style */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] sm:text-xs text-food-brown/60">Ingredients</span>
          <span className="text-[10px] sm:text-xs text-food-brown/60">Meal Type</span>
          <span className="text-[10px] sm:text-xs text-food-brown/60">Appliances</span>
          <span className="text-[10px] sm:text-xs text-food-brown/60">Time</span>
          <span className="text-[10px] sm:text-xs text-food-brown/60">Preferences</span>
          <span className="text-[10px] sm:text-xs text-food-brown/60">Budget</span>
        </div>
        <div className="relative h-1 bg-food-cream rounded-full mt-1">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-food-orange to-food-peach rounded-full transition-all duration-300"
            style={{ 
              width: `${(
                ['ingredients', 'mealType', 'appliances', 'time', 'preferences', 'budget']
                .indexOf(currentQuestion) + 1
              ) * 16.67}%` 
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <AnimatePresence mode="wait">
          {renderQuestion()}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default IngredientForm;