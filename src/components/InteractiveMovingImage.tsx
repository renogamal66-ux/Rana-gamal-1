import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Activity, HandMetal, Move, Wind } from 'lucide-react';
import { playImageSound, SoundProfile } from '../utils/imageSound';

interface EscapedWord {
  id: number;
  word: string;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  rotation: number;
  color: string;
}

const ESCAPING_WORDS = [
  'عزم', 'ذهب', 'نبض', 'بطلة', 'ذكاء', 'شغف', 'قوة', 'إرادة', 'طموح', 'سلام',
  'ملاكمة', 'تأهيل', 'رنا', 'إتقان', 'سرعة', 'رشاقة', 'حلم', 'نور', 'ثبات',
  'Champion', 'Gold', 'Grit', 'AI Vision', 'Power', 'Pulse', 'Grace', 'Focus',
  'Inspire', 'Impact', 'Resilience', 'Speed', 'Heart', 'Flow'
];

const ESCAPING_COLORS = [
  'text-emerald-300 border-emerald-400/40 bg-emerald-950/85 shadow-[0_0_15px_rgba(52,211,153,0.4)]',
  'text-amber-300 border-amber-400/40 bg-amber-950/85 shadow-[0_0_15px_rgba(251,191,36,0.4)]',
  'text-[#BDDBD1] border-[#BDDBD1]/40 bg-[#16221D]/90 shadow-[0_0_15px_rgba(189,219,209,0.4)]',
  'text-white border-white/30 bg-black/80 shadow-[0_0_15px_rgba(255,255,255,0.3)]',
  'text-teal-200 border-teal-400/40 bg-teal-950/85 shadow-[0_0_15px_rgba(45,212,191,0.4)]',
];

interface InteractiveMovingImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  soundProfile?: SoundProfile;
  enableTilt?: boolean;
  enableFloating?: boolean;
  enableDrag?: boolean;
  floatingDistance?: number;
  floatingDuration?: number;
  badgeLabel?: string;
  showSoundHint?: boolean;
  showAILink?: boolean;
  onLinkToAI?: () => void;
  onClick?: () => void;
  aspectRatioClass?: string;
  children?: React.ReactNode;
}

