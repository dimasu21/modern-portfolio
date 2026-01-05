import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import SEO from "@/components/SEO";
import { projectDetails } from "@/data/projectDetails";

// Import images - pastikan path sesuai atau import dari atas jika perlu
// Untuk dynamic import gambar dari data file, kita asumsikan path string-nya benar
// Atau kita bisa import manual di sini mapping-nya.
import netraImg from "../../assets/images/netra-preview.png";

const imageMap = {
  "/assets/images/netra-preview.png": netraImg,
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectDetails.find((p) => p.id === slug);

  useEffect(() => {
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

  const getImage = (path) => imageMap[path] || path;

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <SEO
        title={project.title}
        description={project.subtitle}
      />
      
      {/* Background & decorative elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <GridBackground />
      </div>
      
      <div className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-400 uppercase bg-teal-900/30 rounded-full border border-teal-800">
            {project.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text leading-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            {project.subtitle}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
              >
                <Globe className="w-5 h-5" />
                Visit Live Site
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#1e293b] border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10" />
          <img
            src={getImage(project.images.hero)}
            alt={project.title}
            className="w-full object-cover"
          />
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Overview & Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-teal-500 rounded-full" />
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.overview}
              </p>
            </section>

            {/* Challenges */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-amber-500 rounded-full" />
                The Challenge
              </h3>
              <div className="space-y-6">
                {project.challenges.map((item, idx) => (
                  <div key={idx} className="bg-[#0f172a] p-6 rounded-xl border border-gray-800/50 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-amber-500/10 rounded-lg text-amber-500">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Solutions */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 rounded-full" />
                The Solution
              </h3>
              <div className="space-y-6">
                {project.solutions.map((item, idx) => (
                  <div key={idx} className="bg-[#0f172a] p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Key Features & Tech Stack */}
          <div className="space-y-10">
            
            {/* Tech Stack */}
            <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#1e293b] text-gray-300 text-sm rounded-md border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Info */}
            <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Date</div>
                  <div className="text-white font-medium">{project.date}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Role</div>
                  <div className="text-white font-medium">Full Stack Developer</div>
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
