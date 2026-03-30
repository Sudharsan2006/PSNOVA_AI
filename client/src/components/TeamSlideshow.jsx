import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReflectiveCard from './ReflectiveCard';

const MEMBERS = [
  {
    id: 1, name: 'Sudharsan R V', role: 'Data Analyst', accent: '#6c63ff',
    photo: '/images/sudharsan.jpg',
    skills: ['Python', 'Power BI', 'SQL', 'Tableau', 'Data Viz'],
    linkedin: 'https://linkedin.com', portfolioUrl: 'https://sudharsanrv.vercel.app',
  },
  {
    id: 2, name: 'Praveen Kumar B', role: 'Data Analyst', accent: '#00b894',
    photo: '/images/praveenkumar.jpeg',
    skills: ['Python', 'SQL', 'Excel', 'Statistics', 'Power BI'],
    linkedin: 'https://linkedin.com', portfolioUrl: 'https://praveennkumar.vercel.app',
  },
  {
    id: 3, name: 'Nissanth S P', role: 'AI / ML Engineer', accent: '#e17055',
    photo: '/images/nissanth.jpeg',
    skills: ['ML', 'NLP', 'Mediapipe', 'IoT', 'UiPath'],
    linkedin: 'https://linkedin.com/in/nissanth-s-p-041b94289/', portfolioUrl: 'https://nissanth.vercel.app',
  },
  {
    id: 4, name: 'Narendra A', role: 'AI/ML & VR Engineer', accent: '#6c5ce7',
    photo: '/images/naren.jpeg',
    skills: ['Unity / VR', 'Computer Vision', 'OpenAI Whisper', 'DICOM', 'Python'],
    linkedin: 'https://linkedin.com', portfolioUrl: 'https://narendra-portfolio-six.vercel.app',
  },
];

const HOLD_MS = 5500;

/* ── Sparkle particle that streaks across on card entry ── */
const STREAK_COUNT = 18;
const BURST_COUNT  = 12;
const COMET_COUNT  = 8;

/* ── Enhanced multi-layer sparkle system ── */
const SparkleLayer = ({ trigger, color }) => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    /* 1. Wide horizontal streaks (long glowing lines) */
    const streaks = Array.from({ length: STREAK_COUNT }, (_, i) => ({
      id: `str-${trigger}-${i}`, type: 'streak',
      top:   5 + Math.random() * 90,
      delay: Math.random() * 0.5,
      dur:   0.35 + Math.random() * 0.4,
      h:     1.5 + Math.random() * 3,
      w:     60  + Math.random() * 160,
    }));

    /* 2. Bright star-burst dots that flash and fade */
    const bursts = Array.from({ length: BURST_COUNT }, (_, i) => ({
      id: `bst-${trigger}-${i}`, type: 'burst',
      top:   Math.random() * 100,
      left:  20 + Math.random() * 60,
      delay: Math.random() * 0.6,
      dur:   0.25 + Math.random() * 0.3,
      size:  4 + Math.random() * 10,
    }));

    /* 3. Thin fast comets (short, quick) */
    const comets = Array.from({ length: COMET_COUNT }, (_, i) => ({
      id: `cmt-${trigger}-${i}`, type: 'comet',
      top:   10 + Math.random() * 80,
      delay: 0.05 + Math.random() * 0.3,
      dur:   0.2 + Math.random() * 0.25,
      h:     1,
      w:     20 + Math.random() * 40,
      angle: -15 + Math.random() * 30,   // slight diagonal
    }));

    setSparks([...streaks, ...bursts, ...comets]);
    const t = setTimeout(() => setSparks([]), 1100);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', overflow: 'hidden', zIndex: 20,
    }}>
      {sparks.map((s) => {
        /* Streak */
        if (s.type === 'streak') return (
          <motion.div key={s.id} style={{
            position: 'absolute',
            top: `${s.top}%`, left: '-5%',
            width: s.w, height: s.h,
            borderRadius: 100,
            background: `linear-gradient(to right, transparent 0%, ${color} 40%, #ffffff 60%, ${color} 80%, transparent 100%)`,
            boxShadow: `0 0 8px 2px ${color}88`,
            opacity: 0,
            transform: 'scaleX(0)',
          }}
          animate={{ x: ['0%', '130vw'], opacity: [0, 0.9, 0.9, 0], scaleX: [0, 1, 1, 0.6] }}
          transition={{ duration: s.dur, delay: s.delay, ease: [0.2, 0.8, 0.6, 1] }}
          />
        );

        /* Burst dot */
        if (s.type === 'burst') return (
          <motion.div key={s.id} style={{
            position: 'absolute',
            top: `${s.top}%`, left: `${s.left}%`,
            width: s.size, height: s.size,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px ${color}, 0 0 ${s.size * 4}px ${s.size * 2}px ${color}55`,
            opacity: 0,
          }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.4, 1, 0] }}
          transition={{ duration: s.dur, delay: s.delay, ease: 'easeOut' }}
          />
        );

        /* Comet */
        if (s.type === 'comet') return (
          <motion.div key={s.id} style={{
            position: 'absolute',
            top: `${s.top}%`, left: '-3%',
            width: s.w, height: s.h,
            borderRadius: 100,
            background: `linear-gradient(to right, transparent, ${color}cc, #fff)`,
            rotate: s.angle,
            opacity: 0,
          }}
          animate={{ x: ['0%', '110vw'], opacity: [0, 1, 0] }}
          transition={{ duration: s.dur, delay: s.delay, ease: 'easeIn' }}
          />
        );

        return null;
      })}
    </div>
  );
};

