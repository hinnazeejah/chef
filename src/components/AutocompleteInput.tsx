import React, { useState, useEffect, useRef } from 'react';
import { searchIngredients } from '../services/ingredientApi';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  className = ''
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.trim()) {
        const results = await searchIngredients(value);
        setSuggestions(results.filter(item => !excludedIngredients.includes(item)));
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value, excludedIngredients]);

  const handleExclude = (ingredient: string) => {
    setExcludedIngredients(prev => [...prev, ingredient]);
  };

  const removeExcluded = (ingredient: string) => {
    setExcludedIngredients(prev => prev.filter(item => item !== ingredient));
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className={className}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => {
                  onChange(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <span>{suggestion}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleExclude(suggestion);
                  }}
                  className="text-food-brown/60 hover:text-food-orange text-sm"
                >
                  Exclude
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-sm text-food-brown/60 mt-1">
        Tip: Add as many or as few ingredients as you want! We'll work with what you have.
      </p>

      {excludedIngredients.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-food-brown mb-2">Excluded Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {excludedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-food-orange/10 text-food-brown"
              >
                {ingredient}
                <XCircleIcon
                  className="w-4 h-4 ml-1 cursor-pointer hover:text-food-orange"
                  onClick={() => removeExcluded(ingredient)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput; 