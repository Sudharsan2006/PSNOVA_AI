import { motion } from 'framer-motion';

/**
 * FlipText — eszterbial.com rolling-cylinder letter animation.
 *
 * ENTRY : each letter flips from rotateX(90°) → 0°, staggered.
 * HOVER : CSS-only (no Framer on every char) — GPU composited, zero lag.
 *         Top letter rolls up; bottom copy rolls in from below.
 */
const FlipText = ({
  text,
  className = '',
  style = {},
  entry = true,
  delay = 0,
  stagger = 0.042,
  duration = 0.52,
  tag = 'span',
  onClick,
}) => {
  const Tag = tag;
  const chars = text.split('');

  return (
    <Tag
      className={`flip-text-root ${className}`}
      style={{ display: 'inline-flex', flexWrap: 'nowrap', ...style }}
      onClick={onClick}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="flip-char-wrap"
          style={{ display: 'inline-block', position: 'relative' }}
        >
          {/* Top layer — entry animation via Framer (one-time), then hover via CSS */}
          <motion.span
            className="flip-char flip-char-top"
            initial={entry ? { rotateX: 90, opacity: 0 } : false}
            animate={entry ? { rotateX: 0, opacity: 1 } : undefined}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>

          {/* Bottom layer — pure CSS, position absolute, rolls in on parent hover */}
          <span className="flip-char flip-char-bottom" aria-hidden>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default FlipText;
