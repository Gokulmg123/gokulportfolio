import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Crosshair, Scan, Cpu } from 'lucide-react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverType, setHoverType] = useState('default'); // 'code', 'gaming', 'ai', 'default'

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = (e) => {
      const target = e.target.closest('button, a, .rolling-letter-wrap, .social-link, .ai-btn, .project-card, .skill-pill');
      if (target) {
        setIsHovered(true);
        // Determine theme based on class name or content
        const className = target.className || '';
        if (typeof className === 'string' && className.includes('ai')) setHoverType('ai');
        else if (target.closest('.project-card')) setHoverType('code');
        else if (target.closest('.rolling-letter-wrap')) setHoverType('gaming');
        else setHoverType('default');
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="custom-cursor-container">
      {/* Outer Reticle - Gaming / AI Hybrid */}
      <motion.div
        className={`cursor-ring ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: isClicked ? 45 : isHovered ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="bracket left">[</div>
        <div className="bracket right">]</div>
      </motion.div>

      {/* Center Dot / Icon */}
      <motion.div
        className="cursor-dot"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isClicked ? 0.5 : isHovered ? 1.5 : 1 }}
      >
        {isHovered && hoverType === 'ai' && <Cpu size={12} className="cursor-icon pulse" />}
        {isHovered && hoverType === 'gaming' && <Crosshair size={12} className="cursor-icon spin" />}
        {isHovered && hoverType === 'code' && <Scan size={12} className="cursor-icon" />}
      </motion.div>
      
      {/* HUD Label */}
      {isHovered && (
        <motion.div style={{ x: cursorX, y: cursorY }} className="cursor-label-container">
          <motion.div 
            className="cursor-label"
            initial={{ opacity: 0, x: 15, y: 15 }}
            animate={{ opacity: 1, x: 25, y: 25 }}
          >
            {hoverType === 'ai' ? '< SYS_LINK >' : hoverType === 'code' ? '{ EXECUTE }' : '[ ENGAGE ]'}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomCursor;
