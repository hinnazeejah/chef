import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import hi from '../assets/icons/hi.png';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Curved Shape Background - Hidden on mobile */}
      <div className="hidden md:block absolute top-0 right-0 w-[70%] h-screen">
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
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center md:justify-start container mx-auto px-6 md:pl-4 lg:pl-8">
        {/* Text Content */}
        <div className="text-center md:text-left max-w-2xl mt-24 md:mt-0">
          <h1 className="flex flex-col gap-4 md:gap-8">
            <span className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-food-brown drop-shadow-lg tracking-tight">
              Turn Your Ingredients Into
            </span>
            <span className="text-4xl sm:text-5xl md:text-7xl font-cinderela text-food-orange drop-shadow-lg leading-tight">
              Delicious Meals
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-food-brown/90 mb-8 md:mb-12 max-w-xl mx-auto md:mx-0 drop-shadow-md font-medium mt-6 md:mt-8">
            Tell us what's in your kitchen, and we'll find the perfect recipes while helping you save money on missing ingredients.
          </p>

          <button
            onClick={() => navigate('/create-recipe')}
            className="bg-food-orange text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium
              hover:bg-food-orange/90 transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl"
          >
            Get Started
            <ChevronRightIcon className="w-5 h-5 inline-block ml-2" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative md:absolute md:right-[10%] md:top-1/2 md:transform md:-translate-y-1/2 
          w-[50%] sm:w-[45%] md:w-[40%] lg:w-[35%] max-w-[500px] h-auto z-20 mt-12 md:mt-0
          group hover:scale-105 transition-all duration-500 ease-out">
          <div className="absolute inset-0 bg-gradient-to-r from-food-orange/20 to-food-orange/0 rounded-full 
            blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-70"></div>
          <img 
            src={hi} 
            alt="Hero Illustration" 
            className="w-full h-full object-contain drop-shadow-xl animate-float 
              group-hover:drop-shadow-2xl transition-all duration-500
              group-hover:rotate-3 group-hover:-translate-y-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero; 