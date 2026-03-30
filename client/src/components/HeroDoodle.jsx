import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { triggerPageSparks } from './PageSparkle';

/* ══════════════════════════════════════════════════════
   Rotating circular SVG text badge — like eszterbial
   ══════════════════════════════════════════════════════ */
export const RotatingBadge = ({ text = 'PSNOVA AI • AI / ML ENGINEERS • KSRCT •', size = 140, dark = false, onClick }) => {
  const r = (size / 2) - 14;
  return (
    <div
      className={`rotating-badge ${dark ? 'rotating-badge--dark' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path
            id={`badge-path-${size}-${dark ? 'd' : 'l'}`}
            d={`M ${size/2},${size/2} m -${r},0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0`}
          />
        </defs>
        <text style={{
          fontSize: 10,
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.22em',
          fill: dark ? '#f0ede7' : '#0a0908',
          textTransform: 'uppercase',
        }}>
          <textPath href={`#badge-path-${size}-${dark ? 'd' : 'l'}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      {/* Centre star icon */}
      <div className="rotating-badge-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L13.8 8.6L20 7L15.2 12L20 17L13.8 15.4L12 22L10.2 15.4L4 17L8.8 12L4 7L10.2 8.6Z"
            fill={dark ? '#f0ede7' : '#0a0908'}
          />
        </svg>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   Geometric 8-arm asterisk doodle with:
   - Slow continuous auto-spin
   - Mouse follow parallax
   - Click → page-wide sparkle burst
   - Periodic auto-sparks while spinning
   ══════════════════════════════════════════════════════ */
const HeroDoodle = () => {
  const ref       = useRef(null);
  const angleRef  = useRef(0);
  const frameRef  = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [clicked, setClicked] = useState(false);

  /* Continuous slow spin */
  useEffect(() => {
    const tick = () => {
      angleRef.current += 0.22;
      setRotation(angleRef.current);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  /* Mouse follow parallax */
  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      setMx((e.clientX - cx) * 0.07);
      setMy((e.clientY - cy) * 0.07);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Hover sparkle — fires small burst when mouse enters the doodle */
  const handleHover = useCallback(() => {
    triggerPageSparks(
      (ref.current?.getBoundingClientRect().left ?? 0) + 140,
      (ref.current?.getBoundingClientRect().top  ?? 0) + 140,
    );
  }, []);

  const handleClick = useCallback((e) => {
    /* Big burst from click position */
    const count = 8;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        triggerPageSparks(
          e.clientX + (Math.random() - 0.5) * 120,
          e.clientY + (Math.random() - 0.5) * 120,
        );
      }, i * 60);
    }
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
  }, []);

  const arms = Array.from({ length: 8 });

  return (
    <motion.div
      ref={ref}
      className="hero-doodle"
      style={{ x: mx, y: my, cursor: 'crosshair' }}
      whileHover={{ scale: 1.08 }}
      animate={clicked ? { scale: [1, 1.25, 0.95, 1] } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      <svg
        width="280" height="280" viewBox="0 0 280 280"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Outer decorative rings */}
        <circle cx="140" cy="140" r="132" stroke="rgba(10,9,8,0.08)"  strokeWidth="1"   fill="none" strokeDasharray="4 6" />
        <circle cx="140" cy="140" r="118" stroke="rgba(10,9,8,0.05)"  strokeWidth="0.8" fill="none" />

        {/* 8 arms */}
        {arms.map((_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return (
            <line key={i}
              x1={140 + 18 * Math.cos(a)} y1={140 + 18 * Math.sin(a)}
              x2={140 + 118 * Math.cos(a)} y2={140 + 118 * Math.sin(a)}
              stroke="rgba(10,9,8,0.28)" strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}

        {/* Diamond tips */}
        {arms.map((_, i) => {
          const a   = (i * 45) * Math.PI / 180;
          const tx  = 140 + 118 * Math.cos(a);
          const ty  = 140 + 118 * Math.sin(a);
          const rot = i * 45;
          return (
            <polygon key={i}
              points={`0,-7 5,0 0,7 -5,0`}
              fill="rgba(10,9,8,0.5)"
              transform={`translate(${tx},${ty}) rotate(${rot})`}
            />
          );
        })}

        {/* Mid-arm accent dots */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg, i) => {
          const a = deg * Math.PI / 180;
          return (
            <circle key={i}
              cx={140 + 78 * Math.cos(a)} cy={140 + 78 * Math.sin(a)}
              r="3" fill="rgba(10,9,8,0.22)"
            />
          );
        })}

        {/* Centre */}
        <circle cx="140" cy="140" r="12" fill="rgba(10,9,8,0.10)" />
        <circle cx="140" cy="140" r="5"  fill="rgba(10,9,8,0.55)" />
        <circle cx="140" cy="140" r="2"  fill="rgba(10,9,8,0.90)" />
      </svg>
    </motion.div>
  );
};

export default HeroDoodle;
