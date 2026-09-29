/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PatientPortal } from './components/PatientPortal';
import { PhysioAIStudio } from './components/PhysioAIStudio';
import { ProjectsSection } from './components/ProjectsSection';
import { AthleticAchievements } from './components/AthleticAchievements';
import { ProcessAndTools } from './components/ProcessAndTools';
import { CalmZenExperience } from './components/CalmZenExperience';
import { KindWords } from './components/KindWords';
import { ContactFooter } from './components/ContactFooter';
import { HegazyLetterModal } from './components/HegazyLetterModal';
import { RehabPlanBuilder } from './components/RehabPlanBuilder';
import { FullStackConsoleModal } from './components/FullStackConsoleModal';
import { calmAudio } from './utils/audioZen';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('rana_theme') as Theme;
    return saved === 'light' ? 'light' : 'dark';
  });
  const [calmMode, setCalmMode] = useState<boolean>(false);
  const [isHegazyModalOpen, setIsHegazyModalOpen] = useState<boolean>(false);
  const [isConsoleModalOpen, setIsConsoleModalOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('rana_theme', nextTheme);
  };

  const toggleCalmMode = () => {
    const newStatus = !calmMode;
    setCalmMode(newStatus);
    if (newStatus) {
      calmAudio.start();
    } else {
      calmAudio.stop();
    }
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F6F8F7] text-[#13221C]' : 'bg-[#121815] text-[#F4F2EC]'
      } ${
        lang === 'ar' ? 'font-arabic' : 'font-sans-modern'
      } selection:bg-[#3E6153] selection:text-[#F4F2EC] antialiased relative`}
    >
      {/* Sleek Minimal Header with Theme Toggle & Navigation */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        calmMode={calmMode}
        onToggleCalmMode={toggleCalmMode}
        onOpenHegazyModal={() => setIsHegazyModalOpen(true)}
        onOpenConsoleModal={() => setIsConsoleModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Portfolio Content */}
      <main className="relative">
        {/* Section 1: Minimalist Modern Hero with Portrait & Metrics */}
        <Hero
          lang={lang}
          theme={theme}
          onOpenHegazyModal={() => setIsHegazyModalOpen(true)}
          onOpenContactModal={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Dedicated Patient Area: Photo Upload & AI Camera Capture */}
        <PatientPortal lang={lang} theme={theme} />

        {/* Flagship: Physiotherapy & AI Studio (Upload, AI Live Camera, Reference Cases & Touch Canvas) */}
        <PhysioAIStudio lang={lang} theme={theme} />

        {/* Interactive Full-Stack AI Rehabilitation Program Builder */}
        <RehabPlanBuilder lang={lang} theme={theme} />

        {/* Section 2: Selected Works & Case Studies */}
        <ProjectsSection lang={lang} theme={theme} />

        {/* Section 3: Athletic Championship, Boxing Gold & Biomechanics Telemetry */}
        <AthleticAchievements lang={lang} theme={theme} />

        {/* Section 4: Engineering Methodology & Technical Stack */}
        <ProcessAndTools lang={lang} theme={theme} />

        {/* Section 5: Serene Yellow & Calm Mind Experience */}
        <CalmZenExperience
          lang={lang}
          theme={theme}
          calmMode={calmMode}
          onToggleCalmMode={toggleCalmMode}
        />

        {/* Section 6: Endorsements & Kind Words */}
        <KindWords lang={lang} theme={theme} />

        {/* Section 7: Minimalist Modern Footer & Direct Contact */}
        <ContactFooter lang={lang} theme={theme} />
      </main>

      {/* Dedicated Proposal Modal for Eng. Ibrahim Hegazy */}
      <HegazyLetterModal
        isOpen={isHegazyModalOpen}
        onClose={() => setIsHegazyModalOpen(false)}
        lang={lang}
      />

      {/* Live Full-Stack Engine & API Console Modal */}
      <FullStackConsoleModal
        isOpen={isConsoleModalOpen}
        onClose={() => setIsConsoleModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
