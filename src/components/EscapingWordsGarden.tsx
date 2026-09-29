import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, Volume2, Wand2, Compass } from 'lucide-react';
import { Language, Theme } from '../types';
import { playImageSound } from '../utils/imageSound';

interface EscapingWordsGardenProps {
  lang: Language;
  theme?: Theme;
}

interface FloatingParticleWord {
  id: number;
  text: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  rotation: number;
  colorClass: string;
}

const POETIC_WORDS_AR = [
  'عزم', 'ذهب', 'نبض', 'بطلة', 'ذكاء', 'شغف', 'قوة', 'إرادة',
  'طموح', 'سلام', 'ملاكمة', 'تأهيل', 'رنا', 'إتقان', 'سرعة', 'رشاقة',
  'حلم', 'نور', 'ثبات', 'تحدي', 'روح', 'يقين'
];

const POETIC_WORDS_EN = [
  'Champion', 'Gold', 'Grit', 'AI Vision', 'Power', 'Pulse', 'Grace',
  'Focus', 'Flow', 'Inspire', 'Impact', 'Resilience', 'Speed', 'Heart',
  'Punch', 'Serenity', 'Kinetic', 'Discipline'
];

const WORD_STYLES = [
  'text-emerald-300 border-emerald-400/40 bg-emerald-950/80 shadow-[0_0_15px_rgba(52,211,153,0.4)]',
  'text-amber-300 border-amber-400/40 bg-amber-950/80 shadow-[0_0_15px_rgba(251,191,36,0.4)]',
  'text-[#BDDBD1] border-[#BDDBD1]/40 bg-[#16221D]/90 shadow-[0_0_15px_rgba(189,219,209,0.4)]',
  'text-white border-white/30 bg-black/75 shadow-[0_0_15px_rgba(255,255,255,0.3)]',
  'text-teal-200 border-teal-400/40 bg-teal-950/80 shadow-[0_0_15px_rgba(45,212,191,0.4)]',
  'text-rose-200 border-rose-400/40 bg-rose-950/80 shadow-[0_0_15px_rgba(251,113,133,0.4)]',
];

interface RunawayPillProps {
  word: string;
  isLight: boolean;
  onCatch: (e: React.MouseEvent | React.TouchEvent, word: string) => void;
}

