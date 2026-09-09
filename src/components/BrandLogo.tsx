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
      {/* Pure Image Logo - No SVG, no extra effects */}
      <img
        src="/logo.png"
        alt="Global InfoSoft Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
};
