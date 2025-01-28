import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookmarkIcon, HomeIcon } from '@heroicons/react/24/outline';
import chefIcon from '../assets/icons/stir-fry.png';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <img 
              src={chefIcon} 
              alt="Chef Icon" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Chef Assistant
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark hover:bg-primary/10'
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/saved-recipes"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isActive('/saved-recipes') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark hover:bg-primary/10'
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