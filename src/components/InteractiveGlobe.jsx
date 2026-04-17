import { useEffect, useRef } from 'react';

export default function InteractiveGlobe() {
  const containerRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !globeRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
      const rotateY = ((x - centerX) / centerX) * 15;
      
      globeRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <div
        ref={globeRef}
        style={{
          width: '600px',
          height: '600px',
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ stroke: 'rgba(255,255,255,0.08)', fill: 'none', strokeWidth: 0.5 }}>
          {/* Latitude lines */}
          <ellipse cx="50" cy="50" rx="45" ry="10" />
          <ellipse cx="50" cy="50" rx="45" ry="25" />
          <ellipse cx="50" cy="50" rx="45" ry="38" />
          {/* Longitude lines */}
          <ellipse cx="50" cy="50" rx="10" ry="45" />
          <ellipse cx="50" cy="50" rx="25" ry="45" />
          <ellipse cx="50" cy="50" rx="38" ry="45" />
          {/* Outer circle */}
          <circle cx="50" cy="50" r="45" />
        </svg>
      </div>
    </div>
  );
}
