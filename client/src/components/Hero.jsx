import { useEffect, useRef } from 'react';
import HeroDoodle, { RotatingBadge } from './HeroDoodle';
import FlipText from './FlipText';

const Hero = () => {
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.10}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="hero">

      {/* Services — top right */}
      <div className="hero-top">
        <div className="hero-services">
          <strong>WE SPECIALISE IN</strong>
          DATA ANALYTICS.<br />
          MACHINE LEARNING.<br />
          COMPUTER VISION.<br />
          IMMERSIVE VR.
        </div>
      </div>

      {/* Geometric asterisk — hover/click for page sparks */}
      <HeroDoodle />

      {/* Rotating circular text badge — bottom right */}
      <div className="hero-rotating-badge">
        <RotatingBadge text="PSNOVA AI • KSRCT • AI / ML ENGINEERS • " size={152} />
      </div>

      {/* ── Main headline: FlipText gives the eszterbial rolling-letter entrance ── */}
      <div className="hero-headline" ref={headlineRef}>

        <div className="hero-line hero-line-1">
          {/* Each FlipText inherits its parent class styles */}
          <span className="h-impact" style={{ display: 'inline-flex' }}>
            <FlipText text="AI / ML" delay={0.1} stagger={0.048} entry />
          </span>
          <span className="h-serif" style={{ display: 'inline-flex', marginLeft: '0.18em' }}>
            <FlipText text="& data" delay={0.38} stagger={0.055} entry />
          </span>
        </div>

        <div className="hero-line hero-line-2">
          <span className="h-impact" style={{ display: 'inline-flex' }}>
            <FlipText text="INNOVATORS" delay={0.58} stagger={0.042} entry />
          </span>
        </div>

      </div>

      {/* Scroll cue */}
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        SCROLL TO EXPLORE
      </div>

    </section>
  );
};

export default Hero;
