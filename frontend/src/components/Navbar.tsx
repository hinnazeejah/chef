import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-food-orange to-food-brown text-white shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-food-cream">
              Chef Assistant
            </Link>
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-food-cream text-food-peach transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/saved-recipes" className="hover:text-food-cream text-food-peach transition-colors duration-200 font-medium">
                Saved Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;