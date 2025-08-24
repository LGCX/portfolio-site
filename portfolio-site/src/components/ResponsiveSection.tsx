'use client';

import React from 'react';

interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  // Responsive spacing
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  // Responsive positioning
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  // Mobile-first responsive classes
  mobileClass?: string;   // Default (mobile-first)
  tabletClass?: string;   // sm: and up
  desktopClass?: string;  // lg: and up
  // Layout
  layout?: 'block' | 'flex' | 'grid';
  // Alignment
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  // Background
  background?: string;
  textColor?: string;
  // Photonegative effect
  photonegative?: boolean;
}

export default function ResponsiveSection({
  children,
  className = '',
  padding = 'md',
  margin = 'none',
  position = 'relative',
  mobileClass = '',
  tabletClass = '',
  desktopClass = '',
  layout = 'block',
  align = 'start',
  justify = 'start',
  background = 'transparent',
  textColor = 'inherit',
  photonegative = false
}: ResponsiveSectionProps) {
  
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-2 sm:p-4',
    md: 'p-4 sm:p-6 lg:p-8',
    lg: 'p-6 sm:p-8 lg:p-12',
    xl: 'p-8 sm:p-12 lg:p-16'
  };

  // Margin classes
  const marginClasses = {
    none: '',
    sm: 'm-2 sm:m-4',
    md: 'm-4 sm:m-6 lg:m-8',
    lg: 'm-6 sm:m-8 lg:m-12',
    xl: 'm-8 sm:m-12 lg:m-16'
  };

  // Layout classes
  const layoutClasses = {
    block: '',
    flex: 'flex',
    grid: 'grid'
  };

  // Alignment classes
  const alignClasses = {
    start: layout === 'flex' ? 'items-start' : 'self-start',
    center: layout === 'flex' ? 'items-center' : 'self-center',
    end: layout === 'flex' ? 'items-end' : 'self-end',
    stretch: layout === 'flex' ? 'items-stretch' : 'self-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  // Combine responsive classes
  const responsiveClasses = [
    mobileClass,
    tabletClass ? `sm:${tabletClass}` : '',
    desktopClass ? `lg:${desktopClass}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={`
        ${position}
        ${layoutClasses[layout]}
        ${layout === 'flex' ? alignClasses[align] : ''}
        ${layout === 'flex' ? justifyClasses[justify] : ''}
        ${paddingClasses[padding]}
        ${marginClasses[margin]}
        ${responsiveClasses}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{
        background,
        color: photonegative ? 'white' : textColor,
        ...(photonegative && { mixBlendMode: 'difference' })
      }}
    >
      {children}
    </div>
  );
}
