import { useEffect, useState } from "react";

interface CircularCoinsAnimationProps {
  numCoins?: number;
  radius?: number;
  coinSize?: number;
  speed?: number;
}

const CircularCoinsAnimation = ({
  numCoins = 6,
  radius = 100,
  coinSize = 30,
  speed = 3,
}: CircularCoinsAnimationProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50 / speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="relative" style={{ width: radius * 2 + coinSize, height: radius * 2 + coinSize }}>
      {Array.from({ length: numCoins }).map((_, index) => {
        const angle = (rotation + index * (360 / numCoins)) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <div
            key={index}
            className="absolute transition-all duration-75 ease-linear"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {/* Coin */}
            <div
              className="relative rounded-full bg-gradient-to-br from-warning to-warning/80 shadow-lg"
              style={{
                width: coinSize,
                height: coinSize,
              }}
            >
              {/* Shine effect */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-white/80" />
              
              {/* Currency symbol */}
              <div className="absolute inset-0 flex items-center justify-center text-warning-foreground font-bold text-xs">
                ₹
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-semibold text-primary">Processing</div>
          <div className="flex gap-1 justify-center mt-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCoinsAnimation;
