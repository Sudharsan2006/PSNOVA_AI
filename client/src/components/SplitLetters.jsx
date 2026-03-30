import { motion } from 'framer-motion';

/**
 * SplitLetters — 3D rotateX per-character entrance.
 * Like eszterbial.com's staggered letter-flip animation.
 *
 * IMPORTANT: Wrap this inside a styled parent <span> or <div>
 * to apply font/size styles — the inner spans inherit from parent.
 */
const SplitLetters = ({
  text,
  delay    = 0,
  stagger  = 0.04,
  duration = 0.6,
}) => {
  return (
    <span style={{ display: 'inline', perspective: '900px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{
            display:         'inline-block',
            transformOrigin: 'bottom center',
          }}
          initial={{ rotateX: 90, opacity: 0, y: 18 }}
          animate={{ rotateX: 0,  opacity: 1, y: 0  }}
          transition={{
            duration,
            delay:    delay + i * stagger,
            ease:     [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitLetters;
