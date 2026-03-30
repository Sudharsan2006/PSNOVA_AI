import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipText from './FlipText';

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuKey, setMenuKey] = useState(0); // force FlipText remount on each open

  /* Custom cursor */
  useEffect(() => {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const move = (e) => {
      if (dot)  { dot.style.left  = e.clientX + 'px'; dot.style.top  = e.clientY + 'px'; }
      if (ring) { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const handleOpen = () => { setMenuKey(k => k + 1); setOpen(true); };

  const nav = [
    { label: 'HOME',     action: () => { scrollTo('hero');     setOpen(false); } },
    { label: 'TEAM',     action: () => { scrollTo('team');     setOpen(false); } },
    { label: 'ABOUT',    action: () => { scrollTo('about');    setOpen(false); } },
    { label: 'PROJECTS', action: () => { scrollTo('projects'); setOpen(false); } },
    { label: 'CONTACT',  action: () => { scrollTo('contact');  setOpen(false); } },
  ];

  const overlay = {
    hidden:  { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 35 } },
    exit:    { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
  };

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      <nav className="navbar" id="navbar">
        <div className="nav-wordmark">
          TEAM<br />PSNOVA<br />AI
        </div>
        <button className="menu-btn" onClick={handleOpen} aria-label="Open menu">
          MENU
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 989, background: 'rgba(0,0,0,0.25)', cursor: 'none' }}
            />

            {/* Menu panel */}
            <motion.div
              key="panel"
              className="menu-overlay"
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className="menu-close" onClick={() => setOpen(false)}>×</button>

              <nav className="menu-nav-links">
                {nav.map(({ label, action }, i) => (
                  <motion.div
                    key={`${menuKey}-${label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.07 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {/* FlipText replays entry animation each time menu opens */}
                    <FlipText
                      key={`ft-${menuKey}-${label}`}
                      text={label}
                      className="menu-nav-link"
                      tag="button"
                      entry
                      delay={0.06 + i * 0.08}
                      stagger={0.04}
                      duration={0.45}
                      onClick={action}
                    />
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="menu-social"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
              >
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
                <a href="https://github.com"   target="_blank" rel="noreferrer">GITHUB ↗</a>
                <a href="mailto:psnnovaai@gmail.com">EMAIL ↗</a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
