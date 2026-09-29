import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Globe, Sparkles, Sun, Moon, HeartPulse, Camera, Server, Calendar } from 'lucide-react';
import { Language, Theme } from '../types';
import { ASSETS } from '../data';
import { playImageSound } from '../utils/imageSound';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  calmMode: boolean;
  onToggleCalmMode: () => void;
  onOpenHegazyModal: () => void;
  onOpenConsoleModal?: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  calmMode,
  onToggleCalmMode,
  onOpenHegazyModal,
  onOpenConsoleModal,
  theme,
  onToggleTheme,
}) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-all duration-300 ${
        isLight
          ? 'bg-white/90 border-[#D3DFD9] shadow-xs'
          : 'bg-[#121815]/90 border-[#3E6153]/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Identity */}
        <div className="flex items-center gap-3 group">
          <motion.button
            type="button"
            title={isAr ? 'انقر للاستماع إلى رنين رنا' : 'Click to hear chime'}
            onClick={() => playImageSound('avatar')}
            whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer relative shadow-sm ${
              isLight
                ? 'border-[#2F5A49] ring-2 ring-[#BDDBD1]'
                : 'border-[#F4F2EC] group-hover:border-[#BDDBD1] ring-2 ring-[#2F3E3C]'
            }`}
          >
            <img
              src={ASSETS.ranaSquarePortrait}
              alt="Rana Gamal"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.button>
          <a href="#" className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold tracking-tight transition-colors ${
                  isLight ? 'text-[#13221C] group-hover:text-[#2F5A49]' : 'text-[#F4F2EC] group-hover:text-[#BDDBD1]'
                }`}
              >
                {isAr ? 'رنا جمال' : 'Rana Gamal'}
              </span>
              <span
                className={`hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shadow-xs border ${
                  isLight
                    ? 'bg-[#E8EFEA] text-[#2F5A49] border-[#BDDBD1]'
                    : 'bg-[#2F3E3C]/90 text-[#BDDBD1] border-[#BDDBD1]/40'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isAr ? 'متاحة للتعاون' : 'Available'}</span>
              </span>
            </div>
            <span
              className={`text-[11px] font-mono hidden sm:inline ${
                isLight ? 'text-[#566E64]' : 'text-[#7C8380]'
              }`}
            >
              {isAr ? 'ذكاء اصطناعي طبي • بطلة ملاكمة' : 'Medical AI & Biomechanics • Champion'}
            </span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-5 text-xs font-medium font-mono uppercase tracking-wider ${
            isLight ? 'text-[#566E64]' : 'text-[#7C8380]'
          }`}
        >
          <a
            href="#patient-portal"
            className={`flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full border transition-all ${
              isLight
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 shadow-xs'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 shadow-sm'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'بوابة المرضى (كاميرا ورفع)' : 'Patient Area'}</span>
          </a>
          <a
            href="#physio-ai"
            className={`flex items-center gap-1 font-bold transition-colors ${
              isLight ? 'text-[#2F5A49] hover:text-[#13221C]' : 'text-[#BDDBD1] hover:text-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isAr ? 'مختبر الذكاء الطبي' : 'Physio AI Studio'}</span>
          </a>
          <a
            href="#rehab-builder"
            className={`flex items-center gap-1 font-medium transition-colors hover:text-[#BDDBD1] ${
              isLight ? 'text-[#566E64]' : 'text-[#7C8380]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'برامج التأهيل' : 'Rehab'}</span>
          </a>
          <a href="#work" className="hover:text-[#BDDBD1] transition-colors">
            {isAr ? 'المشاريع' : 'Work'}
          </a>
          <a href="#discipline" className="hover:text-[#BDDBD1] transition-colors">
            {isAr ? 'البطولة والملاكمة' : 'Boxing Gold'}
          </a>
          <a href="#expertise" className="hover:text-[#BDDBD1] transition-colors">
            {isAr ? 'المنهجية والتقنيات' : 'Expertise'}
          </a>
          <a href="#contact" className="hover:text-[#BDDBD1] transition-colors">
            {isAr ? 'تواصل' : 'Contact'}
          </a>
        </nav>

        {/* Right: Actions (Theme Toggle, Hegazy, Calm Mode, Lang, Full-Stack Console) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Full-Stack API Console Button */}
          {onOpenConsoleModal && (
            <button
              onClick={() => {
                onOpenConsoleModal();
                playImageSound('pop');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono border border-emerald-400/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 shadow-xs cursor-pointer transition-all active:scale-95"
              title={isAr ? 'فتح لوحة المراقبة والتحكم بالخادم والـ APIs' : 'Open Full-Stack Server & API Console'}
            >
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">{isAr ? 'السيرفر' : 'Full-Stack'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          )}

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer ${
              isLight
                ? 'border-[#D3DFD9] bg-white text-[#13221C] hover:bg-[#E8EFEA] shadow-xs'
                : 'border-[#2F3E3C] bg-[#1A221F] text-[#BDDBD1] hover:border-[#BDDBD1]/60'
            }`}
            title={
              isLight
                ? isAr
                  ? 'التبديل إلى الوضع الليلي (Dark Mode)'
                  : 'Switch to Dark Mode'
                : isAr
                ? 'التبديل إلى الوضع النهاري (Light Mode)'
                : 'Switch to Light Mode'
            }
          >
            {isLight ? (
              <Moon className="w-3.5 h-3.5 text-[#2F5A49]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            )}
          </button>

          {/* Dedicated Ibrahim Hegazy Button */}
          <button
            onClick={onOpenHegazyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono tracking-wide font-bold border shadow-xs transition-all duration-200 cursor-pointer ${
              isLight
                ? 'bg-[#2F5A49] text-white hover:bg-[#1E3B30] border-[#2F5A49]'
                : 'bg-[#F4F2EC] hover:bg-[#2F3E3C] text-[#121815] hover:text-[#BDDBD1] border-[#2F3E3C]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 transition-transform" />
            <span className="font-bold hidden sm:inline">
              {isAr ? 'رسالة لم. إبراهيم حجازي' : 'Eng. Hegazy ✦'}
            </span>
            <span className="font-bold sm:hidden">
              {isAr ? 'م. إبراهيم' : 'Hegazy ✦'}
            </span>
          </button>

          {/* Calm Ambient Sound Toggle */}
          <button
            onClick={onToggleCalmMode}
            className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer ${
              calmMode
                ? 'border-[#BDDBD1] bg-[#2F3E3C] text-[#BDDBD1] shadow-[0_0_12px_rgba(189,219,209,0.25)]'
                : isLight
                ? 'border-[#D3DFD9] bg-white text-[#566E64] hover:text-[#13221C]'
                : 'border-[#2F3E3C] bg-[#1A221F] text-[#7C8380] hover:text-[#BDDBD1]'
            }`}
            title={isAr ? 'وضع الهدوء والتركيز' : 'Toggle Calm Audio'}
          >
            {calmMode ? <Volume2 className="w-3.5 h-3.5 text-[#BDDBD1]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
              isLight
                ? 'border-[#D3DFD9] bg-white text-[#13221C] hover:bg-[#E8EFEA]'
                : 'border-[#2F3E3C] bg-[#1A221F] text-[#F4F2EC] hover:text-[#BDDBD1]'
            }`}
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#7C8380]" />
            <span className="font-bold">{isAr ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
