import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wind, Sun } from 'lucide-react';
import { Language, Theme } from '../types';

interface CalmZenExperienceProps {
  lang: Language;
  calmMode: boolean;
  onToggleCalmMode: () => void;
  theme?: Theme;
}

export const CalmZenExperience: React.FC<CalmZenExperienceProps> = ({
  lang,
  calmMode,
  onToggleCalmMode,
  theme = 'dark',
}) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    if (!calmMode) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setBreathPhase((current) => {
            if (current === 'inhale') return 'hold';
            if (current === 'hold') return 'exhale';
            return 'inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [calmMode, breathPhase]);

  return (
    <section
      className={`w-full py-20 border-b relative overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-[#F6F8F7] border-[#D3DFD9] text-[#13221C]'
          : 'bg-[#121815] border-white/[0.06] text-[#F4F2EC]'
      }`}
    >
      {/* Subtle modern CORAM green and warm ivory ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-[#F4F2EC]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[450px] h-[300px] bg-[#3E6153]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E6153]/30 border border-[#3E6153]/60 text-[#F4F2EC] text-xs font-mono mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#6B9A86] ring-2 ring-[#6B9A86]/40 animate-pulse"></span>
          <span className="font-semibold">{isAr ? 'فلسفة الهدوء وتناغم الأخضر الطبي والعاجي' : 'PHILOSOPHY: CORAM SCRUB GREEN & WARM IVORY'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F2EC] mb-3 font-sans-modern">
          {isAr ? (
            <>
              «الهدوء ليس غياب القوة، بل هو <span className="text-[#6B9A86]">ذروة التحكم</span>»
            </>
          ) : (
            <>
              “Calmness is not the absence of power, it is the <span className="text-[#6B9A86]">zenith of control</span>.”
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-[#7C8380] max-w-xl mx-auto mb-10 font-sans leading-relaxed">
          {isAr
            ? 'تكامل هادئ يجمع بين نقاء العاجي الدافئ وحيوية الأخضر السريري لمؤسسة كورام، ليمنح تفكيراً نقياً في نمذجة الميكانيكا الحيوية والبرمجة.'
            : 'A tranquil harmony balancing warm ivory clarity with clinical scrub green vitality, channeling pure focus for orthopedic AI and code.'}
        </p>

        {/* Minimal Interactive Breathing Sphere */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={onToggleCalmMode}
            className={`relative w-40 h-40 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ${
              calmMode
                ? breathPhase === 'inhale'
                  ? 'scale-110 border-[#F4F2EC] bg-[#F4F2EC]/20 shadow-[0_0_50px_rgba(244,242,236,0.35)]'
                  : breathPhase === 'hold'
                  ? 'scale-105 border-[#6B9A86] bg-[#527D6C]/30 shadow-[0_0_40px_rgba(107,154,134,0.35)]'
                  : 'scale-95 border-[#3E6153] bg-[#1A221F] shadow-[0_0_25px_rgba(62,97,83,0.3)]'
                : 'border-[#3E6153]/40 bg-[#161D1A] hover:border-[#6B9A86]'
            }`}
          >
            {calmMode ? (
              <div className="text-center">
                <Wind className="w-5 h-5 text-[#F4F2EC] mx-auto mb-1 animate-pulse" />
                <div className="text-[11px] font-mono font-bold text-[#F4F2EC] uppercase tracking-wider">
                  {isAr
                    ? breathPhase === 'inhale'
                      ? 'شهيق عميق'
                      : breathPhase === 'hold'
                      ? 'ثبات الهدوء'
                      : 'زفير مسترخٍ'
                    : breathPhase}
                </div>
                <div className="text-xl font-mono text-[#6B9A86] font-bold mt-0.5">
                  {seconds}s
                </div>
              </div>
            ) : (
              <div className="text-center space-y-1">
                <Volume2 className="w-5 h-5 text-[#6B9A86] mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-xs font-mono text-[#F4F2EC] font-bold">
                  {isAr ? 'تفعيل الهدوء' : 'Enable Calm'}
                </div>
                <div className="text-[10px] text-[#6B9A86] font-mono">
                  {isAr ? 'نغمات استرخاء وتنفس' : 'CORAM Zen Audio'}
                </div>
              </div>
            )}
          </button>

          <div className="mt-4">
            <button
              onClick={onToggleCalmMode}
              className="text-xs font-mono text-[#6B9A86] hover:text-[#F4F2EC] transition-colors font-medium"
            >
              {calmMode
                ? (isAr ? 'إيقاف نغمات الهدوء' : 'Pause Ambient Sound')
                : (isAr ? 'تشغيل نغمات الهدوء والتنفس' : 'Activate Calm Sound & Breathing')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
