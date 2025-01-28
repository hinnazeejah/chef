import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import heroImage from '../assets/icons/hero-food.png';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Background" 
          className="w-full h-screen object-cover opacity-75"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center pt-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="flex flex-col gap-8">
            <span className="text-4xl md:text-5xl font-sans font-bold text-white drop-shadow-lg tracking-tight">
              Turn Your Ingredients Into
            </span>
            <span className="text-5xl md:text-7xl font-cinderela text-food-orange drop-shadow-lg leading-tight">
              Delicious Meals
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md font-medium mt-8">
            Tell us what's in your kitchen, and we'll find the perfect recipes while helping you save money on missing ingredients.
          </p>

          <button
            onClick={() => navigate('/create-recipe')}
            className="bg-food-orange text-white px-8 py-4 rounded-full text-lg font-medium
              hover:bg-food-orange/90 transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl"
          >
            Get Started
            <ChevronRightIcon className="w-5 h-5 inline-block ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 