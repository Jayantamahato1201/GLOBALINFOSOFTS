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

      {/* Exact Vector Emblem of Global InfoSofts Logo */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full relative z-10 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top-Left Pink Gradient */}
          <linearGradient id="logoPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a85" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>

          {/* Top-Right Blue Droplet Gradient */}
          <linearGradient id="logoBlueGrad" x1="30%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="80%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>

          {/* Blue Specular Reflection */}
          <linearGradient id="logoBlueGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Bottom-Left Cyan Droplet Gradient */}
          <linearGradient id="logoCyanGrad" x1="10%" y1="20%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="40%" stopColor="#06b6d4" />
            <stop offset="80%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>

          {/* Cyan Bubble Gloss Specular */}
          <linearGradient id="logoCyanGloss" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Bottom-Right Green Leaf Gradient */}
          <linearGradient id="logoGreenGrad" x1="20%" y1="10%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
        </defs>

        <g>
          {/* 1. Top-Left Magenta / Pink Crescent Petal */}
          <path
            d="M 145 35
               C 178 35 205 52 205 52
               C 192 78 162 122 108 148
               C 65 170 32 173 3 178
               C 11 142 32 108 62 80
               C 88 53 118 36 145 35 Z"
            fill="url(#logoPinkGrad)"
          />

          {/* 2. Top-Right Royal & Sky Blue Droplet */}
          <path
            d="M 145 20
               C 260 5 440 60 472 170
               C 490 230 470 290 405 295
               C 335 300 285 240 270 170
               C 255 98 200 45 145 20 Z"
            fill="url(#logoBlueGrad)"
          />

          {/* 2b. Glossy Glass Reflection on Blue Droplet */}
          <path
            d="M 285 170
               C 275 120 310 80 370 70
               C 425 60 460 100 460 170
               C 420 175 350 175 285 170 Z"
            fill="url(#logoBlueGlass)"
            opacity="0.65"
          />

          {/* 3. Bottom-Left Cyan Droplet */}
          <path
            d="M 8 185
               C 50 178 115 190 160 250
               C 205 315 220 395 285 460
               C 350 515 260 510 190 475
               C 105 435 25 350 10 260
               C 5 225 6 200 8 185 Z"
            fill="url(#logoCyanGrad)"
          />

          {/* 3b. Glossy Bubble Reflection on Cyan Droplet */}
          <ellipse
            cx="90"
            cy="270"
            rx="60"
            ry="55"
            transform="rotate(-25 90 270)"
            fill="url(#logoCyanGloss)"
            opacity="0.85"
          />

          {/* 4. Bottom-Right Fresh Green Leaf Petal */}
          <path
            d="M 285 435
               C 350 425 405 385 498 295
               C 495 340 455 400 390 440
               C 340 470 295 450 285 435 Z"
            fill="url(#logoGreenGrad)"
          />
        </g>
      </svg>
    </div>
  );
};
