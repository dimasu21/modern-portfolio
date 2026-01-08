import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import StarsBackground from "@/components/StarsBackground";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Lazy load Spline to improve performance
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const AboutMe = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [shouldLoadSpline, setShouldLoadSpline] = useState(!isMobile);

  // Delay Spline loading on mobile to prevent crash
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShouldLoadSpline(true);
      }, 800); // Wait 800ms for page to settle
      return () => clearTimeout(timer);
    } else {
      setShouldLoadSpline(true);
    }
  }, [isMobile]);

  // Choose Spline scene based on device
  const splineScene = isMobile 
    ? "/models/about-me-mobile.spline" 
    : "/models/about-me-desktop.spline";

  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <SEO 
        title="About Me" 
        description="Learn more about my journey and passion for technology."
      />

      {/* Background - Consistent with other pages */}
      <div className="fixed inset-0 z-0">
         <StarsBackground />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
             {t("nav.aboutMe")}
          </h2>
        </div>

      </div>

      {/* Spline Design - Responsive Height */}
      <div className={`w-full relative z-10 ${isMobile ? 'h-[70vh]' : 'h-[85vh]'}`}>
          {shouldLoadSpline ? (
            <React.Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-gray-500 gap-2">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span className="text-sm">Loading 3D Scene...</span>
              </div>
            }>
              <Spline 
                scene={splineScene} 
                className="w-full h-full"
              />
            </React.Suspense>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span className="text-sm">Preparing 3D Experience...</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default AboutMe;
