import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Sparkles,
  Dumbbell,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  ShieldCheck,
  Activity,
  ArrowRight,
  Flame,
  Award,
  RefreshCw,
} from 'lucide-react';
import { Language, Theme, RehabPlan } from '../types';
import { playImageSound } from '../utils/imageSound';

interface RehabPlanBuilderProps {
  lang: Language;
  theme?: Theme;
}

export const RehabPlanBuilder: React.FC<RehabPlanBuilderProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';

  // State
  const [focusArea, setFocusArea] = useState<string>('knee');
  const [goal, setGoal] = useState<string>('recovery');
  const [fitnessLevel, setFitnessLevel] = useState<string>('athlete');
  const [durationWeeks, setDurationWeeks] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [plan, setPlan] = useState<RehabPlan | null>(null);
  const [activePhaseIdx, setActivePhaseIdx] = useState<number>(0);

  const focusOptions = [
    { id: 'knee', label: isAr ? 'الركبة والرباط الصليبي (ACL)' : 'Knee & Ligaments (ACL)' },
    { id: 'shoulder', label: isAr ? 'الكتف والكفة المدورة' : 'Shoulder & Rotator Cuff' },
    { id: 'spine', label: isAr ? 'العمود الفقري وتحدب القوام' : 'Spine & Posture' },
    { id: 'combat', label: isAr ? 'سلسلة عزم الملاكمة الحركي' : 'Boxing Kinetic Torque' },
  ];

  const goalOptions = [
    { id: 'recovery', label: isAr ? 'تسكين الألم والاستشفاء الحركي' : 'Pain-Free Recovery' },
    { id: 'mobility', label: isAr ? 'استعادة المدى الحركي الكامل' : 'Full Range of Motion' },
    { id: 'performance', label: isAr ? 'العودة للنزال والمنافسة العالية' : 'Championship Return' },
  ];

  const levelOptions = [
    { id: 'patient', label: isAr ? 'مريض / تأهيل أولي' : 'Rehab Patient' },
    { id: 'intermediate', label: isAr ? 'رياضي متوسط' : 'Intermediate Athlete' },
    { id: 'athlete', label: isAr ? 'ملاكم / رياضي محترف' : 'Combat Athlete / Pro' },
  ];

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    playImageSound('medical');

    try {
      const res = await fetch('/api/rehab-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focusArea,
          goal,
          fitnessLevel,
          weeks: durationWeeks,
          lang,
        }),
      });

      const data = await res.json();
      if (data.success && data.plan) {
        setPlan(data.plan);
        setActivePhaseIdx(0);
        playImageSound('avatar');
      } else {
        throw new Error(data.error || 'Failed to generate plan');
      }
    } catch (err) {
      console.warn('Rehab plan fetch error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const printPlan = () => {
    window.print();
  };

  return (
    <section
      id="rehab-builder"
      className={`w-full py-20 border-b relative transition-colors duration-300 ${
        isLight ? 'bg-white border-[#D3DFD9] text-[#13221C]' : 'bg-[#121815] border-[#3E6153]/30 text-[#F4F2EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#3E6153]/30 mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#BDDBD1] uppercase tracking-widest mb-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'مولد البرامج التأهيلية الذكية' : 'AI CLINICAL REHABILITATION PROGRAMMER'}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#2F3E3C] text-emerald-300 text-[10px] font-bold border border-emerald-400/40">
                Gemini 3.8 Full-Stack
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-sans-modern">
              {isAr ? (
                <>
                  بناء برامج التأهيل الحركي <span className="text-emerald-400">المتدرجة عبر السيرفر</span>
                </>
              ) : (
                <>
                  Automated <span className="text-emerald-400">Full-Stack Rehabilitation</span> Program Builder
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-[#7C8380] max-w-2xl mt-1.5 font-sans leading-relaxed">
              {isAr
                ? 'حدد المفصل المستهدف ومستوى اللياقة لتوليد برنامج تأهيلي كامل متعدد الأسابيع مدعوم بمحرك الذكاء الاصطناعي على السيرفر، مع تفاصيل التمارين والمجموعات وإرشادات الاستشفاء.'
                : 'Configure anatomical region and athletic level to generate a clinical multi-phase recovery regimen via server-side AI, complete with sets, reps, cues, and recovery parameters.'}
            </p>
          </div>

          {plan && (
            <button
              onClick={printPlan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2F3E3C] bg-[#161D1A] text-[#BDDBD1] hover:text-white hover:border-emerald-400 text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer self-start md:self-auto"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'طباعة البرنامج السريري' : 'Print Clinical Plan'}</span>
            </button>
          )}
        </div>

        {/* Builder Interactive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Program Parameters Configurator (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`rounded-3xl border p-6 sm:p-7 space-y-5 transition-all ${
                isLight ? 'bg-[#F6F8F7] border-[#D3DFD9] shadow-md' : 'bg-[#161D1A] border-[#2F3E3C]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#3E6153]/30">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>{isAr ? 'معايير وخطة التأهيل' : 'Protocol Parameters'}</span>
                </span>
                <span className="text-[10px] font-mono text-[#7C8380]">API Endpoint: /api/rehab-plan</span>
              </div>

              {/* 1. Target Region */}
              <div>
                <label className="block text-[11px] font-mono text-[#BDDBD1] mb-2 uppercase tracking-wider font-semibold">
                  {isAr ? '1. المنطقة المستهدفة / المفصل:' : '1. Target Joint / Kinetic Region:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {focusOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFocusArea(opt.id)}
                      className={`text-start px-3 py-2.5 rounded-xl text-xs font-mono transition-all border ${
                        focusArea === opt.id
                          ? 'bg-[#2F3E3C] text-emerald-300 border-emerald-400 font-bold shadow-xs'
                          : isLight
                          ? 'bg-white text-[#566E64] border-[#D3DFD9] hover:border-emerald-300'
                          : 'bg-[#121815] text-[#7C8380] border-[#2F3E3C] hover:border-[#BDDBD1]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Rehabilitation Goal */}
              <div>
                <label className="block text-[11px] font-mono text-[#BDDBD1] mb-2 uppercase tracking-wider font-semibold">
                  {isAr ? '2. الهدف التأهيلي الأساسي:' : '2. Clinical Objective:'}
                </label>
                <div className="space-y-1.5">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoal(opt.id)}
                      className={`w-full text-start px-3 py-2 rounded-xl text-xs font-mono transition-all border flex items-center justify-between ${
                        goal === opt.id
                          ? 'bg-[#2F3E3C] text-emerald-300 border-emerald-400 font-bold shadow-xs'
                          : isLight
                          ? 'bg-white text-[#566E64] border-[#D3DFD9] hover:border-emerald-300'
                          : 'bg-[#121815] text-[#7C8380] border-[#2F3E3C] hover:border-[#BDDBD1]/50'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {goal === opt.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Athlete / Patient Level */}
              <div>
                <label className="block text-[11px] font-mono text-[#BDDBD1] mb-2 uppercase tracking-wider font-semibold">
                  {isAr ? '3. مستوى الجاهزية الحركية:' : '3. Functional Readiness:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {levelOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFitnessLevel(opt.id)}
                      className={`text-center px-2 py-2 rounded-xl text-[11px] font-mono transition-all border ${
                        fitnessLevel === opt.id
                          ? 'bg-[#2F3E3C] text-emerald-300 border-emerald-400 font-bold shadow-xs'
                          : isLight
                          ? 'bg-white text-[#566E64] border-[#D3DFD9] hover:border-emerald-300'
                          : 'bg-[#121815] text-[#7C8380] border-[#2F3E3C] hover:border-[#BDDBD1]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Duration */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-[#BDDBD1] uppercase font-semibold">
                    {isAr ? '4. مدة البرنامج المتدرج:' : '4. Program Duration:'}
                  </span>
                  <span className="font-bold text-emerald-400">
                    {durationWeeks} {isAr ? 'أسابيع متتالية' : 'Weeks'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 4, 8].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setDurationWeeks(w)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                        durationWeeks === w
                          ? 'bg-[#2F3E3C] text-emerald-300 border-emerald-400 shadow-xs'
                          : isLight
                          ? 'bg-white text-[#7C8380] border-[#D3DFD9]'
                          : 'bg-[#121815] text-[#7C8380] border-[#2F3E3C]'
                      }`}
                    >
                      {w} {isAr ? 'أسابيع' : 'Weeks'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Plan Button */}
              <button
                type="button"
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer transition-all"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    <span>{isAr ? 'جاري بناء البرنامج بالذكاء الاصطناعي...' : 'Synthesizing with Server AI...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>{isAr ? 'توليد برنامج التأهيل السريري ✦' : 'Generate Evidence-Based Plan ✦'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Scientific Disciplinary Note */}
            <div
              className={`rounded-2xl border p-4 text-xs space-y-1.5 ${
                isLight ? 'bg-[#EBF3EF] border-[#D3DFD9] text-[#2C4D40]' : 'bg-[#161D1A]/70 border-[#2F3E3C] text-[#BDDBD1]'
              }`}
            >
              <div className="flex items-center gap-2 font-mono font-bold text-[11px] text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'منهجية رنا جمال السريرية' : 'Clinical & Boxing Methodology'}</span>
              </div>
              <p className="text-[11px] text-[#7C8380] leading-relaxed">
                {isAr
                  ? 'تمت برمجة هذا المحرك بالربط بين أحدث مراجع التأهيل العصبي العضلي، وتكتيكات التحمل الرياضي كبطلة جمهورية في الملاكمة.'
                  : 'Engineered combining peer-reviewed kinematic rehab literature with the high-stress endurance discipline of national boxing championship preparation.'}
              </p>
            </div>
          </div>

          {/* Right Column: Generated Program Interactive View (7 Cols) */}
          <div className="lg:col-span-7">
            {!plan ? (
              <div
                className={`rounded-3xl border p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[420px] ${
                  isLight ? 'bg-[#F6F8F7] border-[#D3DFD9]' : 'bg-[#161D1A] border-[#2F3E3C]'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2F3E3C] text-emerald-400 flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight mb-1 font-sans-modern">
                    {isAr ? 'جاهز لتوليد برنامجك التأهيلي المخصص' : 'Ready to Synthesize Your Custom Rehab Program'}
                  </h3>
                  <p className="text-xs text-[#7C8380] max-w-md mx-auto">
                    {isAr
                      ? 'حدد المعايير المطلوبة من القائمة وانقر "توليد برنامج التأهيل" ليقوم السيرفر بتصميم خطة أسابيع متدرجة.'
                      : 'Configure the parameters on the left and click Generate to run the full-stack kinematic programmer.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGeneratePlan}
                  className="px-5 py-2.5 rounded-xl bg-[#2F3E3C] hover:bg-emerald-500 hover:text-black text-emerald-300 font-mono text-xs font-bold border border-emerald-400/40 transition-colors shadow-xs"
                >
                  {isAr ? 'بدء التوليد الفوري' : 'Quick Generate'}
                </button>
              </div>
            ) : (
              <div
                className={`rounded-3xl border p-6 sm:p-7 space-y-6 transition-all ${
                  isLight ? 'bg-white border-[#D3DFD9] shadow-xl' : 'bg-[#161D1A] border-[#2F3E3C]'
                }`}
              >
                {/* Program Header */}
                <div className="pb-4 border-b border-[#3E6153]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{isAr ? 'خطة تأهيلية معتمدة' : 'Clinical Protocol Output'}</span>
                      <span className="text-[#7C8380]">•</span>
                      <span>{plan.weeklyFrequency}</span>
                    </div>
                    <h3 className="text-lg font-bold font-sans-modern">
                      {isAr ? plan.programTitle.ar : plan.programTitle.en}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
                      {plan.durationWeeks} {isAr ? 'أسابيع' : 'Weeks'}
                    </span>
                  </div>
                </div>

                {/* Objective Card */}
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    isLight ? 'bg-[#F6F8F7] border-[#D3DFD9] text-[#2C4D40]' : 'bg-[#121815] border-[#2F3E3C] text-[#BDDBD1]'
                  }`}
                >
                  <span className="font-mono font-bold text-emerald-400 block mb-1 text-[11px] uppercase">
                    {isAr ? 'الهدف السريري والميكانيكي العام:' : 'Clinical & Biomechanical Objective:'}
                  </span>
                  <p>{isAr ? plan.objective.ar : plan.objective.en}</p>
                </div>

                {/* Phase Selection Tabs */}
                <div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                    {plan.phases.map((ph, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActivePhaseIdx(idx);
                          playImageSound('pop');
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activePhaseIdx === idx
                            ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                            : isLight
                            ? 'bg-[#F6F8F7] text-[#566E64] hover:bg-[#E8EFEA]'
                            : 'bg-[#121815] text-[#7C8380] hover:text-[#BDDBD1]'
                        }`}
                      >
                        {isAr ? `المرحلة ${ph.phase}` : `Phase ${ph.phase}`}
                      </button>
                    ))}
                  </div>

                  {/* Active Phase Details Card */}
                  {plan.phases[activePhaseIdx] && (
                    <motion.div
                      key={activePhaseIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-2xl border mt-3 space-y-4 ${
                        isLight ? 'bg-[#F6F8F7] border-[#D3DFD9]' : 'bg-[#121815] border-[#2F3E3C]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#3E6153]/20 gap-2">
                        <div>
                          <div className="text-sm font-bold font-sans-modern text-white">
                            {isAr
                              ? plan.phases[activePhaseIdx].title.ar
                              : plan.phases[activePhaseIdx].title.en}
                          </div>
                          <div className="text-xs text-emerald-400 font-mono mt-0.5">
                            {isAr
                              ? plan.phases[activePhaseIdx].focus.ar
                              : plan.phases[activePhaseIdx].focus.en}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#7C8380]">
                          {isAr ? `الأسبوع ${activePhaseIdx + 1}` : `Week ${activePhaseIdx + 1}`}
                        </span>
                      </div>

                      {/* Phase Exercises Grid */}
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono text-[#7C8380] uppercase tracking-wider">
                          {isAr ? 'التمارين المقررة لهذه المرحلة:' : 'Prescribed Exercises for this Phase:'}
                        </div>
                        {plan.phases[activePhaseIdx].drills.map((drill, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isLight ? 'bg-white border-[#D3DFD9]' : 'bg-[#161D1A] border-[#2F3E3C]'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{drill.name}</span>
                              </div>
                              <p className="text-[11px] text-[#7C8380] leading-relaxed">
                                {drill.instructions}
                              </p>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-[#2F3E3C] text-emerald-300 font-mono text-xs font-bold whitespace-nowrap self-start sm:self-auto border border-emerald-400/30">
                              {drill.setsReps}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Recovery Protocol Guidelines */}
                <div className="p-4 rounded-2xl bg-[#2F3E3C]/40 border border-[#BDDBD1]/30 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-mono font-bold text-[11px] text-emerald-300">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'بروتوكول الاستشفاء الرياضي الموصى به:' : 'Recommended Recovery & Tissue Protocol:'}</span>
                  </div>
                  <p className="text-[11px] text-[#BDDBD1]/90 leading-relaxed">
                    {isAr ? plan.recoveryGuidelines.ar : plan.recoveryGuidelines.en}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
