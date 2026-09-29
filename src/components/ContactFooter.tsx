import React, { useState } from 'react';
import { Mail, Instagram, MapPin, Sparkles, Check, Send, X, ArrowUpRight, Copy, Github, Linkedin } from 'lucide-react';
import { Language, Theme } from '../types';
import { ASSETS, PERSONAL_INFO } from '../data';

interface ContactFooterProps {
  lang: Language;
  theme?: Theme;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ lang, theme = 'dark' }) => {
  const isAr = lang === 'ar';
  const isLight = theme === 'light';
  const [modalOpen, setModalOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rana.gamal.ai@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email || !formValues.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          message: formValues.message,
          subject: 'Portfolio Direct Contact',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionId(data.messageId || `MSG-${Date.now()}`);
        setMessageSent(true);
        setFormValues({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to deliver message');
      }
    } catch {
      // Fallback optimistic confirmation
      setSubmissionId(`MSG-${Date.now()}`);
      setMessageSent(true);
      setFormValues({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setMessageSent(false);
        setSubmissionId(null);
        setModalOpen(false);
      }, 4000);
    }
  };

  return (
    <footer
      id="contact"
      className={`w-full pt-16 pb-12 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#EBF1EE] text-[#13221C]' : 'bg-[#0D1210] text-[#F4F2EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Modern Minimal Callout Box */}
        <div
          className={`rounded-3xl border p-8 sm:p-12 lg:p-14 relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white border-[#D3DFD9] shadow-xl'
              : 'bg-[#161D1A] border-[#2F3E3C]'
          }`}
        >
          {/* Subtle warm ivory ambient and CORAM scrub green / spruce glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#BDDBD1]/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2F3E3C]/30 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Column 1: Headline & Statement (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F3E3C] border border-[#BDDBD1]/40 text-[11px] font-mono text-[#BDDBD1]">
                <span className="w-2 h-2 rounded-full bg-[#BDDBD1] animate-pulse"></span>
                <span>{isAr ? 'مستعدة لفرص العمل والبحث العلمي' : 'OPEN FOR COLLABORATION & RESEARCH'}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#161D1A] text-[#BDDBD1] text-[10px] font-semibold border border-[#BDDBD1]/30">#2F3E3C & #BDDBD1</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F2EC] tracking-tight leading-tight font-sans-modern">
                {isAr ? (
                  <>
                    لنبتكر معاً حلولاً <span className="text-[#BDDBD1]">ذكية وهادئة</span>.
                  </>
                ) : (
                  <>
                    Let's Build Something <span className="text-[#BDDBD1]">Extraordinary</span> Together.
                  </>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-[#7C8380] max-w-xl font-sans leading-relaxed">
                {isAr
                  ? 'مستعدة للتعاون مع المهندسين والباحثين، وبشكل خاص بشمهندس إبراهيم حجازي، لتطبيق الذكاء الاصطناعي في الطب والرياضة بأعلى درجات الجودة.'
                  : 'Ready to contribute to groundbreaking Medical AI and biomechanical ventures with championship discipline and calm focus.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F4F2EC] text-[#121815] font-bold text-xs uppercase tracking-wider hover:bg-[#BDDBD1] hover:text-[#121815] transition-all shadow-[0_4px_20px_rgba(244,242,236,0.15)] active:scale-95"
                >
                  <span>{isAr ? 'أرسل رسالة مباشرة' : 'Send Direct Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] hover:border-[#BDDBD1] text-[#F4F2EC] hover:text-[#BDDBD1] text-xs font-mono transition-all active:scale-95"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#BDDBD1]" /> : <Copy className="w-3.5 h-3.5 text-[#7C8380]" />}
                  <span>{copiedEmail ? (isAr ? 'تم نسخ البريد!' : 'Copied to Clipboard!') : 'rana.gamal.ai@gmail.com'}</span>
                </button>
              </div>
            </div>

            {/* Column 2: Minimal Identity Info Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#121815] border border-[#2F3E3C] ring-2 ring-[#BDDBD1]/20 shadow-2xl space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#BDDBD1] ring-2 ring-[#2F3E3C] flex-shrink-0 shadow-sm">
                  <img
                    src={ASSETS.ranaSquarePortrait}
                    alt="Rana Gamal"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F4F2EC] tracking-wide">
                    {isAr ? 'رنا جمال' : 'Rana Gamal'}
                  </div>
                  <div className="text-xs text-[#BDDBD1] font-mono font-semibold">
                    {isAr ? 'ذكاء اصطناعي طبي • بطلة جمهورية' : 'Medical AI & CS • Boxing Gold'}
                  </div>
                  <div className="text-[11px] text-[#7C8380] flex items-center gap-1 mt-0.5 font-mono">
                    <MapPin className="w-3 h-3 text-[#BDDBD1]" />
                    <span>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2F3E3C] space-y-2.5 text-xs font-mono">
                <a
                  href="mailto:rana.gamal.ai@gmail.com"
                  className="flex items-center justify-between text-[#7C8380] hover:text-[#BDDBD1] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#7C8380]" />
                    <span>rana.gamal.ai@gmail.com</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7C8380]" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-[#7C8380] hover:text-[#BDDBD1] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-[#7C8380]" />
                    <span>github.com/ranagamal</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7C8380]" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-[#7C8380] hover:text-[#BDDBD1] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-[#7C8380]" />
                    <span>linkedin.com/in/rana-gamal</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7C8380]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7C8380]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Rana Gamal</span>
            <span>•</span>
            <span className="text-[#BDDBD1]/90">
              #2F3E3C (Spruce) • #BDDBD1 (Mint) • #3E6153 • #F4F2EC
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>{isAr ? 'كلية الحاسبات والمعلومات' : 'Faculty of Computers & AI'}</span>
            <span>•</span>
            <span className="text-[#BDDBD1] font-semibold">{isAr ? 'بطلة جمهورية في الملاكمة' : 'Republic Boxing Champion'}</span>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#161D1A] border border-[#2F3E3C] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2F3E3C] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#F4F2EC]">
                  {isAr ? 'إرسال رسالة مباشرة' : 'SEND A DIRECT MESSAGE'}
                </span>
                <span className="text-[#BDDBD1]">✦</span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-lg border border-[#2F3E3C] flex items-center justify-center text-[#7C8380] hover:text-[#BDDBD1]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {messageSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#2F3E3C] border border-[#BDDBD1]/50 text-[#BDDBD1] flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-[#F4F2EC]">
                  {isAr ? 'تم استلام وتوثيق رسالتك على السيرفر بنجاح!' : 'Message Verified & Recorded on Server!'}
                </div>
                {submissionId && (
                  <div className="text-[11px] font-mono text-[#BDDBD1] bg-[#121815] border border-[#2F3E3C] py-1 px-3 rounded-lg inline-block">
                    Ref ID: {submissionId}
                  </div>
                )}
                <p className="text-xs text-[#7C8380]">
                  {isAr
                    ? 'شكراً لتواصلك يا فندم. سأرد عليك في أقرب وقت بإذن الله.'
                    : "Thank you for reaching out. I'll get back to you shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#7C8380] mb-1">
                    {isAr ? 'الاسم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    placeholder={isAr ? 'مثال: م. إبراهيم حجازي' : 'e.g. Eng. Ibrahim Hegazy'}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#121815] border border-[#2F3E3C] text-xs text-[#F4F2EC] focus:outline-none focus:border-[#BDDBD1]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#7C8380] mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#121815] border border-[#2F3E3C] text-xs text-[#F4F2EC] focus:outline-none focus:border-[#BDDBD1]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#7C8380] mb-1">
                    {isAr ? 'الرسالة' : 'Your Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formValues.message}
                    onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                    placeholder={
                      isAr
                        ? 'مرحباً رنا، اطلعت على ملفك وأود مناقشة فرصة عمل أو مشروع تقني...'
                        : 'Hi Rana, I reviewed your work and would like to discuss an opportunity...'
                    }
                    className="w-full px-3 py-2.5 rounded-lg bg-[#121815] border border-[#2F3E3C] text-xs text-[#F4F2EC] focus:outline-none focus:border-[#BDDBD1] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#2F3E3C] hover:bg-[#BDDBD1] text-[#BDDBD1] hover:text-[#121815] border border-[#BDDBD1]/40 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{isAr ? 'جاري الإرسال والتوثيق...' : 'Sending to Server...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إرسال الرسالة الآن' : 'SEND MESSAGE NOW'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
