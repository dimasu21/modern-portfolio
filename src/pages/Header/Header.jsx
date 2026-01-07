import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaBars,
  FaConciergeBell,
  FaComments,
  FaChevronDown,
  FaLayerGroup,
  FaPen,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const [activeLink, setActiveLink] = useState(() => {
    const path = location.pathname.substring(1) || "home";
    return path;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Main nav links (shown directly in navbar)
  const mainNavLinks = [
    { id: "home", icon: FaHome, textKey: "nav.home", path: "/" },
    { id: "blog", icon: FaPen, textKey: "nav.blog", path: "/blog" },
    { id: "projects", icon: FaLaptopCode, textKey: "nav.projects", path: "/projects" },
  ];

  // Dropdown links (Skills, Experience, Certificate, Service, Guestbook, Contact)
  const dropdownLinks = [
    { id: "skills", icon: FaCode, textKey: "nav.skills", path: "/skills" },
    { id: "experience", icon: FaBriefcase, textKey: "nav.experience", path: "/experience" },
    { id: "certificate", icon: FaGraduationCap, textKey: "nav.certificate", path: "/certificate" },
    { id: "service", icon: FaConciergeBell, textKey: "nav.service", path: "/service" },
    { id: "guestbook", icon: FaComments, textKey: "nav.guestbook", path: "/guestbook" },
    { id: "contact", icon: FaEnvelope, textKey: "nav.contact", path: "/contact" },
  ];

  // All links for mobile menu
  const allNavLinks = [
    { id: "home", icon: FaHome, textKey: "nav.home", path: "/" },
    { id: "blog", icon: FaPen, textKey: "nav.blog", path: "/blog" },
    { id: "skills", icon: FaCode, textKey: "nav.skills", path: "/skills" },
    { id: "experience", icon: FaBriefcase, textKey: "nav.experience", path: "/experience" },
    { id: "certificate", icon: FaGraduationCap, textKey: "nav.certificate", path: "/certificate" },
    { id: "projects", icon: FaLaptopCode, textKey: "nav.projects", path: "/projects" },
    { id: "service", icon: FaConciergeBell, textKey: "nav.service", path: "/service" },
    { id: "guestbook", icon: FaComments, textKey: "nav.guestbook", path: "/guestbook" },
    { id: "contact", icon: FaEnvelope, textKey: "nav.contact", path: "/contact" },
  ];

  // Check if any dropdown link is active
  const isDropdownActive = dropdownLinks.some(link => link.id === activeLink);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        <div className="p-[1px] md:rounded-none bg-[#eff1f5]">
          <nav className="bg-theme-bg backdrop-blur-md md:rounded-none px-4 md:px-6 py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden px-2">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">Dimas Tri M</span>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white p-2"
                >
                  <FaBars />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
              <div className="flex flex-col gap-2 py-4">
                {allNavLinks.map(({ id, icon: Icon, textKey, path }) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => {
                      setActiveLink(id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-300 flex items-center gap-2
                      hover:bg-[#eff1f5]/10 
                      ${activeLink === id
                        ? "bg-[#eff1f5]/15 text-white"
                        : "text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <Icon className={`text-base ${activeLink === id ? "scale-110" : ""}`} />
                    <span className="inline">{t(textKey)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex flex-row items-center gap-1 lg:gap-2">
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => setActiveLink("home")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium
                    transition-all duration-300 flex items-center gap-2
                    hover:bg-[#eff1f5]/10 
                    ${activeLink === "home"
                      ? "bg-[#eff1f5]/15 text-white"
                      : "text-gray-300 hover:text-white"
                    }
                  `}
                >
                  <FaHome className={`text-base ${activeLink === "home" ? "scale-110" : ""}`} />
                  <span>{t("nav.home")}</span>
                </Link>

                {/* More Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2
                      hover:bg-[#eff1f5]/10 
                      ${isDropdownActive
                        ? "bg-[#eff1f5]/15 text-white"
                        : "text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <FaLayerGroup className="text-base" />
                    <span>More</span>
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 py-2 bg-theme-card rounded-none border-2 border-[#eff1f5] shadow-[4px_4px_0px_0px_rgba(239,241,245,1)]">
                      {dropdownLinks.map(({ id, icon: Icon, textKey, path }) => (
                        <Link
                          key={id}
                          to={path}
                          onClick={() => {
                            setActiveLink(id);
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-2.5 text-sm font-medium
                            transition-all duration-300 flex items-center gap-3
                            hover:bg-[#eff1f5]/10 
                            ${activeLink === id
                              ? "bg-[#eff1f5]/10 text-white"
                              : "text-gray-300 hover:text-white"
                            }
                          `}
                        >
                          <Icon className={`text-base ${activeLink === id ? "text-white" : ""}`} />
                          <span>{t(textKey)}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Blog Link */}
                <Link
                  to="/blog"
                  onClick={() => setActiveLink("blog")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium
                    transition-all duration-300 flex items-center gap-2
                    hover:bg-[#eff1f5]/10 
                    ${activeLink === "blog"
                      ? "bg-[#eff1f5]/15 text-white"
                      : "text-gray-300 hover:text-white"
                    }
                  `}
                >
                  <FaPen className={`text-base ${activeLink === "blog" ? "scale-110" : ""}`} />
                  <span>{t("nav.blog")}</span>
                </Link>

                {/* Projects Link */}
                <Link
                  to="/projects"
                  onClick={() => setActiveLink("projects")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium
                    transition-all duration-300 flex items-center gap-2
                    hover:bg-[#eff1f5]/10 
                    ${activeLink === "projects"
                      ? "bg-[#eff1f5]/15 text-white"
                      : "text-gray-300 hover:text-white"
                    }
                  `}
                >
                  <FaLaptopCode className={`text-base ${activeLink === "projects" ? "scale-110" : ""}`} />
                  <span>{t("nav.projects")}</span>
                </Link>

                
                {/* Desktop Language Toggle & Theme Toggle */}
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-700/50">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}
