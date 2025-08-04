'use client';

// Imports
import React from 'react';

// The main Banner component for the HulkGains website.
const BannerComponent = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-black overflow-hidden">
      
      <div className="relative text-center max-w-2xl z-10">
        <h1 className="relative text-5xl text-gray-100">
            HulkGains
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-100 mb-4 leading-tight">
          Unleash Your Inner <span className="text-green-600 dark:text-green-500">HULK</span>
        </h2>
        <p className="text-md sm:text-xl text-gray-400 font-extralight mb-8">
          Get stronger, look better, and crush your fitness goals with HulkGains. Start your transformation today!
        </p>
        <p className='mb-8 text-green-600 font-light text-2xl'>Powered by Ai</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 cursor-pointer text-white font-light border-1 border-green-500 hover:border-green-600 rounded-xl">
            Get Started
          </button>
          <button className="px-6 py-3 border font-light cursor-pointer bg-black border-gray-800 text-gray-400 dark:border-gray-400 hover:dark:border-green-600 hover:text-green-500 dark:bg-black rounded-xl">
            Learn More
          </button>
        </div>
      </div>

    </div>
  )
}

export default BannerComponent;
