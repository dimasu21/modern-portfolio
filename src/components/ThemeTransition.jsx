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
    
      const timer = setTimeout(() => {
      setShow(false);
    }, 400); // Faster duration

    return () => clearTimeout(timer);
  }, [theme]);

  // Determine background color for the wipe overlay
  // If moving to dark, wipe with dark color. If moving to light, wipe with light.
  const bgColor = targetTheme === "dark" ? "#101214" : "#eff1f5";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ clipPath: "circle(0% at 95% 5%)" }}
          animate={{ clipPath: "circle(150% at 95% 5%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
