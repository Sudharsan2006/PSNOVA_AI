const ITEMS = [
  'PSNOVA AI',
  'DATA ANALYTICS',
  'MACHINE LEARNING',
  'COMPUTER VISION',
  'IMMERSIVE VR',
  'KSRCT',
  'AI / ML ENGINEERS',
];

const MarqueeSection = () => {
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