export const InteractiveMovingImage: React.FC<InteractiveMovingImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  soundProfile = 'portrait',
  enableTilt = true,
  enableFloating = true,
  enableDrag = true,
  floatingDistance = 8,
  floatingDuration = 5,
  badgeLabel,
  showSoundHint = true,
  showAILink = true,
  onLinkToAI,
  onClick,
  aspectRatioClass = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleLinkToAI = (e: React.MouseEvent) => {
    e.stopPropagation();
    playImageSound('medical');
    if (onLinkToAI) {
      onLinkToAI();
    } else {
      let area = 'general';
      const lower = alt.toLowerCase();
      if (lower.includes('knee') || lower.includes('ركبة')) area = 'knee';
      else if (lower.includes('spine') || lower.includes('فقري')) area = 'spine';
      else if (lower.includes('shoulder') || lower.includes('كتف')) area = 'shoulder';
      else if (lower.includes('box') || lower.includes('ملاكمة')) area = 'combat';

      window.dispatchEvent(
        new CustomEvent('link-image-to-ai', {
          detail: {
            src,
            alt,
            focusArea: area,
            autoRun: true,
          },
        })
      );
      const target = document.getElementById('physio-ai');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [touchIndicator, setTouchIndicator] = useState<{ x: number; y: number } | null>(null);
  const [escapedWords, setEscapedWords] = useState<EscapedWord[]>([]);
  const lastMoveWordTime = useRef<number>(0);

  const spawnEscapingWords = useCallback((clientX: number, clientY: number, count: number = 3) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const startX = clientX - rect.left;
    const startY = clientY - rect.top;

    const newWords: EscapedWord[] = [];
    for (let i = 0; i < count; i++) {
      const word = ESCAPING_WORDS[Math.floor(Math.random() * ESCAPING_WORDS.length)];
      // Spread outward and float upward like escaping spirit/poetry
      const angle = Math.PI * 1.5 + (Math.random() - 0.5) * (Math.PI * 0.95);
      const dist = 55 + Math.random() * 85;
      const deltaX = Math.cos(angle) * dist;
      const deltaY = Math.sin(angle) * dist - 30; // upward trajectory
      const rotation = (Math.random() - 0.5) * 45;
      const color = ESCAPING_COLORS[Math.floor(Math.random() * ESCAPING_COLORS.length)];

      newWords.push({
        id: Date.now() + Math.random(),
        word,
        startX,
        startY,
        deltaX,
        deltaY,
        rotation,
        color,
      });
    }

    setEscapedWords((prev) => [...prev.slice(-15), ...newWords]);
    playImageSound('escape');

    setTimeout(() => {
      setEscapedWords((prev) => prev.filter((w) => !newWords.some((nw) => nw.id === w.id)));
    }, 1600);
  }, []);

  // Unified coordinate calculator for both mouse and touch
  const updateInteractivity = useCallback(
    (clientX: number, clientY: number) => {
      if (!enableTilt || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      // Smooth, responsive 3D tilt
      setTilt({
        x: Math.max(-20, Math.min(20, -normY * 26)),
        y: Math.max(-20, Math.min(20, normX * 26)),
      });

      // Subtle planar shift following touch/cursor
      setOffset({
        x: Math.max(-15, Math.min(15, normX * 22)),
        y: Math.max(-15, Math.min(15, normY * 22)),
      });

      // Relative touch position for visual ring
      setTouchIndicator({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    },
    [enableTilt]
  );

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    updateInteractivity(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setTilt({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });
    setTouchIndicator(null);
  };

  // Touch Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateInteractivity(touch.clientX, touch.clientY);

      // Trigger tactile audio & ripple immediately on touch
      playImageSound(soundProfile);
      setIsPlayingSound(true);
      setClickCount((c) => c + 1);

      // Words escape upon touching!
      spawnEscapingWords(touch.clientX, touch.clientY, 3);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const rx = touch.clientX - rect.left;
        const ry = touch.clientY - rect.top;
        const newRipple = { id: Date.now(), x: rx, y: ry };
        setRipples((prev) => [...prev.slice(-3), newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1000);
      }

      setTimeout(() => {
        setIsPlayingSound(false);
      }, 750);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateInteractivity(touch.clientX, touch.clientY);

      // Continuous drag produces a magical stream of escaping words
      const now = Date.now();
      if (now - lastMoveWordTime.current > 140) {
        lastMoveWordTime.current = now;
        spawnEscapingWords(touch.clientX, touch.clientY, 1);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    setTilt({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });
    setTouchIndicator(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    playImageSound(soundProfile);
    setIsPlayingSound(true);
    setClickCount((prev) => prev + 1);

    // Words escape upon clicking/tapping!
    spawnEscapingWords(e.clientX, e.clientY, 3);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    }

    setTimeout(() => {
      setIsPlayingSound(false);
    }, 850);

    if (onClick) {
      onClick();
    }
  };

  const getProfileLabel = () => {
    if (badgeLabel) return badgeLabel;
    switch (soundProfile) {
      case 'boxing':
        return '🥊 صدى الملاكمة والحركة';
      case 'medical':
        return '🔬 نبض الذكاء الاصطناعي';
      case 'rehab':
        return '🌿 صدى الميكانيكا الحيوية';
      case 'avatar':
      case 'pop':
        return '✨ رنين هادئ وتفاعلي';
      default:
        return '🎵 صدى عاجي هادئ';
    }
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={handleClick}
      // Drag capability: user can touch & physically move/pull the image with spring recoil
      drag={enableDrag}
      dragConstraints={{ left: -18, right: 18, top: -18, bottom: 18 }}
      dragElastic={0.25}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      // Continuous floating movement when not actively being touched or hovered
      animate={
        enableFloating && !isInteracting
          ? {
              y: [0, -floatingDistance, 0],
              rotateZ: [-0.3, 0.3, -0.3],
            }
          : undefined
      }
      transition={
        enableFloating
          ? {
              duration: floatingDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      style={{
        perspective: 1100,
        transformStyle: 'preserve-3d',
        touchAction: 'pan-y', // allows vertical scroll while preserving horizontal swipe and touch tracking
      }}
      className={`relative cursor-grab active:cursor-grabbing select-none group transition-shadow duration-300 ${aspectRatioClass} ${containerClassName}`}
    >
      {/* 3D tilt & offset layer that dynamically responds to finger touch */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          x: offset.x,
          y: offset.y,
        }}
        transition={{
          type: 'spring',
          damping: isInteracting ? 20 : 12,
          stiffness: isInteracting ? 220 : 150,
          mass: 0.8,
        }}
        className="w-full h-full relative overflow-hidden rounded-inherit"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Kinetic Image */}
        <motion.img
          src={src}
          alt={alt}
          key={clickCount}
          animate={
            clickCount > 0
              ? {
                  scale: [1, 0.94, 1.04, 0.98, 1],
                  rotate: [0, -1.2, 1.2, -0.4, 0],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`${className} transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none`}
          referrerPolicy="no-referrer"
        />

        {/* Shimmer light sweep */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Real-time touch contact glow following finger / cursor */}
        <AnimatePresence>
          {touchIndicator && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.75 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                left: touchIndicator.x,
                top: touchIndicator.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-[#BDDBD1]/40 to-emerald-400/20 blur-md pointer-events-none z-30"
            />
          )}
        </AnimatePresence>

        {/* Click/Touch Shockwave Ripples */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 4.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{
                left: ripple.x,
                top: ripple.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute w-20 h-20 rounded-full border-2 border-[#BDDBD1] bg-[#BDDBD1]/20 pointer-events-none z-20"
            />
          ))}
        </AnimatePresence>

        {/* Ambient active sound wave glow when playing */}
        <AnimatePresence>
          {isPlayingSound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-inherit ring-4 ring-[#BDDBD1] ring-offset-2 ring-offset-[#121815] bg-[#BDDBD1]/15 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* Escaping Words on Touch & Drag */}
        <AnimatePresence>
          {escapedWords.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.35,
                x: item.startX,
                y: item.startY,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.35, 1.2, 1, 0.75],
                x: item.startX + item.deltaX,
                y: item.startY + item.deltaY,
                rotate: item.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute pointer-events-none z-40 px-2.5 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md whitespace-nowrap shadow-lg flex items-center gap-1 ${item.color}`}
              style={{
                left: 0,
                top: 0,
              }}
            >
              <Sparkles className="w-2.5 h-2.5 opacity-80" />
              <span>{item.word}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Optional children overlay elements */}
        {children}
      </motion.div>

      {/* Floating Audio & Touch Motion Badge */}
      {showSoundHint && (
        <div className="absolute bottom-2.5 right-2.5 z-30 pointer-events-none">
          <motion.div
            animate={
              isPlayingSound || isInteracting
                ? { scale: [1, 1.08, 1], y: -2 }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 0.25 }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono backdrop-blur-md border shadow-lg transition-all duration-300 ${
              isPlayingSound || isInteracting
                ? 'bg-[#BDDBD1] text-[#121815] border-white font-bold shadow-md'
                : 'bg-[#121815]/85 text-[#BDDBD1] border-[#2F3E3C] group-hover:border-[#BDDBD1]/70'
            }`}
          >
            {/* Animated Equalizer or Touch icon */}
            <div className="flex items-end gap-0.5 h-3">
              <motion.span
                animate={
                  isPlayingSound || isInteracting
                    ? { height: ['25%', '100%', '40%', '80%', '25%'] }
                    : { height: '35%' }
                }
                transition={{ duration: 0.5, repeat: Infinity }}
                className={`w-0.5 rounded-full ${
                  isPlayingSound || isInteracting ? 'bg-[#121815]' : 'bg-[#BDDBD1]'
                }`}
              />
              <motion.span
                animate={
                  isPlayingSound || isInteracting
                    ? { height: ['70%', '30%', '100%', '40%', '70%'] }
                    : { height: '65%' }
                }
                transition={{ duration: 0.45, repeat: Infinity, delay: 0.1 }}
                className={`w-0.5 rounded-full ${
                  isPlayingSound || isInteracting ? 'bg-[#121815]' : 'bg-[#BDDBD1]'
                }`}
              />
              <motion.span
                animate={
                  isPlayingSound || isInteracting
                    ? { height: ['40%', '90%', '20%', '100%', '40%'] }
                    : { height: '45%' }
                }
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                className={`w-0.5 rounded-full ${
                  isPlayingSound || isInteracting ? 'bg-[#121815]' : 'bg-[#BDDBD1]'
                }`}
              />
            </div>

            <span className="hidden sm:inline text-[9px] font-semibold">
              {isPlayingSound || isInteracting ? (
                <span className="flex items-center gap-1">
                  <Wind className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                  <span>تهرب الكلمات وتتحرك باللمس ✦</span>
                </span>
              ) : (
                <span>المس لتتحرك وتهرب الكلمات منك ✦</span>
              )}
            </span>

            <span className="sm:hidden text-[9px] flex items-center gap-1">
              {isInteracting ? (
                <span>تهرب الكلمات باللمس ✦</span>
              ) : (
                <span>المس لتهرب الكلمات ✦</span>
              )}
            </span>
          </motion.div>
        </div>
      )}

      {/* Direct AI Vision Link Button */}
      {showAILink && (
        <div className="absolute top-2.5 left-2.5 z-30 pointer-events-auto">
          <motion.button
            type="button"
            onClick={handleLinkToAI}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group/aibtn px-2.5 py-1 rounded-lg backdrop-blur-md bg-[#121815]/90 hover:bg-[#2F3E3C] border border-[#BDDBD1]/50 hover:border-[#BDDBD1] text-[#BDDBD1] text-[10px] font-mono flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            title="فحص وتحليل هذه الصورة بالذكاء الاصطناعي • Link to AI Vision"
          >
            <Sparkles className="w-3 h-3 text-[#BDDBD1] animate-pulse group-hover/aibtn:rotate-12 transition-transform" />
            <span className="font-bold">فحص بالذكاء الاصطناعي</span>
            <span className="opacity-60 text-[9px]">AI</span>
          </motion.button>
        </div>
      )}

      {/* Floating Sparkle on active interaction */}
      <AnimatePresence>
        {isPlayingSound && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -25, scale: 1.15 }}
            exit={{ opacity: 0, y: -45 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -top-3 right-4 z-40 px-2.5 py-0.5 rounded-full bg-[#BDDBD1] text-[#121815] text-[10px] font-bold font-mono shadow-xl border border-white pointer-events-none flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 text-[#121815]" />
            <span>حركة وصوت ✦</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
