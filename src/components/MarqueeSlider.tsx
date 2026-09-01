import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MarqueeSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speedSeconds?: number;
  gapClass?: string;
  className?: string;
  showControls?: boolean;
}

export function MarqueeSlider<T>({
  items,
  renderItem,
  speedSeconds = 32,
  gapClass = 'gap-5',
  className = '',
  showControls = true
}: MarqueeSliderProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScroll, setIsManualScroll] = useState(false);

  // Duplicate items 3 times for completely seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    setIsManualScroll(true);
    const scrollAmount = 380;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Subtle Controls if enabled */}
      {showControls && (
        <div className="flex items-center justify-end gap-1.5 mb-3 px-1">
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors active:scale-95"
            aria-label="Scroll carousel left"
            title="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors active:scale-95"
            aria-label="Scroll carousel right"
            title="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Overflow Track with smooth infinite translateX animation */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto overflow-y-hidden scrollbar-none py-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div
          className={`flex ${gapClass} w-max ${!isManualScroll ? 'animate-marquee-left' : ''}`}
          style={{
            animationDuration: `${speedSeconds}s`,
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={index} className="shrink-0 flex-none">
              {renderItem(item, index % items.length)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