const RunawayPill: React.FC<RunawayPillProps> = ({ word, isLight, onCatch }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [escapedCount, setEscapedCount] = useState(0);

  const handlePointerEnter = (e: React.PointerEvent) => {
    // Escape in random dodging direction away from finger/mouse
    const angle = Math.random() * Math.PI * 2;
    const distance = 45 + Math.random() * 55;
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;
    setOffset({ x: newX, y: newY });
    setEscapedCount((c) => c + 1);
    playImageSound('escape');
  };

  const handlePointerLeave = () => {
    // Gently spring back after escaping
    setTimeout(() => {
      setOffset({ x: 0, y: 0 });
    }, 1200);
  };

  return (
    <motion.button
      type="button"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={(e) => onCatch(e, word)}
      onTouchStart={(e) => onCatch(e, word)}
      animate={{
        x: offset.x,
        y: offset.y,
        scale: offset.x !== 0 ? 1.08 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 18,
      }}
      className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-colors cursor-pointer select-none relative group ${
        isLight
          ? 'bg-white/90 border-[#D3DFD9] text-[#13221C] hover:border-emerald-500 hover:text-emerald-700 shadow-xs'
          : 'bg-[#1A221F]/90 border-[#2F3E3C] text-[#BDDBD1] hover:border-emerald-400 hover:text-white shadow-xs'
      }`}
    >
      <span className="flex items-center gap-1">
        <span>{word}</span>
        {escapedCount > 0 && (
          <span className="text-[9px] text-emerald-400 opacity-80 animate-ping">✦</span>
        )}
      </span>
    </motion.button>
  );
};

export const EscapingWordsGarden: React.FC<EscapingWordsGardenProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<FloatingParticleWord[]>([]);
  const [totalEscaped, setTotalEscaped] = useState<number>(0);

  const wordBank = isAr ? POETIC_WORDS_AR : POETIC_WORDS_EN;

  const spawnParticlesAt = useCallback(
    (clientX: number, clientY: number, count: number = 4, customWord?: string) => {
      const rect = containerRef.current?.getBoundingClientRect();
      const originX = rect ? clientX - rect.left : 150;
      const originY = rect ? clientY - rect.top : 80;

      const newParticles: FloatingParticleWord[] = [];
      for (let i = 0; i < count; i++) {
        const text =
          customWord && i === 0
            ? customWord
            : wordBank[Math.floor(Math.random() * wordBank.length)];
        const angle = Math.PI * 1.5 + (Math.random() - 0.5) * (Math.PI * 0.95);
        const dist = 70 + Math.random() * 95;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist - 40; // upward bias
        const rotation = (Math.random() - 0.5) * 45;
        const colorClass = WORD_STYLES[Math.floor(Math.random() * WORD_STYLES.length)];

        newParticles.push({
          id: Date.now() + Math.random(),
          text,
          startX: originX,
          startY: originY,
          targetX,
          targetY,
          rotation,
          colorClass,
        });
      }

      setParticles((prev) => [...prev.slice(-20), ...newParticles]);
      setTotalEscaped((prev) => prev + count);
      playImageSound('escape');

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 1800);
    },
    [wordBank]
  );

  const handleContainerTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      spawnParticlesAt(touch.clientX, touch.clientY, 3);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    spawnParticlesAt(e.clientX, e.clientY, 3);
  };

  const handleCatchPill = (e: React.MouseEvent | React.TouchEvent, word: string) => {
    e.stopPropagation();
    let cx = 0;
    let cy = 0;
    if ('touches' in e && e.touches.length > 0) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    } else if ('clientX' in e) {
      cx = e.clientX;
      cy = e.clientY;
    }
    spawnParticlesAt(cx, cy, 6, word);
  };

  const releaseAllWords = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const burst: FloatingParticleWord[] = [];
    for (let i = 0; i < 16; i++) {
      const text = wordBank[Math.floor(Math.random() * wordBank.length)];
      const angle = (i / 16) * Math.PI * 2;
      const dist = 90 + Math.random() * 120;
      burst.push({
        id: Date.now() + Math.random(),
        text,
        startX: centerX,
        startY: centerY,
        targetX: Math.cos(angle) * dist,
        targetY: Math.sin(angle) * dist - 30,
        rotation: (Math.random() - 0.5) * 50,
        colorClass: WORD_STYLES[i % WORD_STYLES.length],
      });
    }

    setParticles((prev) => [...prev.slice(-10), ...burst]);
    setTotalEscaped((prev) => prev + burst.length);
    playImageSound('escape');

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !burst.some((b) => b.id === p.id)));
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      onTouchStart={handleContainerTouch}
      className={`relative rounded-2xl p-4 sm:p-5 border transition-all select-none overflow-hidden ${
        isLight
          ? 'bg-gradient-to-b from-[#F2F7F4] via-white to-[#F0F5F2] border-[#D3DFD9] shadow-sm'
          : 'bg-gradient-to-b from-[#18231F] via-[#121A17] to-[#0E1412] border-[#3E6153]/40 shadow-md'
      }`}
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
            <Wind className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold font-sans-modern flex items-center gap-1.5 text-emerald-400">
              <span>{isAr ? 'الكلمات تهرب عندما تلمسها' : 'Words Escape When You Touch'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2F3E3C] text-[#BDDBD1]">
                {totalEscaped} {isAr ? 'كلمة هربت' : 'escaped'}
              </span>
            </h4>
            <p className="text-[11px] text-[#7C8380] font-sans">
              {isAr
                ? 'المس الحروف أو حرك أصبعك بالقرب منها لتراها تبتعد وتتطاير في الفضاء ✦'
                : 'Hover or touch any word to watch it dodge and flee into the air ✦'}
            </p>
          </div>
        </div>

        {/* Release Magic Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            releaseAllWords();
          }}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>{isAr ? 'أطلق الكلمات ✨' : 'Release Words ✨'}</span>
        </button>
      </div>

      {/* Dodging / Runaway Words Cloud */}
      <div className="flex flex-wrap gap-2 pt-1 pb-1 relative z-10">
        {wordBank.slice(0, 10).map((word, idx) => (
          <RunawayPill
            key={`${word}-${idx}`}
            word={word}
            isLight={isLight}
            onCatch={handleCatchPill}
          />
        ))}
      </div>

      {/* Floating Escaped Particles Rendering */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: p.startX,
              y: p.startY,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1.2, 1, 0.7],
              x: p.startX + p.targetX,
              y: p.startY + p.targetY,
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute pointer-events-none z-50 px-2.5 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md whitespace-nowrap shadow-xl flex items-center gap-1 ${p.colorClass}`}
            style={{
              left: 0,
              top: 0,
            }}
          >
            <Sparkles className="w-2.5 h-2.5 opacity-80" />
            <span>{p.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
