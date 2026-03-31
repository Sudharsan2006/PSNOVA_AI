import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API = 'https://team-ai-backend-zw75.onrender.com';

const genId = () => `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const SUGGESTIONS = [
  'Tell me about the team',
  "What projects has Narendra built?",
  "What are Nissanth's skills?",
  'How can I contact Sudharsan?',
];

// ── Complete client-side fallback (works 100% without backend) ──────
const getLocalFallback = (msg) => {
  const q = msg.toLowerCase();

  if (q.match(/hi|hello|hey|hola|sup/))
    return "Hey there! 👋 I'm the PSNOVA AI assistant. Ask me about our team — Sudharsan, Praveen, Nissanth, or Narendra!";

  if (q.includes('sudharsan'))
    return "Sudharsan R V is a Data Analyst 📊 specializing in Power BI, Tableau, Python & SQL. He transforms complex datasets into stunning visual stories. Portfolio: sudharsanrv.vercel.app";

  if (q.includes('praveen'))
    return "Praveen Kumar B is a Data Analyst 💡 skilled in Python, SQL, Excel, Power BI & Statistics. He builds end-to-end analytics pipelines from raw data to impactful dashboards. Portfolio: praveennkumar.vercel.app";

  if (q.includes('nissanth'))
    return "Nissanth S P is an AI/ML Engineer 🤖 who has built sign language recognition, AgriSmart platforms, smart water quality systems, and hospital notification systems. He's an ICT Academy Hackathon finalist! Portfolio: nissanth.vercel.app · Email: psnnovaai@gmail.com";

  if (q.includes('narendra') || q.includes('naren'))
    return "Narendra A is our AI/ML & VR Engineer 🚀 He's collaborating with IIT Madras (ParavrTech) on surgical VR simulations and DICOM probe tracking. Also built Telugu ASR with OpenAI Whisper! Portfolio: narendra-portfolio-six.vercel.app · Email: narendra.a2116@gmail.com";

  if (q.match(/project|built|build|work/))
    return "Our team has built 20+ projects including:\n🏥 VR Surgical Simulation (IIT Madras)\n🌾 AgriSmart ML Platform\n🤟 Sign Language Recognition System\n💧 Smart Water Quality Monitor\n🩺 ECG Cardiac Anomaly Detector\n📰 Fake News Detector\nAnd many more!";

  if (q.match(/skill|tech|stack|tool|language/))
    return "Our team's tech stack: Python 🐍, Power BI, Tableau, SQL, Machine Learning, NLP, Mediapipe, Unity/VR, Computer Vision, OpenAI Whisper, DICOM, IoT, UiPath, Cloud/GenAI & Full-Stack Web Dev!";

  if (q.match(/contact|email|reach|hire|collaborat|internship/))
    return "You can reach us:\n📧 Team: psnnovaai@gmail.com\n📧 Narendra: narendra.a2116@gmail.com\n📧 Sudharsan: sudharsanrv2003@gmail.com\nOr use the Contact form on this page! 📝";

  if (q.match(/college|university|ksrct|school/))
    return "We're from K.S. Rangasamy College of Technology (KSRCT) 🎓 pursuing B.E. in Artificial Intelligence & Machine Learning. Located in Tiruchengode, Tamil Nadu, India.";

  if (q.match(/iit|madras/))
    return "Narendra A is collaborating with IIT Madras through the ParavrTech initiative 🏛️ to build low-cost surgical VR simulation systems using Unity, AprilTag tracking, and DICOM imaging.";

  if (q.match(/award|achieve|certif|hackathon|winner/))
    return "Our achievements include:\n🏆 ICT Academy Hackathon Finalist\n🥇 Volleyball Winner — 31st Annual Sports Day (KSRCT)\n📜 15+ certifications: Oracle OCI AI, AWS GenAI, Tata GenAI Analytics, MATLAB, MongoDB, HackerRank!\n🤝 IIT Madras Collaboration";

  if (q.match(/deploy|vercel|host|live/))
    return "Yes, all portfolios are live! 🌐\n→ sudharsanrv.vercel.app\n→ praveennkumar.vercel.app\n→ nissanth.vercel.app\n→ narendra-portfolio-six.vercel.app";

  return "Great question! 🤔 I can tell you about our 4 team members — Sudharsan, Praveen, Nissanth & Narendra. Ask about their skills, projects, achievements, or how to contact them!";
};

const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm the PSNOVA AI assistant. Ask me anything about our team members, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(genId);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    try {
      // Try backend API first (with short timeout)
      const { data } = await axios.post(
        `${API}/api/chat`,
        { message: msg, sessionId, history: messages.slice(-6) },
        { timeout: 4000 }
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      // Backend unreachable → use built-in client-side fallback immediately
      const fallback = getLocalFallback(msg);
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="ai-chat-toggle"
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI chat"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M12 2C6.48 2 2 6.01 2 11c0 2.59 1.19 4.9 3.07 6.5L4 22l4.74-1.58C9.76 20.79 10.87 21 12 21c5.52 0 10-4.01 10-9S17.52 2 12 2zm1 13H7v-2h6v2zm2-4H7V9h8v2z"/>
          </svg>
        )}
        {!open && <span className="chat-fab-badge">AI</span>}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">🤖</div>
                <div>
                  <div className="chat-title">Team AI Assistant</div>
                  <div className="chat-online">
                    <span className="online-dot" />
                    Always Online
                  </div>
                </div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`chat-bubble ${m.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {m.content}
                </motion.div>
              ))}
              {loading && (
                <div className="chat-bubble assistant">
                  <span className="typing-dots">
                    <span /><span /><span />
                  </span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions — only on first message */}
            {messages.length <= 1 && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="chat-input-row">
              <input
                id="ai-chat-input"
                ref={inputRef}
                className="chat-input"
                type="text"
                placeholder="Ask about the team..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                disabled={loading}
              />
              <button
                id="ai-chat-send"
                className="chat-send-btn"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
