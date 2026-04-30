import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Cpu, Bot, Code2, TerminalSquare, Database, Gamepad2, Target, Hexagon } from 'lucide-react';
import './GlobalTechDecor.css';

const GlobalTechDecor = () => {
  const [floatingItems, setFloatingItems] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Advanced floating items combining text and lucide icons
    const icons = [
      { type: 'icon', Icon: Network, theme: 'ai' },
      { type: 'icon', Icon: Cpu, theme: 'ai' },
      { type: 'icon', Icon: Bot, theme: 'ai' },
      { type: 'icon', Icon: Code2, theme: 'code' },
      { type: 'icon', Icon: TerminalSquare, theme: 'code' },
      { type: 'icon', Icon: Database, theme: 'code' },
      { type: 'icon', Icon: Gamepad2, theme: 'gaming' },
      { type: 'icon', Icon: Target, theme: 'gaming' },
      { type: 'icon', Icon: Hexagon, theme: 'gaming' },
      { type: 'text', val: '010101', theme: 'code' },
      { type: 'text', val: '0x1A4', theme: 'code' },
      { type: 'text', val: '<>', theme: 'code' },
      { type: 'text', val: '{...}', theme: 'code' },
      { type: 'text', val: '[ SYS_OK ]', theme: 'ai' },
      { type: 'text', val: 'AI_MODEL', theme: 'ai' },
      { type: 'point', val: '+', theme: 'gaming' },
      { type: 'point', val: '·', theme: 'gaming' },
      { type: 'point', val: 'x', theme: 'ai' }
    ];

    const generateItems = () => Array.from({ length: 65 }).map((_, i) => {
      const itemDef = icons[Math.floor(Math.random() * icons.length)];
      return {
        id: i,
        ...itemDef,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 20 + Math.random() * 30, // 20s to 50s
        delay: Math.random() * -30, // Start randomly within animation
        size: itemDef.type === 'icon' ? 16 + Math.random() * 24 : 0.8 + Math.random() * 1.5,
        opacity: itemDef.type === 'icon' ? 0.03 + Math.random() * 0.04 : 0.02 + Math.random() * 0.05,
        rotate: Math.random() * 360,
        rotateSpeed: (Math.random() - 0.5) * 360, // Total rotation over duration
        orbitRadius: 10 + Math.random() * 30,
      };
    });

    setFloatingItems(generateItems());

    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 80,
        y: (e.clientY - window.innerHeight / 2) / 80
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="global-tech-decor" aria-hidden="true">
      {/* 🌌 Atmospheric Backdrop Gradients */}
      <div className="atmospheric-glow glow-ai" />
      <div className="atmospheric-glow glow-gaming" />

      {/* 🚀 Advanced Floating Elements */}
      {floatingItems.map((el) => {
        const themeColor = 
          el.theme === 'ai' ? 'var(--accent-purple)' :
          el.theme === 'gaming' ? 'var(--accent-pink)' : 
          'var(--accent-cyan)'; // code

        return (
          <motion.div
            key={el.id}
            className={`tech-floating-item type-${el.type}`}
            animate={{ 
              x: [mousePos.x * (el.size/10), mousePos.x * (el.size/10) + el.orbitRadius, mousePos.x * (el.size/10)],
              y: [mousePos.y * (el.size/10), mousePos.y * (el.size/10) - el.orbitRadius, mousePos.y * (el.size/10)],
              rotate: [el.rotate, el.rotate + el.rotateSpeed]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay
            }}
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              color: themeColor,
              opacity: el.opacity,
              fontSize: el.type === 'text' ? `${el.size}rem` : 'inherit',
              filter: `drop-shadow(0 0 8px ${themeColor})`,
            }}
          >
            {el.type === 'icon' && el.Icon ? <el.Icon size={el.size} strokeWidth={1.5} /> : el.val}
          </motion.div>
        );
      })}

      {/* 📡 Neural / Geometric Overlay */}
      <svg className="neural-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gaming-grad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* AI Network Web (Left/Top) */}
        <path d="M 0 10 Q 20 20 30 0" stroke="url(#ai-grad)" fill="none" strokeWidth="0.1" />
        <path d="M 10 30 Q 25 45 0 50" stroke="url(#ai-grad)" fill="none" strokeWidth="0.1" />
        <circle cx="20" cy="20" r="0.3" fill="var(--accent-cyan)" opacity="0.3">
          <animate attributeName="r" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="25" cy="45" r="0.2" fill="var(--accent-purple)" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite"/>
        </circle>

        {/* Gaming Angular Traces (Right/Bottom) */}
        <path d="M 100 80 L 80 90 L 90 100" stroke="url(#gaming-grad)" fill="none" strokeWidth="0.1" />
        <path d="M 70 100 L 90 70 L 100 60" stroke="url(#gaming-grad)" fill="none" strokeWidth="0.05" />
        <rect x="80" y="90" width="0.5" height="0.5" fill="var(--accent-pink)" opacity="0.3" transform="rotate(45 80.25 90.25)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
        </rect>
      </svg>
      
      {/* 🎮 HUD Bounds / Snipers Focus */}
      <div className="corner-bracket top-left ai-accent"></div>
      <div className="corner-bracket top-right gaming-accent"></div>
      <div className="corner-bracket bottom-left code-accent"></div>
      <div className="corner-bracket bottom-right ai-accent"></div>
      
      {/* Global scanline overlay specifically for depth */}
      <div className="global-scanline"></div>
    </div>
  );
};

export default GlobalTechDecor;
