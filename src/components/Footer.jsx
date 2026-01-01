import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import VisitCounter from "./VisitCounter";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/dimasu21",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dimas-tri-mulyo-1283a5392/",
      icon: Linkedin,
    },
    {
      name: "Whatsapp",
      href: "https://wa.me/qr/CMB7MS5HTX2VB1",
      icon: BsWhatsapp,
    },
    {
      name: "Email",
      href: "mailto:dimastry21@gmail.com",
      icon: Mail,
    },
  ];

  const navLinks = [
    { name: t("nav.skills"), href: "/skills" },
    { name: t("nav.experience"), href: "/experience" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.certificate"), href: "/certificate" },
    { name: t("nav.guestbook"), href: "/guestbook" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[#04081A] text-white py-12 md:py-16 border-t border-gray-800/50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Logo/Name Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            dimasu.dev
          </h2>
        </div>

        {/* Social Icons - Circular Style */}
        <div className="flex gap-4 mb-10">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target={social.name !== "Email" ? "_blank" : undefined}
              rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
              className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.name}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-start gap-x-2 gap-y-3 mb-8">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.name}>
            <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.href);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 uppercase tracking-wider cursor-pointer"
              >
                {link.name}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-gray-600">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Visit Counter */}
        <div className="mb-6">
          <VisitCounter />
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2026 Dimas Tri M. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
