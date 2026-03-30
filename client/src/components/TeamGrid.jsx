import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery';

// ── PSNNOVA AI team gallery items ─────────────────────────────────
// Each card: photo + "Name · Role" label
const GALLERY_ITEMS = [
  {
    image: '/images/sudharsan.jpg',
    text: 'SUDHARSAN R V · Data Analyst',
  },
  {
    image: '/images/praveenkumar.jpeg',
    text: 'PRAVEEN KUMAR · Data Analyst',
  },
  {
    image: '/images/nissanth.jpeg',
    text: 'NISSANTH S P · AI/ML Engineer',
  },
  {
    image: '/images/naren.jpeg',
    text: 'NARENDRA A · AI/ML & VR Engineer',
  },
];

const TeamGrid = () => {
  return (
    <section className="section team-section" id="team">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Team</span>
          <h2 className="section-title">The Brilliant Minds</h2>
          <p className="section-sub">
            Four driven engineers from KSRCT blending data science, machine learning,
            and creative problem-solving to build tomorrow's technology — today.
          </p>
        </motion.div>
      </div>

      {/* ── CircularGallery — full width, cinematic auto-scroll ── */}
      <motion.div
        className="gallery-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          autoPlay
          autoPlayInterval={3200}
          font="bold 28px 'Outfit', sans-serif"
        />
      </motion.div>

      <p className="gallery-hint">Drag or scroll to explore · Auto-advances every few seconds</p>
    </section>
  );
};

export default TeamGrid;
