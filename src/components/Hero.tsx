import React, { useState } from 'react';
import { ArrowDown, Sparkles, Award, Terminal, HeartPulse, Copy, Check, MapPin, Camera } from 'lucide-react';
import { Language, Theme } from '../types';
import { ASSETS } from '../data';
import { InteractiveMovingImage } from './InteractiveMovingImage';
import { EscapingWordsGarden } from './EscapingWordsGarden';

interface HeroProps {
  lang: Language;
  theme?: Theme;
  onOpenHegazyModal: () => void;
  onOpenContactModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  theme = 'dark',
  onOpenHegazyModal,
  onOpenContactModal,
}) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rana.gamal.ai@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      className={`relative w-full pt-12 pb-20 overflow-hidden bg-grid-pattern border-b transition-colors duration-300 ${
        isLight
          ? 'bg-[#F6F8F7] border-[#D3DFD9] text-[#13221C]'
          : 'bg-[#121815] border-[#3E6153]/20 text-[#F4F2EC]'
      }`}
    >
      {/* Ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#3E6153]/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-calm-glow" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[320px] bg-[#2F3E3C]/30 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tagline Pill & Exact CORAM Color Swatches Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-mono shadow-xs ${
              isLight
                ? 'bg-white/90 border-[#D3DFD9] text-[#13221C]'
                : 'bg-[#1A221F]/90 border-[#3E6153]/50 text-[#F4F2EC]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-[#BDDBD1]/40 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {isAr
                ? 'ذكاء اصطناعي طبي • علاج طبيعي وتأهيل حركي • بطلة ملاكمة'
                : 'MEDICAL AI • BIOMECHANICS • REPUBLIC BOXING GOLD'}
            </span>
          </div>

          {/* Authentic CORAM Orthopedic & Physio Color Swatches */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono shadow-xs ${
              isLight
                ? 'bg-white border-[#D3DFD9] text-[#566E64]'
                : 'bg-[#161D1A] border-[#2F3E3C] text-[#BDDBD1]'
            }`}
          >
            <span className="text-[10px] uppercase font-semibold">
              {isAr ? 'باليتة الألوان المعتمدة' : 'Clinical Palette'}:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#2F3E3C] border border-[#BDDBD1]/50 shadow-xs" title="#2F3E3C - Deep Spruce" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#3E6153] border border-white/20 shadow-xs" title="#3E6153 - Scrub Green" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#BDDBD1] border border-black/20 shadow-xs" title="#BDDBD1 - Celadon Mint" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F4F2EC] border border-black/20 shadow-xs" title="#F4F2EC - Warm Ivory" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#7C8380] border border-white/20 shadow-xs" title="#7C8380 - Slate Mineral Gray" />
            </div>
            <span className="text-[10px] font-semibold hidden sm:inline opacity-80">
              #2F3E3C • #3E6153 • #BDDBD1
            </span>
          </div>
        </div>

        {/* Main Grid: Asymmetric 2-Column Minimal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Minimalist Typography & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] font-sans-modern">
              {isAr ? (
                <>
                  أصمم نظم <span className="text-[#BDDBD1]">ذكاء اصطناعي طبي</span> وتجارب رقمية بهدوء ودقة رياضية.
                </>
              ) : (
                <>
                  Engineering <span className="text-[#BDDBD1]">Medical AI</span> & <span className="underline decoration-[#BDDBD1] decoration-2 underline-offset-8">Calm Digital</span> Systems.
                </>
              )}
            </h1>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl font-sans ${
                isLight ? 'text-[#2C4D40]' : 'text-[#F4F2EC]/85'
              }`}
            >
              {isAr ? (
                'أنا رنا جمال (20 عاماً)، طالبة حاسبات ومعلومات وباحثة ذكاء اصطناعي طبي، بطلة جمهورية في الملاكمة، وممارسة متمرسة في العلاج الطبيعي والتأهيل الحركي. أدمج الرؤية الحاسوبية والميكانيكا الحيوية مع واجهات هادئة وعالية الكفاءة مستلهمة من باليتة العظام والعلاج الطبيعي.'
              ) : (
                "I'm Rana Gamal, a 20-year-old Computer Science & AI researcher, Egyptian Republic Boxing Gold Medalist, and clinical physical therapy practitioner. I bridge computer vision, musculoskeletal biomechanics, and serene human interfaces crafted with orthopedic & clinical elegance."
              )}
            </p>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Dedicated Patient Portal CTA */}
              <a
                href="#patient-portal"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-black font-bold text-xs uppercase tracking-wider font-mono shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all active:scale-95"
              >
                <Camera className="w-4 h-4 text-black" />
                <span>{isAr ? 'بوابة المرضى: رفع وتصوير بالكاميرا ✦' : 'Patient Area: Upload & AI Camera ✦'}</span>
              </a>

              {/* Physio AI Studio CTA */}
              <a
                href="#physio-ai"
                className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider font-mono transition-all active:scale-95 border ${
                  isLight
                    ? 'bg-white hover:bg-[#E8EFEA] text-[#13221C] border-[#D3DFD9]'
                    : 'bg-[#2F3E3C] hover:bg-[#3E6153] text-[#BDDBD1] border-[#BDDBD1]/40'
                }`}
              >
                <HeartPulse className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'مختبر الذكاء الطبي' : 'Physio AI Studio'}</span>
              </a>

              <a
                href="#work"
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 border ${
                  isLight
                    ? 'bg-white hover:bg-[#E8EFEA] text-[#13221C] border-[#D3DFD9]'
                    : 'bg-[#F4F2EC] hover:bg-[#BDDBD1] text-[#121815] border-transparent'
                }`}
              >
                <span>{isAr ? 'استعراض المشاريع' : 'Explore Projects'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenHegazyModal}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#2F3E3C] hover:bg-[#3E6153] text-[#BDDBD1] hover:text-white font-bold text-xs font-mono tracking-wide transition-all active:scale-95 border border-[#BDDBD1]/40"
              >
                <Sparkles className="w-4 h-4 text-[#BDDBD1]" />
                <span>{isAr ? 'رسالة م. إبراهيم ✦' : 'Eng. Hegazy ✦'}</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 px-3.5 py-3.5 rounded-xl border text-xs font-mono transition-all ${
                  isLight
                    ? 'bg-white border-[#D3DFD9] text-[#13221C] hover:border-[#2F5A49]'
                    : 'bg-[#1A221F] border-[#2F3E3C] text-[#F4F2EC] hover:border-[#BDDBD1]'
                }`}
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#7C8380]" />}
                <span>{copiedEmail ? (isAr ? 'تم النسخ!' : 'Copied!') : 'Email'}</span>
              </button>
            </div>

            {/* Minimal Bento Metric Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#3E6153]/30 max-w-xl">
              <div
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isLight ? 'bg-white border-[#D3DFD9]' : 'bg-[#2F3E3C]/70 border-[#2F3E3C]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#BDDBD1] font-mono font-bold text-lg sm:text-xl">
                  <Award className="w-4 h-4 text-[#BDDBD1]" />
                  <span className={isLight ? 'text-[#13221C]' : 'text-[#F4F2EC]'}>01</span>
                </div>
                <div className="text-[11px] text-[#7C8380] mt-1 font-mono uppercase">
                  {isAr ? 'ذهبية الجمهورية (ملاكمة)' : 'Republic Boxing Gold'}
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isLight ? 'bg-white border-[#D3DFD9]' : 'bg-[#2F3E3C]/70 border-[#2F3E3C]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#BDDBD1] font-mono font-bold text-lg sm:text-xl">
                  <Terminal className="w-4 h-4 text-[#BDDBD1]" />
                  <span className={isLight ? 'text-[#13221C]' : 'text-[#F4F2EC]'}>CS & AI</span>
                </div>
                <div className="text-[11px] text-[#7C8380] mt-1 font-mono uppercase">
                  {isAr ? 'حاسبات • ذكاء طبي' : 'Medical Computer Vision'}
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isLight ? 'bg-white border-[#D3DFD9]' : 'bg-[#3E6153]/30 border-[#3E6153]/60'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#BDDBD1] font-mono font-bold text-lg sm:text-xl">
                  <HeartPulse className="w-4 h-4 text-[#BDDBD1]" />
                  <span className={isLight ? 'text-[#13221C]' : 'text-[#F4F2EC]'}>Physio</span>
                </div>
                <div className="text-[11px] text-[#7C8380] mt-1 font-mono uppercase">
                  {isAr ? 'علاج طبيعي وتأهيل' : 'Rehab & Biomechanics'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Touch-Moving Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative mx-auto max-w-sm rounded-3xl p-2.5 border-2 shadow-2xl overflow-hidden transition-all ${
                isLight
                  ? 'bg-gradient-to-b from-[#E8EFEA] via-white to-[#F0F5F2] border-[#D3DFD9] ring-4 ring-[#BDDBD1]/30'
                  : 'bg-gradient-to-b from-[#2F3E3C] via-[#1A221F] to-[#121815] border-[#2F3E3C] ring-4 ring-[#BDDBD1]/20'
              }`}
            >
              {/* Kinetic Moving Photo Container */}
              <InteractiveMovingImage
                src={ASSETS.ranaRealPortrait}
                alt="Rana Gamal - Medical AI & Boxing Champion"
                soundProfile="portrait"
                floatingDistance={8}
                floatingDuration={5.5}
                enableTilt={true}
                enableDrag={true}
                badgeLabel={isAr ? '🎵 صوت عاجي هادئ • رنا جمال' : '🎵 Calm Harmonic Chime'}
                containerClassName="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#161D1A] ring-1 ring-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none z-20">
                  <span className="px-3 py-1 rounded-full bg-[#F4F2EC] backdrop-blur-md border border-white text-[#121815] font-mono text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3 h-3 text-[#3E6153]" />
                    <span>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#2F3E3C] backdrop-blur-md border border-[#BDDBD1]/50 text-[#BDDBD1] font-mono text-[10px] font-bold shadow-sm">
                    {isAr ? '20 عاماً' : '20 Yrs Old'}
                  </span>
                </div>

                {/* Bottom Card Identity Details */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#121815]/90 backdrop-blur-md border border-[#2F3E3C] pointer-events-none z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#F4F2EC] tracking-wide">
                        {isAr ? 'رنا جمال' : 'Rana Gamal'}
                      </div>
                      <div className="text-[11px] text-[#BDDBD1] font-mono font-medium">
                        {isAr ? 'بطلة جمهورية • ذكاء اصطناعي طبي' : 'Republic Champion • Medical AI'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#7C8380] font-mono uppercase">
                        {isAr ? 'الشغف' : 'Philosophy'}
                      </div>
                      <div className="text-xs text-[#BDDBD1] font-bold">
                        {isAr ? 'علاج طبيعي وهدوء ✦' : 'Physio, Calm & Code ✦'}
                      </div>
                    </div>
                  </div>
                </div>
              </InteractiveMovingImage>
            </div>

            {/* Interactive Words Escape Garden */}
            <div className="mt-4 max-w-sm mx-auto">
              <EscapingWordsGarden lang={lang} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
