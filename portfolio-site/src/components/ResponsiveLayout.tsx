'use client';

import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  showDevMode?: boolean;
}

export default function ResponsiveLayout({ 
  children, 
  className = '',
  showDevMode = false 
}: ResponsiveLayoutProps) {
  return (
    <div className={`min-h-screen w-full ${className}`}>
      {/* Development Grid Overlay */}
      {showDevMode && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Mobile Grid */}
          <div className="absolute inset-0 sm:hidden">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={`mobile-${i}`}
                className="absolute top-0 bottom-0 border-l border-red-500/30"
                style={{ left: `${(i + 1) * 25}%` }}
              />
            ))}
          </div>
          
          {/* Tablet Grid */}
          <div className="absolute inset-0 hidden sm:block lg:hidden">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`tablet-${i}`}
                className="absolute top-0 bottom-0 border-l border-blue-500/30"
                style={{ left: `${(i + 1) * 12.5}%` }}
              />
            ))}
          </div>
          
          {/* Desktop Grid */}
          <div className="absolute inset-0 hidden lg:block">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={`desktop-${i}`}
                className="absolute top-0 bottom-0 border-l border-green-500/30"
                style={{ left: `${(i + 1) * 8.333}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Development Info Panel */}
      {showDevMode && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-4 rounded-lg font-mono text-xs">
          <div className="space-y-1">
            <div className="text-red-400 sm:hidden">Mobile: 4 columns</div>
            <div className="text-blue-400 hidden sm:block lg:hidden">Tablet: 8 columns</div>
            <div className="text-green-400 hidden lg:block">Desktop: 12 columns</div>
            <div className="pt-2 text-yellow-300">
              <strong>Responsive:</strong> Use Tailwind classes
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}
