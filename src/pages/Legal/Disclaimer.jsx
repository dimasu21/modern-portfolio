import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function Disclaimer() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-theme-bg text-gray-300 pt-32 pb-16 px-4">
      <SEO title="Disclaimer" description="Disclaimer for Dimas Tri Mulyo's Portfolio" />
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert lg:prose-xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8">
            {t("disclaimer.title")}
          </h1>
          
          <div className="space-y-6 text-gray-400">
            <p>{t("disclaimer.intro")}</p> 

            <h3 className="text-white text-xl font-semibold mt-6 mb-2">1. Educational Purpose</h3>
            <p>{t("disclaimer.educational")}</p>

            <h3 className="text-white text-xl font-semibold mt-6 mb-2">2. No Guarantee</h3>
            <p>{t("disclaimer.guarantee")}</p>

            <h3 className="text-white text-xl font-semibold mt-6 mb-2">3. External Links</h3>
            <p>{t("disclaimer.links")}</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
