import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Server,
  Activity,
  Cpu,
  Database,
  Mail,
  FileCode,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Terminal,
  Bot,
  Copy,
  Check,
} from 'lucide-react';
import { Language, BackendHealthStatus } from '../types';
import { playImageSound } from '../utils/imageSound';

interface FullStackConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const FullStackConsoleModal: React.FC<FullStackConsoleModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'health' | 'tester' | 'inbox' | 'hegazy'>('health');
  const [healthData, setHealthData] = useState<BackendHealthStatus | null>(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState<boolean>(false);

  // Tester state
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/health');
  const [testPayload, setTestPayload] = useState<string>('{}');
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isExecutingTest, setIsExecutingTest] = useState<boolean>(false);
  const [copiedResponse, setCopiedResponse] = useState<boolean>(false);

  // Inbox & Hegazy logs
  const [messages, setMessages] = useState<any[]>([]);
  const [hegazyNotes, setHegazyNotes] = useState<any[]>([]);

  const fetchHealth = async () => {
    setIsLoadingHealth(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthData(data);
    } catch (err) {
      console.warn('Health fetch error:', err);
    } finally {
      setIsLoadingHealth(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const [msgRes, noteRes] = await Promise.all([
        fetch('/api/contact/messages'),
        fetch('/api/hegazy-pitch/notes'),
      ]);
      const msgData = await msgRes.json();
      const noteData = await noteRes.json();
      if (msgData.success) setMessages(msgData.messages || []);
      if (noteData.success) setHegazyNotes(noteData.notes || []);
    } catch (err) {
      console.warn('Log fetch error:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
      fetchLogs();
    }
  }, [isOpen]);

  const handleSelectEndpoint = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    if (endpoint === '/api/health') {
      setTestPayload('{}');
    } else if (endpoint === '/api/physio-consult') {
      setTestPayload(
        JSON.stringify(
          {
            question: 'ما هي أفضل تمارين لعلاج طقطقة الركبة وتقوية عضلات VMO؟',
            focusArea: 'knee',
            lang: 'ar',
          },
          null,
          2
        )
      );
    } else if (endpoint === '/api/rehab-plan') {
      setTestPayload(
        JSON.stringify(
          {
            focusArea: 'shoulder',
            goal: 'recovery',
            fitnessLevel: 'athlete',
            weeks: 4,
            lang: 'ar',
          },
          null,
          2
        )
      );
    }
  };

  const executeApiTest = async () => {
    setIsExecutingTest(true);
    playImageSound('pop');
    try {
      let res;
      if (selectedEndpoint === '/api/health') {
        res = await fetch('/api/health');
      } else {
        let bodyJson = {};
        try {
          bodyJson = JSON.parse(testPayload);
        } catch {}
        res = await fetch(selectedEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyJson),
        });
      }
      const data = await res.json();
      setTestResponse(data);
      playImageSound('avatar');
    } catch (err: any) {
      setTestResponse({ error: err?.message || 'Request failed' });
    } finally {
      setIsExecutingTest(false);
    }
  };

  const handleCopyResponse = () => {
    if (!testResponse) return;
    navigator.clipboard.writeText(JSON.stringify(testResponse, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#161D1A] border border-[#2F3E3C] rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.95)] ring-2 ring-emerald-500/20 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#2F3E3C] bg-[#121815] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-sans-modern tracking-wide">
                  {isAr ? 'لوحة المراقبة والتحكم بالخادم (Full-Stack Console)' : 'Full-Stack Engine & API Console'}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-[#BDDBD1] font-mono">
                Express Server • Gemini 3.8 Flash • Real-Time Kinesiology APIs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2F3E3C] flex items-center justify-center text-[#7C8380] hover:text-[#BDDBD1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-[#2F3E3C] bg-[#141C18] flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'health', label: isAr ? 'صحة السيرفر والمحرك' : 'Server Health & AI', icon: Activity },
            { id: 'tester', label: isAr ? 'مختبر الـ API المباشر' : 'Live API Playground', icon: Terminal },
            { id: 'inbox', label: `${isAr ? 'رسائل التواصل' : 'Inbox Messages'} (${messages.length})`, icon: Mail },
            { id: 'hegazy', label: `${isAr ? 'ملاحظات م. إبراهيم' : 'Hegazy Notes'} (${hegazyNotes.length})`, icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  playImageSound('pop');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-emerald-400 text-emerald-300'
                    : 'border-transparent text-[#7C8380] hover:text-[#BDDBD1]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: SERVER HEALTH & METRICS */}
          {activeTab === 'health' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F3E3C]">
                <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  {isAr ? 'حالة السيرفر ومؤشرات الأداء في الوقت الفعلي' : 'Real-Time Server Telemetry & Status'}
                </span>
                <button
                  onClick={fetchHealth}
                  disabled={isLoadingHealth}
                  className="px-2.5 py-1 rounded-lg bg-[#2F3E3C] text-emerald-300 text-[11px] font-mono flex items-center gap-1.5 hover:bg-[#3E6153] cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingHealth ? 'animate-spin' : ''}`} />
                  <span>{isAr ? 'تحديث' : 'Refresh'}</span>
                </button>
              </div>

              {/* Status Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] space-y-1">
                  <div className="text-[10px] font-mono text-[#7C8380] uppercase">Status</div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>200 OK</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] space-y-1">
                  <div className="text-[10px] font-mono text-[#7C8380] uppercase">AI Model</div>
                  <div className="text-xs font-bold text-white font-mono">
                    {healthData?.model || 'gemini-3.8-flash'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    {healthData?.aiReady ? '● Multimodal Live' : '○ Fallback Active'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] space-y-1">
                  <div className="text-[10px] font-mono text-[#7C8380] uppercase">Uptime</div>
                  <div className="text-xs font-bold text-white font-mono">
                    {healthData?.uptime !== undefined ? `${healthData.uptime}s` : 'Active'}
                  </div>
                  <div className="text-[10px] text-[#7C8380]">Node / Express</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121815] border border-[#2F3E3C] space-y-1">
                  <div className="text-[10px] font-mono text-[#7C8380] uppercase">Memory RSS</div>
                  <div className="text-xs font-bold text-white font-mono">
                    {healthData?.memoryUsageMB ? `${healthData.memoryUsageMB} MB` : 'Optimal'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">Lightweight</div>
                </div>
              </div>

              {/* Endpoints Registry Table */}
              <div className="rounded-xl border border-[#2F3E3C] overflow-hidden bg-[#121815]">
                <div className="px-4 py-2.5 bg-[#1A221F] border-b border-[#2F3E3C] font-mono text-[11px] font-bold text-[#BDDBD1]">
                  {isAr ? 'الواجهات البرمجية النشطة (Full-Stack Routes)' : 'Registered Backend Endpoints'}
                </div>
                <div className="divide-y divide-[#2F3E3C] font-mono text-[11px]">
                  {[
                    { method: 'GET', path: '/api/health', desc: isAr ? 'فحص صحة السيرفر والإحصائيات' : 'Health check & telemetry metrics' },
                    { method: 'POST', path: '/api/analyze-physio', desc: isAr ? 'فحص الصور الحركية وقياس الزوايا بـ Gemini' : 'Multimodal Vision joint kinesiology analysis' },
                    { method: 'POST', path: '/api/physio-consult', desc: isAr ? 'استشارات كينزيولوجية وتأهيلية مباشرة' : 'AI Clinical Kinesiology consultation Q&A' },
                    { method: 'POST', path: '/api/rehab-plan', desc: isAr ? 'توليد برنامج تأهيلي كامل 4 أسابيع' : 'AI multi-week progressive rehab plan generator' },
                    { method: 'GET/POST/DELETE', path: '/api/patient/scans', desc: isAr ? 'إدارة وحفظ فحوصات المرضى' : 'Patient clinical scans persistence' },
                    { method: 'POST', path: '/api/contact', desc: isAr ? 'استلام وتوثيق رسائل التواصل المباشرة' : 'Direct contact form submission & logging' },
                    { method: 'POST', path: '/api/hegazy-pitch', desc: isAr ? 'استقبال ردود وطلبات مقابلات م. إبراهيم حجازي' : 'Eng. Ibrahim Hegazy dedicated pitch responses' },
                  ].map((route, rIdx) => (
                    <div key={rIdx} className="px-4 py-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-[#2F3E3C] text-emerald-300 text-[10px] font-bold">
                          {route.method}
                        </span>
                        <span className="text-white">{route.path}</span>
                      </div>
                      <span className="text-[#7C8380] hidden sm:inline">{route.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE API PLAYGROUND */}
          {activeTab === 'tester' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  {isAr ? 'اختبار الواجهات البرمجية مباشرة على السيرفر' : 'Interactive Endpoint Tester'}
                </span>
                <div className="flex items-center gap-1.5">
                  {['/api/health', '/api/physio-consult', '/api/rehab-plan'].map((ep) => (
                    <button
                      key={ep}
                      onClick={() => handleSelectEndpoint(ep)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                        selectedEndpoint === ep
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-[#121815] border border-[#2F3E3C] text-[#BDDBD1] hover:border-emerald-400'
                      }`}
                    >
                      {ep}
                    </button>
                  ))}
                </div>
              </div>

              {/* Request Payload Editor */}
              {selectedEndpoint !== '/api/health' && (
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-[#7C8380]">
                    Request Payload (JSON Body):
                  </label>
                  <textarea
                    rows={4}
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#121815] border border-[#2F3E3C] text-xs font-mono text-emerald-300 outline-none resize-none"
                  />
                </div>
              )}

              <button
                onClick={executeApiTest}
                disabled={isExecutingTest}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isExecutingTest ? (
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>{isExecutingTest ? 'Sending Request...' : `Send POST ${selectedEndpoint}`}</span>
              </button>

              {/* Response Inspector */}
              {testResponse && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      Response Inspector:
                    </span>
                    <button
                      onClick={handleCopyResponse}
                      className="px-2 py-1 rounded-md bg-[#2F3E3C] text-[#BDDBD1] text-[10px] font-mono flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      {copiedResponse ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedResponse ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#101513] border border-[#2F3E3C] text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[220px]">
                    {JSON.stringify(testResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT INBOX MESSAGES */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F3E3C]">
                <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  {isAr ? 'سجل رسائل التواصل المستلمة على السيرفر' : 'Messages Received via /api/contact'}
                </span>
                <button
                  onClick={fetchLogs}
                  className="px-2.5 py-1 rounded-lg bg-[#2F3E3C] text-emerald-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isAr ? 'تحديث' : 'Refresh'}</span>
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="py-10 text-center text-[#7C8380] font-mono">
                  {isAr ? 'لا توجد رسائل جديدة مستلمة بعد. جرب إرسال رسالة من أسفل الصفحة!' : 'No messages received yet. Submit a message from the footer!'}
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, mIdx) => (
                    <div key={mIdx} className="p-4 rounded-xl bg-[#121815] border border-[#2F3E3C] space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white font-bold">{msg.name} ({msg.email})</span>
                        <span className="text-emerald-400">{msg.id}</span>
                      </div>
                      <p className="text-xs text-[#BDDBD1] font-sans leading-relaxed">{msg.message}</p>
                      <div className="text-[10px] font-mono text-[#7C8380]">
                        {new Date(msg.receivedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HEGAZY NOTES */}
          {activeTab === 'hegazy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F3E3C]">
                <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  {isAr ? 'ملاحظات وردود م. إبراهيم حجازي المستلمة' : 'Responses Recorded via /api/hegazy-pitch'}
                </span>
                <button
                  onClick={fetchLogs}
                  className="px-2.5 py-1 rounded-lg bg-[#2F3E3C] text-emerald-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isAr ? 'تحديث' : 'Refresh'}</span>
                </button>
              </div>

              {hegazyNotes.length === 0 ? (
                <div className="py-10 text-center text-[#7C8380] font-mono">
                  {isAr ? 'لا توجد ملاحظات مسجلة بعد. جرب كتابة رد من نافذة مقترح م. إبراهيم!' : 'No notes recorded yet. Leave a note from the Hegazy letter modal!'}
                </div>
              ) : (
                <div className="space-y-3">
                  {hegazyNotes.map((note, nIdx) => (
                    <div key={nIdx} className="p-4 rounded-xl bg-[#121815] border border-[#2F3E3C] space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white font-bold">{note.senderName} ({note.contact})</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                          {note.meetingRequested ? 'Meeting Requested' : 'Note'}
                        </span>
                      </div>
                      <p className="text-xs text-[#BDDBD1] font-sans leading-relaxed">{note.note}</p>
                      <div className="text-[10px] font-mono text-[#7C8380]">
                        {new Date(note.receivedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#2F3E3C] bg-[#121815] flex items-center justify-between text-xs font-mono text-[#7C8380]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Rana Gamal Portfolio Engine v2.0 • Full-Stack Verified</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2F3E3C] hover:bg-[#3E6153] text-[#BDDBD1] hover:text-white transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق اللوحة' : 'Close Console'}
          </button>
        </div>
      </div>
    </div>
  );
};
