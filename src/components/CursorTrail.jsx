import React, { useState, useEffect, useRef } from "react";

const CursorTrail = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef();
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const moveTimeoutRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      setIsMoving(true);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setBlobPos(prev => {
        const lerpFactor = 0.05; 
        const dx = cursorPosRef.current.x - prev.x;
        const dy = cursorPosRef.current.y - prev.y;
        
        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const dx = cursorPos.x - blobPos.x;
  const dy = cursorPos.y - blobPos.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Elastic Physics Tuning - SPECIFIC SIZE
  const stretchAmount = Math.min(distance, 150);
  
  // Base 16 -> Min 8 thinning logic
  // rx (Length): Starts at 16, adds stretch
  // ry (Thickness): Starts at 16, thins down to min 8
  const rx = 16 + stretchAmount * 0.5;
  const ry = Math.max(16 - stretchAmount * 0.1, 8);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ mixBlendMode: "difference" }}
    >
      <svg className="w-full h-full">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>

        <g style={{ filter: "url(#goo)" }}>
          {/* Leader Dot (r=6) */}
          <circle
            cx={cursorPos.x}
            cy={cursorPos.y}
            r={6} 
            className="fill-white"
          />

          {/* Tail Blob (r=16 -> min 8) */}
          <ellipse
            cx={blobPos.x}
            cy={blobPos.y}
            rx={rx}
            ry={ry}
            className="fill-white"
            transform={`rotate(${angle} ${blobPos.x} ${blobPos.y})`}
          />
        </g>

        {/* Center Black Dot (Hole) */}
        <circle
          cx={cursorPos.x}
          cy={cursorPos.y}
          r={4}
          className="fill-black transition-opacity duration-200"
          style={{ opacity: isMoving ? 0 : 1 }} 
        />
      </svg>
    </div>
  );
};

export default CursorTrail;
