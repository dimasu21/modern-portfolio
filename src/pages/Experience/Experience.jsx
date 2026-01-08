import React from "react";
import { Code2, Activity, Cpu, Layers, Network, Binary, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  customSvg,
}) => (
  <div className="group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
    {/* Glass morphism effect */}
    <div className="absolute inset-0 backdrop-blur-lg bg-neutral-400/5 rounded-lg" />

    {/* Animated gradient border */}
    <div className="absolute -inset-[2px] bg-neutral-400 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <div className="relative bg-theme-card rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl">
      {/* Floating icon with pulse effect */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-neutral-400/10 rounded-full blur-xl group-hover:bg-neutral-400/20 transition-all duration-500" />
        {customSvg ? (
          <img
            src={customSvg}
            alt={title}
            className="w-12 h-12 relative z-10 transform group-hover:rotate-12 transition-transform duration-300"
            style={{
              filter:
                "invert(66%) sepia(40%) saturate(1000%) hue-rotate(155deg) brightness(100%)",
            }}
          />
        ) : (
          <Icon className="w-12 h-12 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
        )}
      </div>

      {/* Content with improved typography */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>
        <div className="flex justify-between items-center text-gray-300">
          <span className="font-semibold text-white">{company}</span>
          <span className="text-sm font-mono bg-neutral-400/10 px-3 py-1 rounded-none border border-neutral-400/30">
            {period}
          </span>
        </div>
        <p className="text-gray-300 border-l-4 border-neutral-400/50 pl-4 mt-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20">
        <div className="absolute top-0 right-0 w-6 h-[2px] bg-neutral-400/50" />
        <div className="absolute top-0 right-0 w-[2px] h-6 bg-neutral-400/50" />
      </div>
      <div className="absolute bottom-4 left-4 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-neutral-400/50" />
        <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-neutral-400/50" />
      </div>
    </div>
  </div>
);

const ExperienceSection = () => {
  const { t } = useTranslation();
  const experiences = [
    {
      icon: Share2,
      title: t("experience.socialMedia.title"),
      company: t("experience.socialMedia.company"),
      period: t("experience.socialMedia.period"),
      description: t("experience.socialMedia.description"),
    },
    {
      icon: Layers,
      title: t("experience.webDev.title"),
      company: t("experience.webDev.company"),
      period: t("experience.webDev.period"),
      description: t("experience.webDev.description"),
    },
    {
      icon: Network,
      title: t("experience.aiEngineer.title"),
      company: t("experience.aiEngineer.company"),
      period: t("experience.aiEngineer.period"),
      description: t("experience.aiEngineer.description"),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <SEO 
        title="Experience" 
        description="Professional journey and work experience of Dimas Tri Mulyo."
      />
      {/* Content container */}
      <div className="relative container mx-auto px-6 mt-10">
        {/* Section header with enhanced effects */}
        <div className="flex flex-col items-center space-y-8 mb-20">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold text-white text-center">
              {t("experience.title")}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl">
            "{t("experience.subtitle")}"
          </p>
        </div>

        {/* Experience grid with improved layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
