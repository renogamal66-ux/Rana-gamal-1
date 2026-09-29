import React, { useState } from 'react';
import { ArrowUpRight, Activity, Cpu, Layers, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Language, ProjectItem, Theme } from '../types';
import { PROJECTS } from '../data';
import { InteractiveMovingImage } from './InteractiveMovingImage';

interface ProjectsSectionProps {
  lang: Language;
  theme?: Theme;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'medical' | 'rehab' | 'sports'>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filters = [
    { id: 'all', label: isAr ? 'كافة المشاريع' : 'All Works' },
    { id: 'medical', label: isAr ? 'الذكاء الاصطناعي الطبي' : 'Medical AI' },
    { id: 'rehab', label: isAr ? 'التأهيل والعلاج الطبيعي' : 'Rehab & Biomechanics' },
    { id: 'sports', label: isAr ? 'الملاكمة والرياضة' : 'Athletic Telemetry' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'medical') return p.category === 'medical_ai';
    if (selectedFilter === 'rehab') return p.category === 'physical_therapy';
    if (selectedFilter === 'sports') return p.category === 'sports_tech';
    return true;
  });

  return (
    <section
      id="work"
      className={`w-full py-20 border-b relative transition-colors duration-300 ${
        isLight
          ? 'bg-[#F6F8F7] border-[#D3DFD9] text-[#13221C]'
          : 'bg-[#121815] border-white/[0.06] text-[#F4F2EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#3E6153]/30 mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#BDDBD1] uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{isAr ? 'المشاريع الهندسية والسريرية' : 'FEATURED WORKS & CASE STUDIES'}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#2F3E3C] border border-[#BDDBD1]/40 text-[#BDDBD1] text-[10px] font-semibold">
                #2F3E3C & #BDDBD1
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-sans-modern">
              {isAr ? 'نماذج وأنظمة تم تطويرها بدقة' : 'Engineered with Precision & Purpose'}
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div
            className={`flex items-center gap-1.5 p-1 rounded-xl border self-start md:self-auto overflow-x-auto max-w-full ${
              isLight ? 'bg-white border-[#D3DFD9]' : 'bg-[#161D1A] border-[#2F3E3C]'
            }`}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? 'bg-[#2F3E3C] text-[#BDDBD1] font-bold border border-[#BDDBD1]/50 shadow-sm'
                    : 'text-[#7C8380] hover:text-[#BDDBD1] hover:bg-[#2F3E3C]/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl ${
                isLight
                  ? 'bg-white border-[#D3DFD9] hover:border-[#2F5A49]'
                  : 'bg-[#161D1A] border-[#2F3E3C] hover:border-[#BDDBD1]'
              }`}
            >
              {/* Image Container with sleek badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121815]">
                <InteractiveMovingImage
                  src={project.image}
                  alt={isAr ? project.title.ar : project.title.en}
                  soundProfile={
                    project.category === 'sports_tech'
                      ? 'boxing'
                      : project.category === 'physical_therapy'
                      ? 'rehab'
                      : 'medical'
                  }
                  floatingDistance={5 + (idx % 3) * 2}
                  floatingDuration={4.2 + (idx % 3) * 0.7}
                  enableTilt={true}
                  enableDrag={true}
                  badgeLabel={
                    project.category === 'sports_tech'
                      ? isAr
                        ? '🥊 صدى الملاكمة'
                        : '🥊 Boxing Telemetry'
                      : project.category === 'physical_therapy'
                      ? isAr
                        ? '🌿 صدى الميكانيكا'
                        : '🌿 Biomechanics AI'
                      : isAr
                      ? '🔬 نبض طبي ذكي'
                      : '🔬 Medical AI Scan'
                  }
                  containerClassName="w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                  {/* Top Number & Tag */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F4F2EC] backdrop-blur-md border border-white font-mono text-xs font-bold text-[#121815] shadow-sm">
                      {project.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#2F3E3C]/95 backdrop-blur-md border border-[#BDDBD1]/40 font-mono text-[10px] uppercase text-[#BDDBD1] font-semibold">
                      {isAr ? project.subtitle.ar : project.subtitle.en}
                    </span>
                  </div>
                </InteractiveMovingImage>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-base font-bold transition-colors tracking-tight ${
                        isLight
                          ? 'text-[#13221C] group-hover:text-[#2F5A49]'
                          : 'text-[#F4F2EC] group-hover:text-[#BDDBD1]'
                      }`}
                    >
                      {isAr ? project.title.ar : project.title.en}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#7C8380] group-hover:text-[#BDDBD1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <p className="text-xs text-[#7C8380] mt-2 line-clamp-2 leading-relaxed">
                    {isAr ? project.description.ar : project.description.en}
                  </p>
                </div>

                {/* Metrics Pill Grid */}
                <div
                  className={`grid grid-cols-2 gap-2 pt-3 border-t ${
                    isLight ? 'border-[#E8EFEA]' : 'border-[#2F3E3C]'
                  }`}
                >
                  {project.metrics?.slice(0, 2).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className={`p-2 rounded-lg border transition-colors ${
                        isLight
                          ? 'bg-[#F6F8F7] border-[#D3DFD9]'
                          : 'bg-[#121815] border-[#2F3E3C] group-hover:border-[#BDDBD1]/50'
                      }`}
                    >
                      <div className="text-xs font-mono font-bold text-[#BDDBD1]">{m.value}</div>
                      <div className="text-[10px] text-[#7C8380] truncate">
                        {isAr ? m.label.ar : m.label.en}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        isLight
                          ? 'bg-[#F0F5F2] text-[#2C4D40] border-[#D3DFD9]'
                          : 'bg-[#2F3E3C]/50 text-[#BDDBD1] border-[#BDDBD1]/20'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 ${
              isLight ? 'bg-white border-[#D3DFD9] text-[#13221C]' : 'bg-[#161D1A] border-[#2F3E3C] text-[#F4F2EC]'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#3E6153]/30">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#BDDBD1] font-bold">
                  {isAr ? activeModalProject.subtitle.ar : activeModalProject.subtitle.en}
                </span>
                <h3 className="text-xl font-bold mt-1">
                  {isAr ? activeModalProject.title.ar : activeModalProject.title.en}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl bg-[#2F3E3C] text-[#BDDBD1] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <p className="text-[#7C8380] leading-relaxed">
                {isAr ? activeModalProject.description.ar : activeModalProject.description.en}
              </p>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  className={`p-3.5 rounded-2xl border ${
                    isLight ? 'bg-[#F6F8F7] border-[#D3DFD9]' : 'bg-[#121815] border-[#2F3E3C]'
                  }`}
                >
                  <div className="font-bold text-[#BDDBD1] mb-1 font-mono">
                    {isAr ? 'التحدي السريري:' : 'Clinical Challenge:'}
                  </div>
                  <p className="text-xs text-[#7C8380] leading-relaxed">
                    {isAr ? activeModalProject.details.problem.ar : activeModalProject.details.problem.en}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#2F3E3C]/30 border border-[#BDDBD1]/30">
                  <div className="font-bold text-[#BDDBD1] mb-1 font-mono">
                    {isAr ? 'الحل البرمجي والهندسي:' : 'AI Engineering Solution:'}
                  </div>
                  <p className="text-xs text-[#7C8380] leading-relaxed">
                    {isAr ? activeModalProject.details.solution.ar : activeModalProject.details.solution.en}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[11px] font-mono text-[#BDDBD1] font-bold uppercase block mb-1.5">
                  {isAr ? 'التقنيات المستخدمة:' : 'Tech Stack:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.details.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#2F3E3C]/60 text-[#BDDBD1] border border-[#BDDBD1]/30 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#3E6153]/30 flex justify-end">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2 rounded-xl bg-[#2F3E3C] hover:bg-[#3E6153] text-[#BDDBD1] text-xs font-mono font-bold"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
