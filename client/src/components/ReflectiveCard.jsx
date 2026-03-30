import './ReflectiveCard.css';

/**
 * ReflectiveCard — uses the EXACT original react-bits code.
 * Webcam video is the background, processed with SVG metallic-displacement filter.
 * The SVG filter (id="metallic-displacement") is rendered ONCE via SharedSVGFilters
 * in the parent page — this matches the original single-filter approach exactly.
 */
const ReflectiveCard = ({
  member,
  overlayColor = 'rgba(0, 0, 0, 0.2)',
  blurStrength = 12,
  metalness = 1,
  roughness = 0.75,
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 5,
  grayscale = 0.15,
  glassDistortion = 30,
  className = '',
  style = {},
}) => {
  // No webcam — purely static gradient card (better performance, no camera permission)


  // Exact same variable calculations as the original
  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  // CSS variables injected — exactly as original
  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': '#ffffff',
    '--saturation': saturation,
    '--card-accent': member.accent,
  };

  const idMap = { 1: '8901-2345', 2: '2345-6789', 3: '6789-0123', 4: '0123-4567' };

  return (
    <div
      className={`reflective-card-container ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      {/* Static gradient background — no webcam needed */}
      <div
        className="reflective-fallback"
        style={{
          background: `linear-gradient(135deg,
            color-mix(in srgb, ${member.accent} 28%, #080612) 0%,
            #0a0818 50%,
            color-mix(in srgb, ${member.accent} 12%, #050410) 100%)`,
        }}
      />

      {/* ── Texture layers — EXACT original ─────────────────── */}
      <div className="reflective-noise" />
      <div className="reflective-sheen" />
      <div className="reflective-border" />
      <div className="reflective-accent-bar" />

      {/* ── Content — mirrors original structure ─────────────── */}
      <div className="reflective-content">

        {/* Header — matches original card-header exactly */}
        <div className="card-header">
          <div className="security-badge">
            {/* Lock icon (inline SVG = no lucide dependency needed) */}
            <svg className="security-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>KSRCT · AI&amp;ML</span>
          </div>
          {/* Activity icon */}
          <svg className="status-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>

        {/* Body */}
        <div className="card-body">
          <img
            src={member.photo}
            alt={member.name}
            className="member-avatar"
          />
          <div className="user-info">
            <h2 className="user-name">{member.name.toUpperCase()}</h2>
            <p className="user-role">{member.role.toUpperCase()}</p>
          </div>
          <div className="card-skills">
            {member.skills.slice(0, 4).map((s) => (
              <span key={s} className="skill-pill">{s}</span>
            ))}
            {member.skills.length > 4 && (
              <span className="skill-pill">+{member.skills.length - 4}</span>
            )}
          </div>
        </div>

        {/* Footer — matches original card-footer exactly */}
        <div className="card-footer">
          <div className="id-section">
            <span className="label">ID NUMBER</span>
            <span className="value">{idMap[member.id]}-AI26</span>
          </div>
          <div className="card-links">
            {/* LinkedIn */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="card-icon-link"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Portfolio */}
            <a
              href={member.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="card-icon-link"
              title="Portfolio"
              aria-label="Portfolio"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            {/* Fingerprint — exact original */}
            <div className="fingerprint-section">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
                <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
                <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
                <path d="M2 12a10 10 0 0 1 18-6"/>
                <path d="M2 17h2a10 10 0 0 0 18-5"/>
                <path d="M7 19.4A10 10 0 0 1 2 20"/>
                <path d="M7 19.4c-1.236-2.583-1.518-5.57-1-8.4"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReflectiveCard;
