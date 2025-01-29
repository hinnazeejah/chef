import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookmarkIcon, HomeIcon } from '@heroicons/react/24/outline';
import chefIcon from '../assets/icons/stir-fry.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-md py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <img 
              src={chefIcon} 
              alt="Chef Icon" 
              className="w-8 h-8 object-contain transition-transform group-hover:rotate-12 duration-300"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-food-brown to-food-orange bg-clip-text text-transparent">
              ReciPal
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 
                ${isActive('/') 
                  ? 'bg-gradient-to-r from-food-orange to-food-orange/90 text-white shadow-lg scale-105' 
                  : 'text-food-brown hover:bg-food-orange/5 hover:scale-105 hover:shadow-md'
                }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/saved-recipes"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 
                ${isActive('/saved-recipes') 
                  ? 'bg-gradient-to-r from-food-orange to-food-orange/90 text-white shadow-lg scale-105' 
                  : 'text-food-brown hover:bg-food-orange/5 hover:scale-105 hover:shadow-md'
                }`}
            >
              <BookmarkIcon className="w-5 h-5" />
              <span className="font-medium">Saved Recipes</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;