import { Button } from '@/components/ui/button'
import React from 'react'

const BannerComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white dark:bg-black transition-colors duration-300">
      <div className="text-center max-w-2xl">
        <h1 className='text-5xl'>HulkGains</h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-black dark:text-white mb-6 leading-tight">
          Unleash Your Inner <span className="text-green-600 dark:text-green-500">HULK</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 font-extralight">
          Get stronger, look better, and crush your fitness goals with HulkGains. Start your transformation today!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant='outline' className="px-6 py-3 cursor-pointer text-white font-light border-1 border-green-500 hover:border-green-600 rounded-xl">
            Get Started
          </Button>
          <Button className="px-6 py-3 border font-light cursor-pointer bg-black border-gray-500 text-gray-700 dark:text-gray-300 dark:border-gray-400 hover:bg-gray-100 dark:hover:bg-black rounded-xl">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BannerComponent
