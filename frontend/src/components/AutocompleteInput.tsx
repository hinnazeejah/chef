import React, { useState, useEffect, useRef } from 'react';
import { searchIngredients } from '../services/ingredientApi';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}


const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getSuggestions = async (input: string) => {
    const inputItems = input.split(',').map(item => item.trim());
    const currentInput = inputItems[inputItems.length - 1].toLowerCase();
    
    if (!currentInput) return [];
    
    const suggestions = await searchIngredients(currentInput);
    return suggestions;
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    const newSuggestions = await getSuggestions(newValue);
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const inputItems = value.split(',').map(item => item.trim());
    inputItems.pop();
    const newValue = [...inputItems, suggestion].join(', ');
    onChange(newValue + ', ');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder={placeholder}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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