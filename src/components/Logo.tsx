import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: variant === 'full' ? 'h-8' : 'h-6',
    md: variant === 'full' ? 'h-12' : 'h-8',
    lg: variant === 'full' ? 'h-16' : 'h-12',
  };

  // Using the PNG logo for both variants since it's a complete logo design
  const logoSrc = '/assets/Logo.png';

  return (
    <img
      src={logoSrc}
      alt="CodeGrader Logo"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export default Logo;