const TeamSlideshow = () => {
  const [index,    setIndex]    = useState(0);
  const [dir,      setDir]      = useState(1);
  const [progress, setProgress] = useState(0);
  const [sparkKey, setSparkKey] = useState(0);   // increment to retrigger sparks
  const timerRef = useRef(null);
  const rafRef   = useRef(null);
  const t0Ref    = useRef(null);

  const advance = useCallback((step) => {
    setDir(step);
    setIndex(i => (i + step + MEMBERS.length) % MEMBERS.length);
    setProgress(0);
    setSparkKey(k => k + 1);
  }, []);

  const goTo = useCallback((i) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
    setProgress(0);
    setSparkKey(k => k + 1);
  }, [index]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    t0Ref.current = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - t0Ref.current) / HOLD_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current   = requestAnimationFrame(tick);
    timerRef.current = setTimeout(() => advance(1), HOLD_MS);
    return () => { clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [index, advance]);

  const variants = {
    enter: (d) => ({
      x: d > 0 ? '-100vw' : '100vw',
      scale: 0.82,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: [0.82, 1.06, 1.0],
      opacity: 1,
      transition: {
        x:       { type: 'spring', stiffness: 45, damping: 19 },
        scale:   { duration: 1.1, times: [0, 0.62, 1], ease: 'easeOut' },
        opacity: { duration: 0.5 },
      },
    },
    exit: (d) => ({
      x: d > 0 ? '100vw' : '-100vw',
      scale: 0.82,
      opacity: 0,
      transition: {
        x:       { type: 'spring', stiffness: 45, damping: 19 },
        scale:   { duration: 0.5 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const member = MEMBERS[index];

  return (
    <section className="slideshow-section section" id="team">

      {/* Header */}
      <div className="slideshow-header">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">selected</span>
          <span className="section-h-impact">ENGINEERS</span>
          <p className="section-desc">
            Four specialists from <strong>K.S. Rangasamy College of Technology</strong> —
            Data Analytics, ML, Computer Vision &amp; VR.
            Cards auto-advance · use arrows or dots to navigate.
          </p>
        </motion.div>
      </div>

      {/* Stage — sparkle layer lives here */}
      <div className="slideshow-stage">
        {/* Sparkle streak lines */}
        <SparkleLayer trigger={sparkKey} color={member.accent} />

        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={member.id}
            className="slide-motion"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="slide-card-wrap">
              <ReflectiveCard member={member} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="slide-progress-track">
        <div
          className="slide-progress-fill"
          style={{ width: `${progress}%`, background: member.accent }}
        />
      </div>

      {/* Controls */}
      <div className="slideshow-controls">
        <button className="slide-btn" onClick={() => advance(-1)}>‹</button>
        <div className="slide-dots">
          {MEMBERS.map((m, i) => (
            <button
              key={m.id}
              className={`slide-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              style={i === index
                ? { background: member.accent, borderColor: member.accent, width: 24, borderRadius: 3 }
                : {}}
            />
          ))}
        </div>
        <button className="slide-btn" onClick={() => advance(1)}>›</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={member.id}
          className="slide-member-label"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {member.name} · {member.role}
        </motion.p>
      </AnimatePresence>
    </section>
  );
};

export default TeamSlideshow;
