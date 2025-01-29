import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import hi from '../assets/icons/hi.png';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Curved Shape Background */}
      <div className="absolute top-0 right-0 w-[70%] h-screen">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M65,0 C55,0 45,25 55,50 C65,75 75,100 100,100 L100,0 Z"
            fill="#FFE5E5"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center container mx-auto px-8 lg:px-12">
        <div className="text-left max-w-2xl">
          <h1 className="flex flex-col gap-8">
            <span className="text-4xl md:text-5xl font-sans font-bold text-food-brown drop-shadow-lg tracking-tight">
              Turn Your Ingredients Into
            </span>
            <span className="text-5xl md:text-7xl font-cinderela text-food-orange drop-shadow-lg leading-tight">
              Delicious Meals
            </span>
          </h1>
          
          <p className="text-xl text-food-brown/90 mb-12 max-w-xl drop-shadow-md font-medium mt-8">
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

        {/* Hero Image */}
        <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2 w-[35%] max-w-[500px] h-auto z-20">
          <img 
            src={hi} 
            alt="Hero Illustration" 
            className="w-full h-full object-contain drop-shadow-xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero; 