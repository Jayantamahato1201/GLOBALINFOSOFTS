import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  onClick?: () => void;
  id?: string;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  intensity = 15,
  glowColor = 'rgba(99, 102, 241, 0.22)',
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      id={id}
      style={{ perspective: 1000 }}
      className="relative group/tilt"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Dynamic Specular Lighting Shimmer */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() * 100).toFixed(1)}% ${(mouseY.get() * 100).toFixed(1)}%, ${glowColor} 0%, transparent 60%)`
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
