import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import hi from '../assets/icons/hi.png';
import { motion } from 'framer-motion';

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-2xl mt-24 md:mt-0"
        >
          <h1 className="flex flex-col gap-2 md:gap-4">
            <span className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-food-brown/90 drop-shadow-sm tracking-tight">
              Turn Your Ingredients Into
            </span>
            <span className="text-5xl sm:text-6xl md:text-8xl font-cinderela text-food-orange drop-shadow-xl leading-tight mt-2">
              Delicious Meals
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-food-brown/80 mb-8 md:mb-12 max-w-xl mx-auto md:mx-0 drop-shadow-sm font-medium mt-8 md:mt-10">
            Tell us what's in your kitchen, and we'll find the perfect recipes while helping you save money on missing ingredients.
          </p>

          <button
            onClick={() => navigate('/create-recipe')}
            className="bg-food-orange text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-medium
              hover:bg-food-orange/90 transform hover:scale-105 transition-all duration-300
              shadow-xl hover:shadow-2xl"
          >
            Get Started
            <ChevronRightIcon className="w-6 h-6 inline-block ml-2" />
          </button>
        </motion.div>

        {/* Hero Image */}
        <div className="relative md:absolute md:right-[10%] md:top-1/2 md:transform md:-translate-y-1/2 
          w-[50%] sm:w-[45%] md:w-[40%] lg:w-[35%] max-w-[500px] h-auto z-20 mt-12 md:mt-0">
          {/* Gradient Glow Effect - Desktop Only */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-food-orange/20 via-food-cream to-food-orange/10 rounded-full 
            blur-3xl transition-all duration-700 opacity-0 animate-pulse-slow"></div>
          
          {/* Image */}
          <img 
            src={hi} 
            alt="Hero Illustration" 
            className="w-full h-full object-contain relative z-10
              md:animate-float-smooth"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero; 