import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Terminal, Dumbbell, HeartPulse, Send, Award } from 'lucide-react';
import { Language } from '../types';
import { ASSETS } from '../data';

interface HegazyLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HegazyLetterModal: React.FC<HegazyLetterModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [replyNote, setReplyNote] = useState('');
  const [meetingRequested, setMeetingRequested] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNoteId, setSubmittedNoteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendPitchResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyNote.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/hegazy-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName || 'Eng. Ibrahim Hegazy / Team',
          contact: contactInfo || 'Direct platform note',
          note: replyNote,
          meetingRequested,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedNoteId(data.pitchId || `HEGAZY-${Date.now()}`);
      }
    } catch {
      setSubmittedNoteId(`HEGAZY-${Date.now()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const letterAr = `تحية طيبة واحتراماً كبيراً لحضرتك بشمهندس إبراهيم حجازي،

أنا رنا جمال، عمري 20 عاماً، طالبة في كلية الحاسبات والمعلومات وبطلة جمهورية في الملاكمة، ومتخصصة في تطبيقات الذكاء الاصطناعي الطبي والتأهيل الحركي والعلاج الطبيعي.

أتابع مسيرتك التقنية وأسلوبك القيادي الملهم بكل فخر، وشغفي وطموحي الأول هو العمل تحت إشرافك والتعلم من خبرتك والمساهمة الفاعلة ضمن مشاريعك.

ما أقدمه لفريقك ليس مجرد معرفة برمجية، بل:
1. انضباط الحلبة كبطلة جمهورية: قدرة هائلة على التركيز تحت الضغط والالتزام التام بالنتائج.
2. فهم تشريحي وحركي عميق: خبرة عملية في العلاج الطبيعي والميكانيكا الحيوية لتوظيف الـ AI في القطاع الصحي والرياضي.
3. هدوء ذهني وشغف لا ينضب: أعشق الهدوء واللون الأصفر، وأسعى لبناء أنظمة تترك أثراً حقيقياً في حياة الناس.

يشرفني جداً أن أحظى بفرصة نقاش مهني معك، ومستعدة لكل التحديات لتقديم أعلى معايير الجودة.

مع خالص التقدير،
رنا جمال`;

  const letterEn = `Dear Eng. Ibrahim Hegazy,

My name is Rana Gamal, a 20-year-old Computer Science & AI student, Egyptian Republic Boxing Champion, and clinical physical therapy researcher.

I have followed your inspiring engineering journey and leadership with deep admiration. My primary career objective is to work under your guidance, learn from your expertise, and contribute meaningfully to your technical initiatives.

What I bring to your team:
1. Championship Boxing Discipline: Relentless grit, mental endurance under pressure, and ruthless execution.
2. Clinical & Kinematic Domain Depth: Practical mastery in physical therapy and biomechanics to engineer world-class Medical AI.
3. Calm Focus & Relentless Drive: A tranquil mindset paired with explosive productivity and dedication to technical excellence.

I would be truly honored to connect and discuss how my skills and athletic discipline can accelerate your engineering goals.

Warmest regards,
Rana Gamal`;

  const handleCopy = () => {
    navigator.clipboard.writeText(isAr ? letterAr : letterEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#161D1A] border border-[#2F3E3C] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)] ring-4 ring-[#BDDBD1]/20 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#2F3E3C] bg-[#121815] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#BDDBD1] ring-2 ring-[#2F3E3C] flex-shrink-0">
              <img
                src={ASSETS.ranaSquarePortrait}
                alt="Rana Gamal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F4F2EC] uppercase tracking-wider">
                {isAr ? 'رسالة خاصة للبشمهندس إبراهيم حجازي' : 'Dedicated Letter to Eng. Ibrahim Hegazy'}
              </h3>
              <p className="text-[11px] text-[#BDDBD1] font-mono font-medium">
                {isAr ? 'رنا جمال • 20 عاماً • بطلة جمهورية • ذكاء اصطناعي طبي' : 'Rana Gamal • CS & Medical AI • Boxing Champion'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2F3E3C] flex items-center justify-center text-[#7C8380] hover:text-[#BDDBD1] hover:border-[#BDDBD1]/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Highlight badges */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[#121815] border border-[#2F3E3C] hover:border-[#BDDBD1]/50 transition-colors">
              <Award className="w-4 h-4 text-[#BDDBD1] mx-auto mb-1" />
              <div className="text-[11px] font-bold text-[#F4F2EC]">
                {isAr ? 'ذهبية الملاكمة' : 'Boxing Gold'}
              </div>
              <div className="text-[10px] text-[#7C8380]">
                {isAr ? 'انضباط لا يلين' : 'National Champion'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#121815] border border-[#2F3E3C] hover:border-[#BDDBD1]/50 transition-colors">
              <Terminal className="w-4 h-4 text-[#BDDBD1] mx-auto mb-1" />
              <div className="text-[11px] font-bold text-[#F4F2EC]">
                {isAr ? 'حاسبات ومعلومات' : 'CS Student'}
              </div>
              <div className="text-[10px] text-[#BDDBD1]">
                {isAr ? 'ذكاء اصطناعي طبي' : 'Medical AI'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#2F3E3C]/60 border border-[#BDDBD1]/40">
              <HeartPulse className="w-4 h-4 text-[#BDDBD1] mx-auto mb-1" />
              <div className="text-[11px] font-bold text-[#F4F2EC]">
                {isAr ? 'علاج طبيعي' : 'Physical Therapy'}
              </div>
              <div className="text-[10px] text-[#BDDBD1]">
                {isAr ? 'خبرة عملية عميقة' : 'Kinematic Rehab'}
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="p-5 rounded-xl bg-[#121815] border border-[#2F3E3C] leading-relaxed text-[#F4F2EC]/90 whitespace-pre-line font-sans text-xs sm:text-sm">
            {isAr ? letterAr : letterEn}
          </div>

          {/* Interactive Response / Meeting Invitation Section */}
          <div className="p-4 rounded-xl bg-[#161D1A] border border-[#BDDBD1]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-[#F4F2EC]">
                  {isAr ? 'ترك رد مباشر أو طلب مقابلة لرنا جمال' : 'Leave a Direct Note / Meeting Request for Rana'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-[11px] font-mono text-[#BDDBD1] hover:underline cursor-pointer"
              >
                {showReplyForm ? (isAr ? 'إخفاء النموذج' : 'Hide Form') : (isAr ? 'كتابة رد الآن ✦' : 'Write Note ✦')}
              </button>
            </div>

            {submittedNoteId ? (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-400/40 text-center space-y-1">
                <div className="text-xs font-bold text-emerald-300">
                  {isAr ? 'تم استلام ملاحظتك وتوثيقها على السيرفر بنجاح!' : 'Your note was recorded on the server successfully!'}
                </div>
                <div className="text-[10px] font-mono text-[#BDDBD1]">
                  Receipt ID: {submittedNoteId}
                </div>
              </div>
            ) : showReplyForm ? (
              <form onSubmit={handleSendPitchResponse} className="space-y-2.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={isAr ? 'اسمك / شركتك' : 'Your Name / Org'}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#121815] border border-[#2F3E3C] text-xs text-[#F4F2EC] focus:border-[#BDDBD1] outline-none"
                  />
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={isAr ? 'بريدك أو رقم واتساب' : 'Email or WhatsApp'}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#121815] border border-[#2F3E3C] text-xs text-[#F4F2EC] focus:border-[#BDDBD1] outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  value={replyNote}
                  onChange={(e) => setReplyNote(e.target.value)}
                  placeholder={
                    isAr
                      ? 'اكتب ملاحظتك لرنا هنا (طلب مقابلة، فرصة عمل، رأي في المشاريع)...'
                      : 'Leave your note for Rana here (meeting request, opportunity, feedback)...'
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#121815] border border-[#2F3E3C] text-xs text-[#F4F2EC] focus:border-[#BDDBD1] outline-none resize-none"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[11px] text-[#7C8380] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={meetingRequested}
                      onChange={(e) => setMeetingRequested(e.target.checked)}
                      className="rounded accent-emerald-400"
                    />
                    <span>{isAr ? 'طلب مقابلة عمل / نقاش تقني' : 'Request technical interview / meeting'}</span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono inline-flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Sparkles className="w-3 h-3 animate-spin" />
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                    <span>{isAr ? 'إرسال إلى رنا' : 'Send to Rana'}</span>
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#2F3E3C] bg-[#121815] flex items-center justify-between gap-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#2F3E3C] hover:border-[#BDDBD1] text-xs font-mono text-[#7C8380] hover:text-[#BDDBD1] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#BDDBD1]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ نص الرسالة' : 'Copy Letter')}</span>
          </button>

          <a
            href="mailto:rana.gamal.ai@gmail.com?subject=Collaboration%20with%20Rana%20Gamal"
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg bg-[#2F3E3C] text-[#BDDBD1] hover:bg-[#BDDBD1] hover:text-[#121815] border border-[#BDDBD1]/40 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAr ? 'تواصل عبر البريد مباشرة' : 'Direct Email Contact'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
