import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookmarkIcon, HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import chefIcon from '../assets/icons/stir-fry.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
    { path: '/saved-recipes', icon: <BookmarkIcon className="w-5 h-5" />, label: 'Saved Recipes' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={chefIcon} 
              alt="ReciPal Logo" 
              className="w-8 h-8 transform transition-transform duration-300 hover:rotate-12 hover:scale-110" 
            />
            <span className="text-3xl md:text-4xl font-cinderela text-food-orange">ReciPal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4 md:gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'text-dark hover:bg-primary/10 hover:scale-105 hover:shadow-md'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-primary" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-slide-down">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-dark hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;