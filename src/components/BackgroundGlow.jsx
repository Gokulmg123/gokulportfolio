import { useEffect, useRef } from 'react';

export default function BackgroundGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          borderRadius: '50%'
        }}
      />
    </div>
  );
}
