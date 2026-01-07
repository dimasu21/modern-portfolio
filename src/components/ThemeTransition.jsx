import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const ThemeTransition = () => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [targetTheme, setTargetTheme] = useState(theme);

  // When theme changes, trigger animation
  useEffect(() => {
    setTargetTheme(theme);
    setShow(true);
    
    // Delay before hiding - smooth transition
    const timer = setTimeout(() => {
      setShow(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [theme]);

  // Determine background color for the wipe overlay
  const bgColor = targetTheme === "dark" ? "#101214" : "#eff1f5";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: bgColor,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;
