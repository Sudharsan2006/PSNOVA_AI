import { motion } from 'framer-motion';

const STATS = [
  { num: '1K+',  label: 'Portfolio Visits',  desc: 'Combined portfolio views across all four team members on Vercel.' },
  { num: '20+',  label: 'Projects Built',     desc: 'From crop-yield ML models to VR surgical simulators and NLP systems.' },
  { num: '15+',  label: 'Certifications',     desc: 'AWS, Google, NPTEL, and ICT Academy certifications across AI, cloud & automation.' },
  { num: '4',    label: 'Engineers',          desc: 'Sudharsan · Praveen · Nissanth · Narendra — one vision, four disciplines.' },
  { num: '96%',  label: 'Model Accuracy',     desc: 'Top accuracy achieved on the Glaucoma Detection CNN — tested on 3,000+ retinal images.' },
  { num: '500+', label: 'Students Served',    desc: 'Smart Attendance system deployed and actively used across KSRCT classrooms.' },
];

const AboutSection = () => (
  <section className="about-eszterbial section" id="about">
    <motion.span
      className="about-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      WHO WE ARE
    </motion.span>

    <motion.h2
      className="about-statement"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      WE ARE PSNOVA AI.
      FOUR ENGINEERS FROM KSRCT —
      UNITED BY CURIOSITY AND A
      RELENTLESS DRIVE TO
      BUILD AI.
    </motion.h2>

    <div className="about-grid">
      {STATS.map(({ num, label, desc }, i) => (
        <motion.div
          key={label}
          className="about-grid-cell"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-grid-number">{num}</div>
          <span className="about-grid-label">{label}</span>
          <p className="about-grid-desc">{desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default AboutSection;
