import React from 'react';
import { Cpu, Terminal, Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, Theme } from '../types';

interface ProcessAndToolsProps {
  lang: Language;
  theme?: Theme;
}

export const ProcessAndTools: React.FC<ProcessAndToolsProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';

  const processSteps = [
    {
      num: '01',
      title: isAr ? 'التشخيص والاحتياج السريري' : 'Clinical Discovery',
      desc: isAr
        ? 'تحديد الإشكالية الحركية أو الطبية بدقة بالتعاون مع أطباء ومختصي التأهيل.'
        : 'Identifying patient and clinical movement limitations through direct biomechanical inquiry.',
    },
    {
      num: '02',
      title: isAr ? 'الميكانيكا الحيوية والبيانات' : 'Kinematic Modeling',
      desc: isAr
        ? 'تحليل زوايا المفاصل، متجهات القوة، وسلاسل الحركة بالرؤية الحاسوبية.'
        : 'Mapping joint kinematics, velocity vectors, and anatomical constraints with computer vision.',
    },
    {
      num: '03',
      title: isAr ? 'تدريب نماذج الذكاء الاصطناعي' : 'AI Architecture',
      desc: isAr
        ? 'بناء وتدريب شبكات التعلم العميق في PyTorch و MediaPipe للتقييم الآني.'
        : 'Engineering lightweight deep learning pipelines for sub-150ms pose inference and tracking.',
    },
    {
      num: '04',
      title: isAr ? 'تصميم واجهات المستخدم الهادئة' : 'Calm UI/UX Systems',
      desc: isAr
        ? 'صياغة واجهات رقمية مريحة خالية من الصخب البصري لتقليل التوتر عند المريض.'
        : 'Designing serene, distraction-free interfaces that minimize cognitive load for patients and doctors.',
    },
    {
      num: '05',
      title: isAr ? 'الاختبار الميداني والانضباط' : 'Rigorous Validation',
      desc: isAr
        ? 'اختبار الأنظمة بدقة ملاكمة صارمة لضمان موثوقية لا تشوبها شائبة.'
        : 'Stress-testing clinical accuracy with championship rigor before production deployment.',
    },
  ];

  const designTools = ['Figma', 'Framer', 'Design Systems', 'Notion', 'Adobe Suite'];
  const aiTools = ['PyTorch', 'OpenCV', 'MediaPipe', 'Python', 'NumPy'];
  const devTools = ['React & Vite', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Git/GitHub'];

  return (
    <section
      id="expertise"
      className={`w-full py-20 border-b relative transition-colors duration-300 ${
        isLight
          ? 'bg-[#F6F8F7] border-[#D3DFD9] text-[#13221C]'
          : 'bg-[#121815] border-white/[0.06] text-[#F4F2EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-[#3E6153]/30 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6B9A86] uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#3E6153] animate-pulse"></span>
            <span>{isAr ? 'المنهجية ومصفوفة التقنيات' : 'ENGINEERING METHODOLOGY & STACK'}</span>
            <span className="px-2 py-0.5 rounded-full bg-[#3E6153]/30 border border-[#3E6153]/60 text-[10px] lowercase font-semibold">
              Coram & Physio
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-sans-modern">
            {isAr ? 'كيف أبني حلولاً ذكية تترك أثراً حقيقياً' : 'How I Build Intelligent Systems'}
          </h2>
        </div>

        {/* 2-Column Minimalist Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5-Step Process (7 cols) */}
          <div
            className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 space-y-6 ${
              isLight ? 'bg-white border-[#D3DFD9] shadow-md' : 'bg-[#161D1A] border-[#3E6153]/30'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#3E6153]/20">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                {isAr ? 'خطوات العمل السريرية والهندسية' : 'RESEARCH & ENGINEERING PROCESS'}
              </span>
              <span className="text-xs font-mono text-[#6B9A86] font-bold">01 — 05</span>
            </div>

            <div className="space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.num}
                  className={`flex items-start gap-4 p-3.5 rounded-xl border transition-colors group ${
                    isLight
                      ? 'bg-[#F6F8F7] border-[#D3DFD9] hover:border-[#2F5A49]'
                      : 'bg-[#121815] border-[#3E6153]/20 hover:border-[#6B9A86]/60'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-[#6B9A86] pt-0.5">
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <h4
                      className={`text-xs sm:text-sm font-bold transition-colors ${
                        isLight ? 'text-[#13221C] group-hover:text-[#2F5A49]' : 'text-[#F4F2EC] group-hover:text-[#6B9A86]'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#7C8380] mt-1 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-[#7C8380] font-mono">
              {isAr
                ? '«الانضباط الرياضي يضمن الإنجاز، والهدوء يضمن النقاء الهندسي.»'
                : '“Athletic discipline guarantees velocity; calm focus guarantees architectural elegance.”'}
            </div>
          </div>

          {/* Right Column: Stack Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tech Matrix Card */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 space-y-6 ${
                isLight ? 'bg-white border-[#D3DFD9] shadow-md' : 'bg-[#161D1A] border-[#3E6153]/30'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#3E6153]/20">
                <span className="text-xs font-mono uppercase tracking-wider text-[#F4F2EC] font-bold">
                  {isAr ? 'مصفوفة الأدوات والتقنيات' : 'CORE TECH MATRIX'}
                </span>
                <Sparkles className="w-4 h-4 text-[#6B9A86]" />
              </div>

              {/* Group 1: Medical AI & Vision */}
              <div>
                <div className="text-[11px] font-mono text-[#6B9A86] font-bold uppercase mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#6B9A86]" />
                  <span>{isAr ? 'الذكاء الاصطناعي والرؤية الحاسوبية' : 'Medical AI & Vision'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#3E6153]/25 border border-[#3E6153]/50 text-xs font-mono text-[#F4F2EC]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group 2: Design & UI Systems */}
              <div>
                <div className="text-[11px] font-mono text-[#F4F2EC] font-bold uppercase mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F4F2EC]" />
                  <span>{isAr ? 'تصميم الواجهات وتجربة المستخدم' : 'Minimal UI/UX & Systems'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {designTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#F4F2EC]/10 border border-[#F4F2EC]/20 text-xs font-mono text-[#F4F2EC] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group 3: Frontend & Code */}
              <div>
                <div className="text-[11px] font-mono text-[#6B9A86] font-bold uppercase mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#6B9A86]" />
                  <span>{isAr ? 'تطوير البرمجيات الحديثة' : 'Web & Engineering'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {devTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#121815] border border-[#3E6153]/30 hover:border-[#6B9A86]/50 text-xs font-mono text-[#F4F2EC]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Collaboration Pill */}
            <div className="p-5 rounded-2xl bg-[#3E6153]/20 border border-[#3E6153]/40 text-xs text-[#F4F2EC] space-y-2">
              <div className="font-bold text-[#F4F2EC] font-mono text-xs uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B9A86]" />
                <span>{isAr ? 'طريقة التعاون المفضلة' : 'Collaboration Style'}</span>
              </div>
              <p className="leading-relaxed text-[#F4F2EC]/80 text-[11px]">
                {isAr
                  ? 'أفضل العمل في بيئات تقنية جادة تركز على الجودة العالية، وتتبنى التحديات المعقدة في مجالات الرعاية الصحية والرياضة.'
                  : 'I thrive in high-standard engineering teams solving real medical, kinematic, and computational challenges.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
