'use client';

import React from 'react';

interface KeynoteCardProps {
  className?: string;
  imagePath?: string;
}

export default function KeynoteCard({
  className = "",
  imagePath = ""
}: KeynoteCardProps) {

  return (
    <div className={`backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto ${className}`}>
      
      <div className="relative flex flex-col lg:flex-row min-h-[400px]">
        {/* Left Content Section */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-gray-800 bg-gradient-to-r from-white/50 to-white/30 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg tracking-wide uppercase">
              Keynotes
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            About me
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-700/90 leading-relaxed mb-8 max-w-lg drop-shadow-sm">
            Luis Guillermo Cordova shares his expertise in building innovative digital solutions that bridge 
            technology and creativity. Explore his work in full-stack development, AI/ML integration, and modern 
            web technologies. Discover how cutting-edge development practices meet thoughtful design to create 
            exceptional user experiences and scalable applications.
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center bg-gray-900/80 hover:bg-gray-900 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium transition-all duration-200 self-start shadow-lg">
            View talk
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 lg:max-w-md relative">
          <div className="h-64 lg:h-full relative overflow-hidden rounded-r-2xl">
            {imagePath ? (
              /* Show actual image when provided */
              <div className="p-4 h-full flex items-center justify-center">
                <img 
                  src={imagePath}
                  alt="Portfolio image"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            ) : (
              /* Show gradient placeholder when no image */
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
                {/* Simulated stage/presentation environment */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Simulated people silhouettes */}
                <div className="absolute bottom-8 left-1/4 w-16 h-24 bg-blue-400 rounded-t-full opacity-80"></div>
                <div className="absolute bottom-8 right-1/3 w-14 h-20 bg-blue-300 rounded-t-full opacity-70"></div>
                
                {/* Stage lighting effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute top-1/3 left-0 w-24 h-24 bg-pink-400 rounded-full opacity-15 blur-lg"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
