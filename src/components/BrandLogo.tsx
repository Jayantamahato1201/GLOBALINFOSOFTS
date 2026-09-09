import React from 'react';

interface BrandLogoProps {
  size?: number | string;
  className?: string;
  showGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 40,
  className = '',
  showGlow = false
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {/* Optional ambient glow */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 bg-gradient-to-tr from-cyan-400 via-sky-500 to-pink-500 animate-pulse pointer-events-none"
        />
      )}

      {/* Exact Vector Emblem of Global InfoSoft Logo */}
      <img
        src="/logo.svg"
        alt="Global InfoSoft Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain relative z-10 drop-shadow-md select-none"
        draggable={false}
      />
    </div>
  );
};
