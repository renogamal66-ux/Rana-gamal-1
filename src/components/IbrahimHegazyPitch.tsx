import React, { useState } from 'react';
import { Sparkles, Send, Copy, Check, Terminal, Dumbbell, Stethoscope, Brain, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

interface IbrahimHegazyPitchProps {
  lang: Language;
}

export const IbrahimHegazyPitch: React.FC<IbrahimHegazyPitchProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'letter' | 'advantages' | 'vision'>('letter');
  const [copied, setCopied] = useState(false);

  const proposalLetterAr = `تحية طيبة واحتراماً كبيراً لحضرتك بشمهندس إبراهيم حجازي،

أنا رنا جمال، عمري 20 عاماً، طالبة في كلية الحاسبات والمعلومات، وبطلة جمهورية في الملاكمة، ومتخصصة في تطبيقات الذكاء الاصطناعي والتأهيل الحركي والعلاج الطبيعي.

أتابع مسيرتك التقنية الملهمة منذ فترة، وشغفي الأول هو العمل تحت قيادتك وضمن فريقك التقني. ما أقدمه ليس مجرد كود برمجي أو نماذج ذكاء اصطناعي، بل انضباط ذهني وبدني استثنائي اكتسبته كبطلة جمهورية لا تعرف الاستسلام، وخبرة تشريحية عميقة في العلاج الطبيعي والميكانيكا الحيوية لتوظيف الـ AI في القطاع الطبي.

أطمح لأن أكون عضواً فاعلاً في مشاريعك البرمجية والذكية، ومستعدة لبذل أقصى جهد لتقديم حلول مبتكرة تليق بمعايير عملك العالية.

مع فائق التقدير والاحترام،
رنا جمال`;

  const proposalLetterEn = `Dear Eng. Ibrahim Hegazy,

My name is Rana Gamal, a 20-year-old Computer Science & AI student, Egyptian Republic Boxing Champion, and clinical physical therapy researcher.

I have followed your inspiring engineering journey with immense respect, and it is my primary career ambition to collaborate with you and contribute directly to your high-impact technical initiatives.

What I bring to your team is a truly rare synergy: the relentless discipline, resilience, and calm composure forged through championship boxing, combined with rigorous computer science fundamentals and specialized biomechanics/medical domain expertise.

I would be honored to contribute to your engineering teams and build transformative, reliable software and AI systems together.

Warmest regards,
Rana Gamal`;

  const handleCopy = () => {
    navigator.clipboard.writeText(isAr ? proposalLetterAr : proposalLetterEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="pitch-hegazy" className="w-full py-20 bg-[#0e0e11] border-b border-[#232328] relative overflow-hidden">
      {/* Green/Emerald accent glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with special badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E6153]/30 border border-[#3E6153]/60 text-[#F4F2EC] text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#6B9A86]" />
              <span>{isAr ? 'رسالة ورؤية خاصة موجهة للمهندس إبراهيم حجازي' : 'A Dedicated Letter to Eng. Ibrahim Hegazy'}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#3E6153]/40 text-[#F4F2EC] text-[10px] font-semibold">Coram & Physio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F4F2EC] tracking-tight">
              {isAr ? (
                <>
                  لماذا أطمح للعمل مع <span className="text-[#6B9A86]">البشمهندس إبراهيم حجازي؟</span>
                </>
              ) : (
                <>
                  Collaboration Proposal: <span className="text-[#6B9A86]">Eng. Ibrahim Hegazy</span>
                </>
              )}
            </h2>
          </div>

          <div className="text-sm text-[#7C8380] max-w-md font-sans">
            {isAr
              ? 'مبادرة شخصية ومهنية توضح القيمة المضافة التي سأقدمها لفريق العمل: شغف الملاكمة، دقة العلاج الطبيعي، وذكاء الخوارزميات.'
              : 'A personal professional proposal articulating how championship boxing discipline and medical AI expertise bring immense value to engineering leadership.'}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#3E6153]/30 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'letter'
                ? 'bg-[#F4F2EC] text-[#121815] font-bold shadow-[0_0_20px_rgba(244,242,236,0.25)]'
                : 'text-[#7C8380] hover:text-[#F4F2EC] bg-[#161D1A] border border-[#3E6153]/30'
            }`}
          >
            {isAr ? 'الرسالة المفتوحة' : 'The Open Letter'}
          </button>
          <button
            onClick={() => setActiveTab('advantages')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'advantages'
                ? 'bg-[#F4F2EC] text-[#121815] font-bold shadow-[0_0_20px_rgba(244,242,236,0.25)]'
                : 'text-[#7C8380] hover:text-[#F4F2EC] bg-[#161D1A] border border-[#3E6153]/30'
            }`}
          >
            {isAr ? 'ماذا سأضيف لفريقك؟ (The Edge)' : 'What I Bring to Your Team'}
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'vision'
                ? 'bg-[#F4F2EC] text-[#121815] font-bold shadow-[0_0_20px_rgba(244,242,236,0.25)]'
                : 'text-[#7C8380] hover:text-[#F4F2EC] bg-[#161D1A] border border-[#3E6153]/30'
            }`}
          >
            {isAr ? 'الرؤية المشتركة في الـ AI الطبي' : 'Shared Medical AI Vision'}
          </button>
        </div>

        {/* Tab Content 1: Open Letter */}
        {activeTab === 'letter' && (
          <div className="rounded-2xl bg-[#161D1A] border border-[#3E6153]/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 border-b border-[#3E6153]/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3E6153]/25 border border-[#6B9A86]/40 flex items-center justify-center text-[#6B9A86]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#7C8380]">TO: Eng. Ibrahim Hegazy</div>
                  <div className="text-xs font-mono text-[#6B9A86] font-semibold">FROM: Rana Gamal (CS, Boxing Champion & AI Researcher)</div>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121815] hover:bg-[#3E6153]/30 text-[#F4F2EC] text-xs font-mono transition-colors border border-[#3E6153]/30"
                title="Copy Letter"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#6B9A86]" />
                    <span className="text-[#6B9A86]">{isAr ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نسخ الرسالة' : 'Copy Pitch'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-[#F4F2EC]/90 leading-relaxed font-sans text-sm sm:text-base space-y-4 whitespace-pre-line">
              {isAr ? proposalLetterAr : proposalLetterEn}
            </div>

            <div className="mt-8 pt-6 border-t border-[#3E6153]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#7C8380] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#6B9A86]"></span>
                <span>{isAr ? 'جاهزة فوراً لبدء المقابلة التقنية والمناقشة' : 'Ready for technical interview & discussion'}</span>
              </div>
              <a
                href="mailto:rana.gamal.ai@gmail.com?subject=Collaboration%20Inquiry%20from%20Rana%20Gamal"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4F2EC] text-[#121815] font-bold text-xs tracking-wider uppercase hover:bg-[#6B9A86] hover:text-[#F4F2EC] transition-all shadow-[0_0_20px_rgba(244,242,236,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'إرسال رسالة مباشرة للمهندس إبراهيم' : 'Send Direct Inquiry'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Tab Content 2: What I Bring to Your Team */}
        {activeTab === 'advantages' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#161D1A] border border-[#3E6153]/30 hover:border-[#6B9A86] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#3E6153]/25 border border-[#6B9A86]/40 flex items-center justify-center text-[#6B9A86] mb-4">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F4F2EC] mb-2">
                {isAr ? '1. انضباط بطلة الجمهورية (Championship Grit)' : '1. Championship Boxing Discipline'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7C8380] leading-relaxed">
                {isAr
                  ? 'الملاكمة ليست مجرد رياضة؛ هي فن الهدوء تحت أقصى درجات الضغط، وقراءة تحركات الخصم في أجزاء من الثانية. هذه المهارة تنعكس على عملي البرمجي: التزام صارم بالمواعيد، هدوء ذهني في معالجة الأخطاء (Debugging)، وعزيمة لا تنكسر.'
                  : 'Boxing trains extreme composure under intense pressure and split-second tactical decisions. In software engineering, this yields relentless debugging grit, zero panic under deadlines, and unwavering perseverance.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161D1A] border border-[#3E6153]/30 hover:border-[#6B9A86] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#3E6153]/25 border border-[#6B9A86]/40 flex items-center justify-center text-[#6B9A86] mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F4F2EC] mb-2">
                {isAr ? '2. التخصص المزدوج (Medical Domain Expert)' : '2. Dual Domain: Medicine & Tech'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7C8380] leading-relaxed">
                {isAr
                  ? 'معظم مهندسي الـ AI يفتقرون للفهم الطبي العميق، بينما الأطباء يفتقرون للقدرة البرمجية. خبرتي في العلاج الطبيعي والميكانيكا الحيوية مع دراستي للحاسبات تسمح لي ببناء نماذج ذكاء اصطناعي تفهم الجسم البشري حقيقة لا مجرد أرقام.'
                  : 'Bridging the critical gap: AI engineers typically lack anatomical biomechanics insight, while clinicians lack coding prowess. My dual mastery ensures models solve true clinical needs.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161D1A] border border-[#3E6153]/30 hover:border-[#6B9A86] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#3E6153]/25 border border-[#6B9A86]/40 flex items-center justify-center text-[#6B9A86] mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F4F2EC] mb-2">
                {isAr ? '3. شغف الـ 20 عاماً والتعلم السريع' : '3. 20-Year-Old Agility & Rapid Learning'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7C8380] leading-relaxed">
                {isAr
                  ? 'طاقتي في أعلى درجاتها، لدي شغف لا ينضب بالتعلم، واستيعاب سريع لأحدث التقنيات وأطر العمل، واستعداد كامل للعمل لساعات طويلة بكل هدوء وتركيز من أجل إنجاح رؤية الفريق.'
                  : 'At 20, my vitality, curiosity, and learning curve are at their peak. Ready to absorb engineering best practices rapidly and execute with disciplined endurance.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 3: Shared Medical AI Vision */}
        {activeTab === 'vision' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#161D1A] border border-[#3E6153]/30 space-y-6">
            <h3 className="text-xl font-bold text-[#F4F2EC]">
              {isAr ? 'رؤيتي لمستقبل الذكاء الاصطناعي في قطاع الرعاية الصحية والطب الرياضي' : 'Vision for Healthcare AI & Sports Precision'}
            </h3>
            <p className="text-sm text-[#7C8380] leading-relaxed">
              {isAr
                ? 'العالم يتجه نحو الرعاية الصحية الوقائية والتشخيص الفوري عبر الرؤية الحاسوبية (Computer Vision) وتحليل الإشارات الحيوية. من خلال العمل مع البشمهندس إبراهيم حجازي، يمكننا قيادة مشاريع متطورة تخدم المستشفيات والعيادات ومراكز التأهيل في مصر والشرق الأوسط، مستفيدين من البنية البرمجية المتينة ونماذج التعلم العميق المتخصصة.'
                : 'The frontier of medical tech lies in preventative edge AI, computer vision biomechanics, and kinematic recovery telemetry. Collaborating with seasoned engineering leadership enables deploying enterprise-grade health AI platforms across Egypt and MENA.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#121815] border border-[#3E6153]/30 hover:border-[#6B9A86]/50 transition-colors">
                <div className="text-[#6B9A86] font-semibold text-sm mb-1">
                  {isAr ? 'التشخيص الحركي الذكي' : 'Computer Vision Diagnostics'}
                </div>
                <div className="text-xs text-[#7C8380]">
                  {isAr ? 'استبدال الفحوصات اليدوية البطيئة بتحليل رقمي فوري لزوايا الأطراف والعمود الفقري.' : 'Replacing manual inspections with 60fps real-time kinematic posture calculation.'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#121815] border border-[#3E6153]/30 hover:border-[#6B9A86]/50 transition-colors">
                <div className="text-[#F4F2EC] font-semibold text-sm mb-1">
                  {isAr ? 'الوقاية من الإصابات قبل وقوعها' : 'Predictive Injury Prevention'}
                </div>
                <div className="text-xs text-[#7C8380]">
                  {isAr ? 'خوارزميات تنبؤية ترصد الإجهاد العضلي قبل حدوث التمزق في الملاعب والحلبات.' : 'Neural algorithms analyzing micro-fatigue cues before catastrophic muscle tears occur.'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
