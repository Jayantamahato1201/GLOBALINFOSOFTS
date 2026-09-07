import React from 'react';
import { motion, type Variants } from 'motion/react';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  className?: string;
  id?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 32,
  scale = 0.96,
  once = false,
  amount = 0.15,
  className = '',
  id
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scale
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1
      }}
      viewport={{
        once,
        amount
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  staggerDelay?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05
    }
  })
};

export const RevealStagger: React.FC<RevealStaggerProps> = ({
  children,
  className = '',
  id,
  staggerDelay = 0.08,
  amount = 0.15,
  once = false
}) => {
  return (
    <motion.div
      id={id}
      variants={staggerContainerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const RevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  return (
    <motion.div id={id} variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
};
