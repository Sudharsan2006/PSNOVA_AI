const OpenAI = require('openai');
const ChatLog = require('../models/ChatLog');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Team context injected into every AI session ──────────────────────
const SYSTEM_PROMPT = `You are the AI assistant for "Team AI" — an elite group of 4 engineers 
from K.S. Rangasamy College of Technology (KSRCT), B.E. in Artificial Intelligence & Machine Learning.

=== TEAM MEMBERS ===

1. Sudharsan R V — Data Analyst
   - Skills: Python, Power BI, SQL, Tableau, Machine Learning, Excel
   - Portfolio: https://sudharsanrv.vercel.app
   - Email: sudharsanrv2003@gmail.com
   - LinkedIn: https://www.linkedin.com/in/sudharsan-r-v/

2. Praveen Kumar B — Data Analyst  
   - Skills: Python, SQL, Excel, Power BI, Statistics, Data Visualization
   - Portfolio: https://praveennkumar.vercel.app
   - LinkedIn: https://www.linkedin.com/in/praveennkumar/

3. Nissanth S P — AI/ML Engineer
   - Skills: Python, Machine Learning, NLP, Mediapipe, IoT, Full-Stack Web Dev, UiPath, Cloud/GenAI
   - Projects: Library Management, Fake News Detector, Sign Language System, Smart Water Quality, AgriSmart Platform, Smart Home Automation, Hospital Notification System, Secure Cloud Storage
   - Certifications: OCI AI Foundations (Oracle 2025), Tata GenAI Data Analytics, AWS Generative AI, MATLAB, MongoDB, HackerRank Python
   - Achievements: ICT Academy Hackathon Finalist, Volleyball Winner (31st Annual Sports Day)
   - Portfolio: https://nissanth.vercel.app
   - Email: nissanth2k6@gmail.com
   - LinkedIn: https://www.linkedin.com/in/nissanth-s-p-041b94289/

4. Narendra A — AI/ML Engineer & VR Developer
   - Skills: Unity/VR, Computer Vision, OpenAI Whisper, Python, DICOM, AprilTag tracking
   - Projects: VR Surgical Simulation (HOPS hospital), IIT Madras collaboration (ProbeTrack AR), ECG cardiac anomaly detection, Telugu ASR (Whisper), CV gesture system, Farmer Telegram bot
   - Achievements: IIT Madras ParavrTech collaboration, 7.8 CGPA, Hackathon Finalist
   - Portfolio: https://narendra-portfolio-six.vercel.app
   - Email: narendra.a2116@gmail.com
   - LinkedIn: https://www.linkedin.com/in/narendra-anbazhagan
   - Phone: +91 81900 95181

=== INSTRUCTIONS ===
- Answer only questions about the team members, their skills, projects, achievements, and contact info.
- Be friendly, enthusiastic, and concise (2-4 sentences max per response).
- If asked about something unrelated, politely redirect to team topics.
- Use emojis sparingly for friendliness. 🚀
- Never make up information not listed above.`;

/**
 * @desc   Chat with Team AI assistant (OpenAI GPT)
 * @route  POST /api/chat
 * @access Public
 */
const chatWithAI = async (req, res) => {
  try {
    const { message, sessionId, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const trimmedMsg = message.trim().slice(0, 500); // cap input

    // Build message array for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      // include last 6 turns of history for context
      ...history.slice(-6).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: trimmedMsg },
    ];

    // If no valid API key, use fallback rule-based responses
    const apiKey = process.env.OPENAI_API_KEY || '';
    const hasValidKey = apiKey.startsWith('sk-') && !apiKey.startsWith('sk-REPLACE') && apiKey.length > 20;
    if (!hasValidKey) {
      const fallback = getFallbackResponse(trimmedMsg);
      return res.status(200).json({ success: true, reply: fallback, source: 'fallback' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'I could not generate a response.';

    // Log conversation to DB (non-blocking)
    if (sessionId) {
      ChatLog.findOneAndUpdate(
        { sessionId },
        {
          $push: {
            messages: [
              { role: 'user', content: trimmedMsg },
              { role: 'assistant', content: reply },
            ],
          },
          $setOnInsert: {
            sessionId,
            userAgent: req.headers['user-agent'] || '',
            ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
          },
        },
        { upsert: true, new: true }
      ).catch(console.error);
    }

    return res.status(200).json({ success: true, reply, source: 'openai' });
  } catch (err) {
    console.error('Chat AI error:', err);

    // Graceful fallback if OpenAI fails
    const fallback = getFallbackResponse(req.body?.message || '');
    return res.status(200).json({ success: true, reply: fallback, source: 'fallback' });
  }
};

// ── Simple rule-based fallback (no API key needed) ────────────────────
const getFallbackResponse = (msg) => {
  const lower = msg.toLowerCase();

  if (lower.includes('nissanth'))
    return "Nissanth S P is our AI/ML Engineer! 🤖 He builds sign language systems, smart water quality detectors, and AgriSmart platforms. Reach him at nissanth2k6@gmail.com";
  if (lower.includes('narendra') || lower.includes('naren'))
    return "Narendra A is our VR & AI specialist! 🚀 He's collaborating with IIT Madras on surgical VR simulations and speech recognition systems. Find him at narendra.a2116@gmail.com";
  if (lower.includes('praveen'))
    return "Praveen Kumar B is a Data Analyst skilled in Python, SQL, Power BI and statistics. Check out his portfolio at praveennkumar.vercel.app 📊";
  if (lower.includes('sudharsan'))
    return "Sudharsan R V is a Data Analyst who transforms complex datasets into stunning visual stories using Power BI, Tableau and Python. Visit sudharsanrv.vercel.app 📈";
  if (lower.includes('skill') || lower.includes('tech'))
    return "Our team covers Python, SQL, Power BI, Machine Learning, NLP, Unity/VR, OpenAI Whisper, IoT, and Cloud/GenAI technologies! 💡";
  if (lower.includes('project'))
    return "We've built 20+ projects including VR surgery simulations (IIT Madras), sign language systems, AgriSmart platforms, fake news detectors, and ECG anomaly detectors! 🏗️";
  if (lower.includes('contact') || lower.includes('email'))
    return "You can reach us through the Contact form on this page, or email Nissanth (nissanth2k6@gmail.com) or Narendra (narendra.a2116@gmail.com) directly! 📧";
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return "Hey there! 👋 I'm the Team AI assistant. Ask me about our team members, their skills, projects, or how to get in touch!";

  return "Great question! 🤔 I can tell you about our team members Sudharsan, Praveen, Nissanth, and Narendra — their skills, projects, and contact info. What would you like to know?";
};

module.exports = { chatWithAI };
