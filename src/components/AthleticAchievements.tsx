import React, { useState } from 'react';
import { Award, Flame, Heart, Zap, Play, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language, Theme } from '../types';
import { ASSETS } from '../data';
import { InteractiveMovingImage } from './InteractiveMovingImage';

interface AthleticAchievementsProps {
  lang: Language;
  theme?: Theme;
}

export const AthleticAchievements: React.FC<AthleticAchievementsProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';
  const [activeMode, setActiveMode] = useState<'boxing' | 'physio' | 'calm'>('boxing');
  const [isSimulating, setIsSimulating] = useState(false);
  const [punchVelocity, setPunchVelocity] = useState(11.8);
  const [reactionTime, setReactionTime] = useState(142);
  const [calmIndex, setCalmIndex] = useState(96);

  const runSimulation = () => {
    setIsSimulating(true);
    const interval = setInterval(() => {
      setPunchVelocity(+(11.2 + Math.random() * 1.5).toFixed(1));
      setReactionTime(Math.floor(130 + Math.random() * 25));
      setCalmIndex(Math.floor(94 + Math.random() * 5));
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <section
      id="discipline"
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
              <span className="w-2 h-2 rounded-full bg-[#BDDBD1] animate-pulse"></span>
              <span>{isAr ? 'الانضباط والبطولة الرياضية' : 'ATHLETIC CHAMPIONSHIP & DISCIPLINE'}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#2F3E3C] border border-[#BDDBD1]/40 text-[#BDDBD1] text-[10px] font-semibold">#2F3E3C & #BDDBD1</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F2EC] font-sans-modern">
              {isAr ? (
                <>
                  بطلة جمهورية في الملاكمة: <span className="text-[#BDDBD1]">هدوء وتركيز فائق</span>
                </>
              ) : (
                <>
                  Republic Boxing Gold: <span className="text-[#BDDBD1]">Calm Mind, Relentless Execution</span>
                </>
              )}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#7C8380] max-w-md font-sans leading-relaxed">
            {isAr
              ? 'الملاكمة علمتني الصمود التام تحت الضغط، بينما ممارسة العلاج الطبيعي عمّقت فهمي للميكانيكا الحيوية للجسد البشري.'
              : 'Championship boxing forged mental resilience and composure under pressure, while clinical physical therapy grounded my algorithms in human biomechanics.'}
          </p>
        </div>

        {/* 2-Column Minimal Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase Card (Span 5) */}
          <div
            className={`lg:col-span-5 relative rounded-2xl overflow-hidden border p-2.5 transition-all ${
              isLight
                ? 'border-[#D3DFD9] bg-white ring-1 ring-[#BDDBD1]/30 shadow-md'
                : 'border-[#2F3E3C] bg-[#161D1A] ring-1 ring-[#BDDBD1]/10'
            }`}
          >
            <InteractiveMovingImage
              src={ASSETS.boxingAiImg}
              alt="Boxing Championship Analytics"
              soundProfile="boxing"
              floatingDistance={8}
              floatingDuration={4.8}
              enableTilt={true}
              enableDrag={true}
              badgeLabel={isAr ? '🥊 صوت الملاكمة والقوة' : '🥊 Championship Impact'}
              containerClassName="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#121815]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#121815]/95 via-transparent to-[#121815]/20 pointer-events-none" />

              {/* Gold Badge Overlay */}
              <div className="absolute top-4 left-4 p-2.5 rounded-xl backdrop-blur-md bg-[#2F3E3C]/95 border border-[#BDDBD1]/40 flex items-center gap-2.5 shadow-md pointer-events-none z-20">
                <Award className="w-4 h-4 text-[#BDDBD1]" />
                <div>
                  <div className="text-xs font-bold text-[#F4F2EC] uppercase tracking-wider">
                    {isAr ? 'ذهبية بطولة الجمهورية' : 'Republic Gold Medalist'}
                  </div>
                  <div className="text-[10px] text-[#BDDBD1] font-mono font-semibold">
                    {isAr ? 'الاتحاد المصري للملاكمة' : 'Egyptian Boxing Federation'}
                  </div>
                </div>
              </div>

              {/* Bottom Quote inside frame */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-[#121815]/90 border border-[#2F3E3C] text-xs text-[#F4F2EC] pointer-events-none z-20">
                <div className="flex items-center gap-1.5 text-[#BDDBD1] font-mono font-bold text-[11px] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BDDBD1]" />
                  <span>{isAr ? 'القوة والأنوثة الرياضية' : 'Precision & Athletic Grace'}</span>
                </div>
                <p className="text-[#F4F2EC]/80 text-[11px] leading-relaxed">
                  {isAr
                    ? 'الأنوثة لا تتعارض مع القوة، بل تمنحها بعداً من الرشاقة والانضباط والتفوق الذهني.'
                    : 'Femininity harmonizes with power, bringing graceful discipline, strategy, and mental supremacy.'}
                </p>
              </div>
            </InteractiveMovingImage>
          </div>

          {/* Interactive Combat & Biomechanics Lab (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode Switcher */}
            <div
              className={`flex items-center gap-2 p-1.5 rounded-xl border ${
                isLight ? 'bg-white border-[#D3DFD9]' : 'bg-[#161D1A] border-[#2F3E3C]'
              }`}
            >
              <button
                onClick={() => setActiveMode('boxing')}
                className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                  activeMode === 'boxing'
                    ? 'bg-[#F4F2EC] text-[#121815] font-bold shadow-md'
                    : 'text-[#7C8380] hover:text-[#BDDBD1]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{isAr ? 'انضباط الحلبة' : 'Boxing Grit'}</span>
              </button>
              <button
                onClick={() => setActiveMode('physio')}
                className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                  activeMode === 'physio'
                    ? 'bg-[#2F3E3C] text-[#BDDBD1] font-bold border border-[#BDDBD1]/50 shadow-md shadow-[#2F3E3C]/50'
                    : 'text-[#7C8380] hover:text-[#BDDBD1] hover:bg-[#2F3E3C]/40'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>{isAr ? 'العلاج الطبيعي (CORAM)' : 'Physical Therapy'}</span>
              </button>
              <button
                onClick={() => setActiveMode('calm')}
                className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                  activeMode === 'calm'
                    ? 'bg-[#3E6153] text-[#F4F2EC] font-bold shadow-md'
                    : 'text-[#7C8380] hover:text-[#BDDBD1]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isAr ? 'الهدوء والسكينة' : 'Calm & Sage'}</span>
              </button>
            </div>

            {/* Dynamic Telemetry Box */}
            <div className="p-6 rounded-2xl bg-[#161D1A] border border-[#2F3E3C] space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#F4F2EC]">
                    {activeMode === 'boxing' && (isAr ? 'مؤشرات الأداء القتالي وسرعة الضربات' : 'Combat Telemetry & Punch Metrics')}
                    {activeMode === 'physio' && (isAr ? 'مؤشرات الاستشفاء العضلي والتأهيل الحركي' : 'Muscle Recovery & Kinematic Range')}
                    {activeMode === 'calm' && (isAr ? 'مؤشر الهدوء الذهني والصفاء العصبي' : 'Calm Mind & Neural Stability')}
                  </h3>
                  <p className="text-xs text-[#7C8380] font-mono mt-0.5">
                    {isAr ? 'تحليل حركي يدمج العلوم الرياضية برؤية الحاسوب' : 'Real-time telemetry fusing sports science and computer vision'}
                  </p>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2F3E3C] text-[#BDDBD1] hover:bg-[#BDDBD1] hover:text-[#121815] border border-[#BDDBD1]/40 font-bold text-xs font-mono transition-colors active:scale-95 shadow-sm"
                >
                  {isSimulating ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAr ? 'محاكاة' : 'Simulate'}</span>
                </button>
              </div>

              {/* Telemetry numbers */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] hover:border-[#BDDBD1] transition-colors">
                  <div className="text-[11px] font-mono text-[#7C8380] mb-1">
                    {isAr ? 'سرعة اللكمة (م/ث)' : 'Punch Velocity'}
                  </div>
                  <div className="text-xl font-bold font-mono text-[#BDDBD1]">
                    {punchVelocity} <span className="text-xs text-[#BDDBD1]/80 font-sans">m/s</span>
                  </div>
                  <div className="text-[10px] text-[#BDDBD1] font-mono mt-1 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#BDDBD1]" />
                    <span>{isAr ? 'مستوى بطولي' : 'Championship Grade'}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] hover:border-[#BDDBD1] transition-colors">
                  <div className="text-[11px] font-mono text-[#7C8380] mb-1">
                    {isAr ? 'زمن الاستجابة' : 'Reaction Time'}
                  </div>
                  <div className="text-xl font-bold font-mono text-[#BDDBD1]">
                    {reactionTime} <span className="text-xs text-[#BDDBD1]/80 font-sans">ms</span>
                  </div>
                  <div className="text-[10px] text-[#BDDBD1] font-mono mt-1 font-semibold">
                    {isAr ? 'نخبة الرياضيين' : 'Top 1% Elite Speed'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] hover:border-[#BDDBD1] transition-colors">
                  <div className="text-[11px] font-mono text-[#7C8380] mb-1">
                    {isAr ? 'معدل الهدوء' : 'Zen Focus Score'}
                  </div>
                  <div className="text-xl font-bold font-mono text-[#BDDBD1]">
                    {calmIndex}%
                  </div>
                  <div className="text-[10px] text-[#BDDBD1]/90 font-mono mt-1 font-semibold">
                    {isAr ? 'استقرار عصبي' : 'Optimal Neural Flow'}
                  </div>
                </div>
              </div>

              {/* Explanatory bullet points */}
              <div className="space-y-2 pt-2 border-t border-[#2F3E3C] text-xs text-[#F4F2EC]/80">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BDDBD1] mt-1.5 flex-shrink-0"></span>
                  <span>
                    {isAr
                      ? 'خبرة عملية موثقة في تشريح الأربطة، العضلات الهيكلية، وبروتوكولات التأهيل الطبي بعد الإصابات الرياضية.'
                      : 'Extensive hands-on expertise in ligament biomechanics, skeletal muscles, and post-trauma physical therapy rehabilitation protocols.'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BDDBD1] mt-1.5 flex-shrink-0"></span>
                  <span>
                    {isAr
                      ? 'التناغم بين الهدوء والأخضر الطبي والعاجي و#2F3E3C و#BDDBD1 يمنحني صبراً واستيعاباً عميقاً لحل أعقد مشكلات الذكاء الاصطناعي.'
                      : 'The harmony of calm, deep spruce #2F3E3C and luminous celadon mint #BDDBD1 provides deep focus and clarity for solving complex machine learning challenges.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
