import React, { useState, useEffect, useRef } from 'react';
import { searchIngredients } from '../services/ingredientApi';

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.trim()) {
        const results = await searchIngredients(value);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [value]);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-food-orange/20 to-food-peach/20 rounded-xl blur group-hover:blur-md transition-all duration-300" />
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-white rounded-xl border-2 border-transparent focus:border-food-orange focus:outline-none transition-all duration-300 relative z-10 placeholder:text-food-brown/40"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white mt-2 rounded-xl shadow-xl max-h-60 overflow-auto border border-gray-100">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-6 py-3 hover:bg-food-cream cursor-pointer transition-colors duration-200"
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput; 