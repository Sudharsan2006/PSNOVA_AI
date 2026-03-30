import { motion } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    img: '/images/project_crop.png',
    title: 'CROP YIELD PREDICTION',
    tag: 'Machine Learning · Python · Random Forest',
    color: '#3a7d44',
  },
  {
    id: 2,
    img: '/images/project_vr.png',
    title: 'SURGICAL VR SIMULATION',
    tag: 'Unity · VR · IIT Madras Collaboration',
    color: '#2d6a8f',
  },
  {
    id: 3,
    img: '/images/project_glaucoma.png',
    title: 'GLAUCOMA DETECTION',
    tag: 'Computer Vision · Deep Learning · DICOM',
    color: '#1a3a5c',
  },
  {
    id: 4,
    img: '/images/project_attendance.png',
    title: 'SMART ATTENDANCE',
    tag: 'Face Recognition · OpenCV · Flask',
    color: '#5a3a1a',
  },
];

const Projects = () => (
  <section className="projects-section section" id="projects">
    <div className="projects-header">
      <span className="section-eyebrow">selected</span>
      <span className="section-h-impact">PROJECTS</span>
      <p className="section-desc">
        Real-world AI systems built from research to deployment — solving problems in agriculture,
        medicine, education and beyond.
      </p>
    </div>

    <div className="projects-grid">
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.id}
          className="project-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Real image */}
          <div
            className="project-card-bg"
            style={{
              backgroundImage: `url(${p.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Gradient overlay for text legibility */}
          <div className="project-card-overlay">
            <span className="project-card-tag">{p.tag}</span>
            <span className="project-card-title">{p.title}</span>
          </div>
          {/* Subtle color accent on hover border */}
          <div className="project-card-border" style={{ '--p-color': p.color }} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
