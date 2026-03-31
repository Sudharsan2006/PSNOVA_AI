import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MarqueeSection from '../components/MarqueeSection';
import TeamSlideshow from '../components/TeamSlideshow';
import Projects from '../components/Projects';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';
import SharedSVGFilters from '../components/SharedSVGFilters';
import PageSparkle from '../components/PageSparkle';

const API = 'https://team-ai-backend-zw75.onrender.com';

const Home = () => {
  const [stats, setStats] = useState(null);
  const contactRef = useRef(null);

  /* ── Stats fetch ── */
  useEffect(() => {
    axios.get(`${API}/api/stats`, { timeout: 3000 })
      .then(({ data }) => setStats(data.data))
      .catch(() => {});
  }, []);

  /* ── Scroll-triggered dark mode when contact section enters viewport ──
     Matches eszterbial's smooth full-page bg flip when user scrolls to contact.
     We toggle class on <body> and transition via CSS.                        */
  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add('dark-contact');
        } else {
          document.body.classList.remove('dark-contact');
        }
      },
      { threshold: 0.15 }   // trigger when 15% of contact is visible
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.classList.remove('dark-contact');
    };
  }, []);

  return (
    <>
      {/* SVG filters for ReflectiveCard */}
      <SharedSVGFilters displacementStrength={20} noiseScale={1} specularConstant={5} glassDistortion={30} />

      {/* Global page-wide sparkle portal (renders over everything) */}
      <PageSparkle />

      <Navbar />

      <main className="page">
        <Hero stats={stats} />
        <MarqueeSection />
        <TeamSlideshow />
        <Projects />
        <AboutSection />

        {/* Contact wrapped in ref for IntersectionObserver */}
        <div ref={contactRef}>
          <ContactForm />
        </div>
      </main>

      <Footer />
      <AIChat />
    </>
  );
};

export default Home;
