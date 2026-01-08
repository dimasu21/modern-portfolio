import React from "react";
import SEO from "@/components/SEO";
import SplineKeyboard from "@/components/SplineKeyboard";
import { useTheme } from "@/context/ThemeContext";

const SkillsSection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <main id="skills" className={`pt-20 lg:pt-24 min-h-screen relative ${isDarkMode ? 'text-white' : 'text-[#111314]'}`}>
      <SEO 
        title="Skills" 
        description="Technical skills and technology stack of Dimas Tri Mulyo - Frontend, Backend, AI, & DevOps."
      />

      <section className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        {/* Section Header */}
        <div className="text-center mb-2 md:mb-8 animate__animated animate__fadeInDown">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 font-league-spartan"
            style={{ 
              color: isDarkMode ? 'transparent' : '#111314',
              backgroundImage: isDarkMode ? 'linear-gradient(to right, white, #6b7280)' : 'none',
              backgroundClip: isDarkMode ? 'text' : 'border-box',
              WebkitBackgroundClip: isDarkMode ? 'text' : 'border-box'
            }}
          >
            Tech Stack
          </h1>
          <p className={`hidden md:block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>
             Hover keys to see details of my technical expertise.
          </p>
        </div>

        {/* Spline 3D Keyboard */}
        <div className="w-full max-w-7xl animate__animated animate__fadeInUp animate__delay-1s">
            <SplineKeyboard />
        </div>
      </section>
    </main>
  );
};

export default SkillsSection;
