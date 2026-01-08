import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from "framer-motion";
import { Layers, Network, Share2, Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// --- TIMELINE ITEM ---
const TimelineItem = ({ data, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      
      {/* 1. CONTENT CARD (Active on Desktop split, fills on Mobile) */}
      <div className="w-full md:w-[45%] mb-8 md:mb-0">
         <motion.div
            initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
         >
            <TiltCard className="relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
              
              <div className="bg-[#1c1e20]/80 dark:bg-[#1c1e20]/80 bg-white/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group-hover:border-blue-500/50 transition-colors duration-300">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300">
                    <data.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white text-gray-900">{data.title}</h3>
                    <p className="text-blue-400 font-medium text-sm md:text-base">{data.company}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{data.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>Remote / ID</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed text-sm md:text-base">
                  {data.description}
                </p>
              </div>
            </TiltCard>
         </motion.div>
      </div>

      {/* 2. CENTER NODE (Desktop Only mostly, but adapted for structure) */}
      <div className="relative w-full md:w-[10%] flex justify-center items-center">
         {/* The Dot */}
         <motion.div
           initial={{ scale: 0, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.4 }}
           className="z-10 w-12 h-12 bg-[#101214] border-4 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]"
         >
           <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
         </motion.div>
      </div>

      {/* 3. SPACER for Alternating Layout */}
      <div className="w-0 md:w-[45%]" />
    </div>
  );
};


const ExperienceSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  
  // Scroll Progress for the central line
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    {
      icon: Network,
      title: t("experience.aiEngineer.title"), // AI Engineer
      company: t("experience.aiEngineer.company"),
      period: t("experience.aiEngineer.period"),
      description: t("experience.aiEngineer.description"),
    },
    {
      icon: Layers,
      title: t("experience.webDev.title"), // Web Dev
      company: t("experience.webDev.company"),
      period: t("experience.webDev.period"),
      description: t("experience.webDev.description"),
    },
    {
        icon: Share2,
        title: t("experience.socialMedia.title"), // Content Creator
        company: t("experience.socialMedia.company"),
        period: t("experience.socialMedia.period"),
        description: t("experience.socialMedia.description"),
      },
  ];

  return (
    <div ref={ref} className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-transparent">
      <SEO 
        title="Experience" 
        description="My professional journey through the cosmos of code."
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-block"
          >
             <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                 {t("experience.title")}
               </span>
             </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            "{t("experience.subtitle")}"
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Central Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2">
             <motion.div 
               style={{ scaleY, transformOrigin: "top" }}
               className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
             />
          </div>

          {/* Timeline Items */}
          <div className="pl-12 md:pl-0"> {/* Padding left for mobile to clear the line */}
            {experiences.map((exp, index) => (
              <TimelineItem key={index} data={exp} index={index} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ExperienceSection;
