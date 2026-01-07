import React, { useState, useEffect, useCallback } from "react";

const StarsBackground = () => {
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const starCount = 80;

  // Create a new star with random properties
  const createStar = useCallback((id) => {
    const directions = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    
    return {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 1.5, // 1.5-3px
      opacity: 0.3 + Math.random() * 0.4,
      speed: 0.02 + Math.random() * 0.03, // Speed of movement
      direction,
      parallaxFactor: 0.005 + Math.random() * 0.01,
    };
  }, []);

  // Initialize stars
  useEffect(() => {
    const initialStars = Array.from({ length: starCount }, (_, i) => createStar(i));
    setStars(initialStars);
  }, [createStar]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop - move stars
  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => {
          let { x, y, direction, speed } = star;
          
          // Move based on direction
          switch (direction) {
            case 'up': y -= speed; break;
            case 'down': y += speed; break;
            case 'left': x -= speed; break;
            case 'right': x += speed; break;
            case 'up-left': y -= speed * 0.7; x -= speed * 0.7; break;
            case 'up-right': y -= speed * 0.7; x += speed * 0.7; break;
            case 'down-left': y += speed * 0.7; x -= speed * 0.7; break;
            case 'down-right': y += speed * 0.7; x += speed * 0.7; break;
          }
          
          // Check if star is out of bounds - respawn if so
          if (x < -5 || x > 105 || y < -5 || y > 105) {
            return createStar(star.id);
          }
          
          return { ...star, x, y };
        })
      );
    }, 50); // Update every 50ms

    return () => clearInterval(interval);
  }, [createStar]);

  // Calculate parallax offset
  const getParallaxOffset = (factor) => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    return {
      x: (mousePos.x - centerX) * factor,
      y: (mousePos.y - centerY) * factor,
    };
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none dark-only z-0">
      {stars.map((star) => {
        const offset = getParallaxOffset(star.parallaxFactor);
        return (
          <div
            key={star.id}
            className="absolute rounded-full bg-white transition-opacity duration-500"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `calc(${star.x}% + ${offset.x}px)`,
              top: `calc(${star.y}% + ${offset.y}px)`,
              opacity: star.opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export default StarsBackground;
