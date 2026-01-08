import React from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import StarsBackground from "@/components/StarsBackground";

const AboutMe = () => {
  const { t } = useTranslation();

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
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
             {t("nav.aboutMe")}
          </h2>
        </div>

        {/* Content Area - Placeholder for Spline */}
        <div className="w-full h-[600px] flex items-center justify-center border border-gray-800 rounded-2xl bg-black/20 backdrop-blur-sm">
           <p className="text-gray-500">Spline Design Placeholder</p>
           {/* 
              TODO: Insert Spline Component Here 
              <Spline scene="YOUR_SPLINE_URL" />
           */}
        </div>

      </div>
    </div>
  );
};

export default AboutMe;
