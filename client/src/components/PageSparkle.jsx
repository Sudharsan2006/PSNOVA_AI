import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Global event bus for triggering page sparks ── */
const listeners = new Set();
export const triggerPageSparks = (x, y) => listeners.forEach(fn => fn(x, y));

const COLORS = ['#6c63ff', '#e17055', '#fdcb6e', '#00b894', '#fd79a8', '#ffffff', '#74b9ff'];

const PageSparkle = () => {
  const [particles, setParticles] = useState([]);

  const addBurst = useCallback((cx, cy) => {
    const count = 28 + Math.floor(Math.random() * 16);
    const newPs = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const speed = 80 + Math.random() * 220;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        id: `${Date.now()}-${i}`,
        x:  (cx ?? Math.random() * window.innerWidth),
        y:  (cy ?? Math.random() * window.innerHeight),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 9,
        color,
        dur: 0.6 + Math.random() * 0.7,
        shape: Math.random() > 0.5 ? 'circle' : 'star',
      };
    });
    setParticles(p => [...p, ...newPs]);
    setTimeout(() => {
      setParticles(p => p.filter(pt => !newPs.find(n => n.id === pt.id)));
    }, 1500);
  }, []);

  useEffect(() => {
    listeners.add(addBurst);
    return () => listeners.delete(addBurst);
  }, [addBurst]);

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999, overflow: 'hidden' }}>
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.shape === 'star' ? p.size : p.size,
              borderRadius: p.shape === 'star' ? '2px' : '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}66`,
              transformOrigin: 'center',
            }}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale:   [1, 1.3, 0],
              x: p.dx,
              y: p.dy,
              rotate: Math.random() > 0.5 ? 360 : -360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.dur, ease: [0.2, 0.8, 0.6, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default PageSparkle;
