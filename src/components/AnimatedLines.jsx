import './AnimatedLines.css';

export default function AnimatedLines() {
  return (
    <div className="animated-lines" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="var(--accent-cyan)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="lineGradV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="var(--accent-purple)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="lineGradD" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="lineBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Horizontal lines */}
        <line className="anim-line anim-line--1" x1="0" y1="200" x2="1440" y2="200" stroke="url(#lineGradH)" strokeWidth="1" />
        <line className="anim-line anim-line--2" x1="0" y1="450" x2="1440" y2="450" stroke="url(#lineGradH)" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />
        <line className="anim-line anim-line--3" x1="0" y1="700" x2="1440" y2="700" stroke="url(#lineGradH)" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />

        {/* Vertical lines */}
        <line className="anim-line anim-line--4" x1="360" y1="0" x2="360" y2="900" stroke="url(#lineGradV)" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />
        <line className="anim-line anim-line--5" x1="1080" y1="0" x2="1080" y2="900" stroke="url(#lineGradV)" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />

        {/* Diagonal accent lines */}
        <line className="anim-line anim-line--6" x1="0" y1="900" x2="500" y2="0" stroke="url(#lineGradD)" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />
        <line className="anim-line anim-line--6" x1="940" y1="900" x2="1440" y2="200" stroke="url(#lineGradD)" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" style={{ animationDelay: '2.6s' }} />

        {/* Pulse circles at intersections */}
        <circle className="anim-line--pulse" cx="360" cy="200" r="3" fill="var(--accent-cyan)" stroke="none" />
        <circle className="anim-line--pulse" cx="1080" cy="450" r="3" fill="var(--accent-purple)" stroke="none" style={{ animationDelay: '-2s' }} />
        <circle className="anim-line--pulse" cx="360" cy="700" r="3" fill="var(--accent-pink)" stroke="none" style={{ animationDelay: '-4s' }} />
        <circle className="anim-line--pulse" cx="1080" cy="200" r="3" fill="var(--accent-cyan)" stroke="none" style={{ animationDelay: '-1s' }} />

        {/* Corner accent bracket - top left */}
        <path
          className="anim-line anim-line--1"
          d="M 40 60 L 40 40 L 60 40"
          stroke="var(--accent-cyan)"
          strokeWidth="1.5"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{ animationDuration: '1.5s', animationDelay: '0.1s' }}
        />
        {/* Corner accent bracket - bottom right */}
        <path
          className="anim-line anim-line--3"
          d="M 1380 840 L 1380 860 L 1360 860"
          stroke="var(--accent-purple)"
          strokeWidth="1.5"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{ animationDuration: '1.5s', animationDelay: '0.8s' }}
        />

        {/* Blurred glow lines */}
        <line x1="0" y1="200" x2="1440" y2="200" stroke="var(--accent-cyan)" strokeWidth="4" opacity="0.03" filter="url(#lineBlur)" />
        <line x1="360" y1="0" x2="360" y2="900" stroke="var(--accent-purple)" strokeWidth="4" opacity="0.03" filter="url(#lineBlur)" />
      </svg>
    </div>
  );
}
