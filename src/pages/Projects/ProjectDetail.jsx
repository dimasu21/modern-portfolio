import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, CheckCircle2, AlertTriangle, Lightbulb, ScanText, FileText, Database, Code2, Layers, Cpu } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { projectDetails } from "@/data/projectDetails";

// Import images
import netraImg from "../../assets/images/netra-preview.png";

const imageMap = {
  "/assets/images/netra-preview.png": netraImg,
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  // Get current language (en or id)
  const currentLang = i18n.language === "id" ? "id" : "en";

  const project = projectDetails.find((p) => p.id === slug);

  useEffect(() => {
    // Scroll restoration is mostly handled by index.html script now,
    // but this is a double safety measure for client-side navigation
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2 bg-teal-600 rounded-lg hover:bg-teal-700 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const content = project.content[currentLang];
  const getImage = (path) => imageMap[path] || path;

  return (
    <main className="min-h-screen bg-[#04081A] text-white overflow-hidden relative">
      <SEO
        title={content.title}
        description={content.subtitle}
      />
      
      {/* Background & decorative elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <GridBackground />
      </div>
      
      {/* Ambient Glow - More Vibrant */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>

        {/* Hero Header Section - REDESIGNED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Project Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-teal-300 bg-teal-900/30 border border-teal-500/30 rounded-full backdrop-blur-sm">
            <Layers className="w-4 h-4" />
            {project.category}
          </div>

          {/* Title with Gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent leading-tight drop-shadow-sm max-w-5xl mx-auto">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
              >
                <Globe className="w-5 h-5" />
                Visit Live Site
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-[#1e293b]/80 border border-gray-700 rounded-full font-bold text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Image with Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl relative group max-w-5xl mx-auto"
        >
          {/* Image Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative rounded-2xl overflow-hidden bg-[#020617]">
             <img
              src={getImage(project.images.hero)}
              alt={content.title}
              className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-[#04081A] via-transparent to-transparent opacity-30" />
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <section className="relative">
              <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-teal-500/50 to-transparent hidden lg:block" />
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-teal-500/10 rounded-lg text-teal-400">
                  <FileText className="w-6 h-6" />
                </span>
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg text-justify">
                {content.overview}
              </p>
            </section>

            {/* Engineering Process */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                  <Cpu className="w-6 h-6" />
                </span>
                Engineering Process
              </h3>
              
              <div className="space-y-8">
                {content.challenges.map((challenge, idx) => (
                  <div key={idx} className="bg-[#0f172a]/40 rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700 transition-colors">
                    <div className="mb-4">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Challenge: {challenge.title}
                      </h4>
                      <p className="text-gray-400 pl-7">{challenge.description}</p>
                    </div>

                    <div className="pl-7 relative">
                       <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500/30 to-transparent" />
                       <div className="bg-[#1e293b]/50 rounded-xl p-4 border border-teal-500/10">
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-teal-300 mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Solution: {content.solutions[idx].title}
                        </h4>
                        <p className="text-gray-400 text-sm">{content.solutions[idx].description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tech Stack */}
            <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-gray-700/50 shadow-xl backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-1.5 bg-blue-500/10 text-blue-200 text-sm font-medium rounded-lg border border-blue-500/20"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-gray-700/50 shadow-xl backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ScanText className="w-5 h-5 text-purple-400" />
                Key Features
              </h3>
              <ul className="space-y-4">
                {content.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Meta */}
            <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-gray-800/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-teal-400" />
                Metadata
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                  <span className="text-gray-500">Year</span>
                  <span className="text-white font-medium">{project.date}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                  <span className="text-gray-500">Category</span>
                  <span className="text-white font-medium">Web Application</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
