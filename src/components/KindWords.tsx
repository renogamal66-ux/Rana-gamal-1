import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Volume2 } from 'lucide-react';
import { Language, Theme } from '../types';
import { playImageSound } from '../utils/imageSound';

interface KindWordsProps {
  lang: Language;
  theme?: Theme;
}

export const KindWords: React.FC<KindWordsProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';

  const reviews = [
    {
      quote: isAr
        ? 'رنا تجمع بين عقلية البطلة الرياضية التي لا تستسلم، والفهم العميق لخوارزميات الذكاء الاصطناعي والميكانيكا الحيوية.'
        : 'Rana brings a championship mindset: relentless endurance, sharp analytical clarity, and deep medical AI domain depth.',
      name: isAr ? 'م. إبراهيم حجازي' : 'Eng. Ibrahim Hegazy',
      role: isAr ? 'قائد تقني وموجه هندسي' : 'Senior Tech Lead & Engineering Mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote: isAr
        ? 'تحليلها لبيانات العلاج الطبيعي ودمجها في واجهات هادئة كان عاملاً حاسماً في نجاح مشروعنا السريري. موهبة استثنائية.'
        : 'Her integration of physical therapy data into clean, serene interfaces was instrumental for our clinical recovery project.',
      name: isAr ? 'د. صوفيا لي' : 'Dr. Sofia Lee',
      role: isAr ? 'أخصائية تأهيل حركي وعظام' : 'Orthopedic & Kinematic Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote: isAr
        ? 'دقيقة، منظمة، وتعمل بهدوء يبعث على الثقة. تسليماتها البرمجية تتمتع بنقاء كودي متميز وتصميم بصري فائق التناسق.'
        : 'Precise, calm, and dependable. Her code is impeccably organized and her UI systems reflect high aesthetic maturity.',
      name: isAr ? 'دانيال ر.' : 'Daniel Rostova',
      role: isAr ? 'مدير منتجات ذكاء اصطناعي' : 'AI Product Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section
      className={`w-full py-20 border-b relative transition-colors duration-300 ${
        isLight
          ? 'bg-[#F6F8F7] border-[#D3DFD9] text-[#13221C]'
          : 'bg-[#121815] border-[#2F3E3C]/30 text-[#F4F2EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-[#2F3E3C] mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#BDDBD1] uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#BDDBD1] animate-pulse"></span>
            <span>{isAr ? 'شهادات وتعليقات مهنية' : 'ENDORSEMENTS & COLLABORATIONS'}</span>
            <span className="px-2 py-0.5 rounded-full bg-[#2F3E3C] border border-[#BDDBD1]/40 text-[#BDDBD1] text-[10px] lowercase font-semibold">
              Coram & Physio
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-sans-modern">
            {isAr ? 'آراء من شركاء العمل والموجهين' : 'Words From Collaborators & Mentors'}
          </h2>
        </div>

        {/* 3-Column Modern Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-6 group hover:shadow-xl ${
                isLight
                  ? 'bg-white border-[#D3DFD9] hover:border-[#2F5A49]'
                  : 'bg-[#161D1A] border-[#2F3E3C] hover:border-[#BDDBD1]'
              }`}
            >
              <div className="space-y-3">
                <Quote className="w-5 h-5 text-[#BDDBD1] opacity-80 group-hover:scale-110 transition-transform" />
                <p className="text-xs sm:text-sm text-[#F4F2EC]/80 leading-relaxed font-sans">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#2F3E3C]">
                <motion.button
                  type="button"
                  title={isAr ? 'انقر للاستماع إلى الصوت' : 'Click to play chime'}
                  onClick={() => playImageSound('avatar')}
                  whileHover={{ scale: 1.18, rotate: [0, -4, 4, 0] }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3 + idx * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#BDDBD1] ring-2 ring-[#2F3E3C] flex-shrink-0 cursor-pointer relative shadow-md"
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute inset-0 bg-[#BDDBD1]/0 hover:bg-[#BDDBD1]/20 transition-colors flex items-center justify-center">
                    <Volume2 className="w-3.5 h-3.5 text-[#121815] opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 rounded-full p-0.5" />
                  </span>
                </motion.button>
                <div>
                  <div className="text-xs font-bold text-[#F4F2EC] tracking-wide">{item.name}</div>
                  <div className="text-[10px] text-[#BDDBD1] font-mono">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
