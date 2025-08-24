'use client';

import React, { useState } from 'react';

interface NavigationItem {
  label: string;
  hasDropdown?: boolean;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'About',
    hasDropdown: false,
    items: [
      { title: 'Payments', description: 'Online payments' },
      { title: 'Terminal', description: 'In-person payments' },
      { title: 'Connect', description: 'Payments for platforms' },
    ]
  },
  {
    label: 'Experience',
    hasDropdown: false,
    items: [
      { title: 'Startups', description: 'Get started quickly' },
      { title: 'Enterprises', description: 'Scale globally' },
      { title: 'SaaS', description: 'Subscription billing' },
    ]
  },
  {
    label: 'Projects',
    hasDropdown: false,
    items: [
      { title: 'Documentation', description: 'Start integrating' },
      { title: 'API reference', description: 'Complete API docs' },
      { title: 'Libraries', description: 'Client libraries' },
    ]
  }
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 w-full z-50" style={{ mixBlendMode: 'difference' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 rounded-lg -m-2"></div>
              <div className="relative text-white text-2xl font-bold tracking-tight px-2 py-1">
                Luis Guillermo Cordova
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative">
                  <div className="absolute inset-0  bg-black/15 rounded-lg -m-2 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                  <button className="relative flex items-center text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium px-2 py-1">
                    {item.label}
                    {item.hasDropdown && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-4 z-50">
                    <div className="px-4 py-2">
                      <div className="text-sm font-semibold text-gray-900 mb-3">
                        {item.label.toUpperCase()}
                      </div>
                      <div className="space-y-3">
                        {item.items?.map((subItem) => (
                          <div key={subItem.title} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{subItem.title}</div>
                              <div className="text-xs text-gray-500">{subItem.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 rounded-full"></div>
              <button className="relative bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" style={{ border: '1px solid white' }}>
                Contact me
                <svg className="ml-1 h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-black/15 rounded-lg -m-2 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative text-white/90 hover:text-white transition-colors duration-200 p-2"
              >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 border-t border-white/20 shadow-lg z-20">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <button className="block w-full text-left text-gray-900 hover:text-gray-600 transition-colors duration-200 text-sm font-medium py-2">
                    {item.label}
                  </button>
                  {item.hasDropdown && item.items && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.items.map((subItem) => (
                        <div key={subItem.title} className="py-2">
                          <div className="text-sm font-medium text-gray-700">{subItem.title}</div>
                          <div className="text-xs text-gray-500">{subItem.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button className="block w-full text-left text-gray-900 hover:text-gray-600 transition-colors duration-200 text-sm font-medium">
                  Sign in
                </button>
                <button className="block w-full bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                  Contact sales
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
