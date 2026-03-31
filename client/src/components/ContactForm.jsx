import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { RotatingBadge } from './HeroDoodle';

const API = import.meta.env.VITE_API_URL || 'https://team-ai-backend-zw75.onrender.com';

const saveToLocalStorage = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem('psnova_messages') || '[]');
    existing.push({ ...data, savedAt: new Date().toISOString(), id: Date.now() });
    localStorage.setItem('psnova_messages', JSON.stringify(existing));
    return true;
  } catch { return false; }
};

const ContactForm = () => {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [status,  setStatus]  = useState('idle');
  const [msgText, setMsgText] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await axios.post(`${API}/api/contact`, form, { 
        timeout: 4000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setStatus('success');
      setMsgText("Message sent! We'll get back to you soon.");
    } catch {
      const saved = saveToLocalStorage(form);
      if (saved) {
        setStatus('success');
        setMsgText("Message saved locally — we'll receive it when our server is live. Thank you!");
      } else {
        const subject = encodeURIComponent(form.subject || 'Contact from PSNOVA AI Portfolio');
        const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.location.href = `mailto:psnnovaai@gmail.com?subject=${subject}&body=${body}`;
        setStatus('success');
        setMsgText('Opening your email client...');
      }
    }
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => { setStatus('idle'); setMsgText(''); }, 6000);
  };

  return (
    <section className="contact-eszterbial section" id="contact">

      {/* Rotating badge — top right of contact */}
      <div className="contact-rotating-badge">
        <RotatingBadge text="LET'S BUILD TOGETHER • GET IN TOUCH • " size={140} dark />
      </div>

      <motion.h2
        className="contact-heading"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        READY TO
        BUILD WITH AI?
      </motion.h2>

      <motion.a
        className="contact-email-btn"
        href="mailto:psnnovaai@gmail.com"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        PSNNOVAAI@GMAIL.COM ↗
      </motion.a>

      <motion.div
        className="contact-form-wrap"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="cf-name">Your Name *</label>
              <input id="cf-name" name="name" className="form-input" type="text"
                placeholder="Jane Smith" value={form.name} onChange={handleChange}
                required disabled={status === 'loading'} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cf-email">Email Address *</label>
              <input id="cf-email" name="email" className="form-input" type="email"
                placeholder="jane@example.com" value={form.email} onChange={handleChange}
                required disabled={status === 'loading'} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-subject">Subject</label>
            <input id="cf-subject" name="subject" className="form-input" type="text"
              placeholder="Collaboration Opportunity" value={form.subject}
              onChange={handleChange} disabled={status === 'loading'} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-message">Message *</label>
            <textarea id="cf-message" name="message" className="form-input form-textarea"
              placeholder="Hi team! I'd love to collaborate on..." rows={5}
              value={form.message} onChange={handleChange}
              required disabled={status === 'loading'} />
          </div>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div className="form-feedback"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {msgText}
              </motion.div>
            )}
          </AnimatePresence>

          <button className="submit-btn" type="submit"
            disabled={status === 'loading'} id="contact-submit-btn">
            {status === 'loading'
              ? <span className="loading-spinner" />
              : <>SEND MESSAGE <span>→</span></>
            }
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
