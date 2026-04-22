import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aiAnimationData from '../assets/AI Robot.json';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const [assistantMode, setAssistantMode] = useState(false);
  const terminalRef = useRef(null);
  const textContentRef = useRef(null);
  const assistantContentRef = useRef(null);
  const [binaryBits, setBinaryBits] = useState([]);

  // 01. Binary Drift Effect
  useEffect(() => {
    const bits = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      val: Math.random() > 0.5 ? '1' : '0'
    }));
    setBinaryBits(bits);
  }, []);

  // 02. Terminal Simulation
  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

   const lines = [
  { text: '> BOOTING_GOKUL_MG_SYSTEM... ', type: 'comment' },
  { text: '[OK]', type: 'keyword' },

  { text: '\n> LOADING_CORE_MODULES ', type: 'default' },
  { text: '■■■■■■■■', type: 'func' }, 
  { text: ' 100%', type: 'string' },

  { text: '\n\nconst', type: 'keyword' }, 
  { text: ' developer = ', type: 'default' }, 
  { text: '{', type: 'default' },

  { text: '\n  name: ', type: 'default' }, 
  { text: '"Gokul MG"', type: 'string' }, { text: ',', type: 'default' },

  { text: '\n  role: ', type: 'default' }, 
  { text: '"Designer & Developer"', type: 'string' }, { text: ',', type: 'default' },

  { text: '\n  specialization: ', type: 'default' }, 
  { text: '"AI-Driven Applications"', type: 'string' }, { text: ',', type: 'default' },

  { text: '\n  stack: ', type: 'default' }, 
  { text: '["Flutter", "React", "Web development", "Python"]', type: 'func' }, { text: ',', type: 'default' },

  { text: '\n  focus: ', type: 'default' }, 
  { text: '"Performance + Scalable UI Systems"', type: 'string' }, { text: ',', type: 'default' },

  { text: '\n  status: ', type: 'default' }, 
  { text: '"Open to Opportunities"', type: 'string' },

  { text: '\n};', type: 'default' },

  { text: '\n\n$ ', type: 'default' }, 
  { text: 'execute', type: 'func' }, 
  { text: ' deploy_portfolio --version=3.0', type: 'default' },

  { text: '\n[SUCCESS] SYSTEM_READY_FOR_HIRE', type: 'string' }
];

    let currentIdx = 0, charIdx = 0;
    terminal.innerHTML = '';

    const typeWriter = () => {
      if (currentIdx >= lines.length) return;
      const { text, type } = lines[currentIdx];
      const span = document.createElement('span');
      span.className = `code-${type}`;
      if (charIdx < text.length) {
        const char = text[charIdx];
        const lastSpan = terminal.lastElementChild;
        if (lastSpan && lastSpan.className === `code-${type}`) {
          lastSpan.innerHTML += char === '\n' ? '<br>' : char;
        } else {
          span.innerHTML = char === '\n' ? '<br>' : char;
          terminal.appendChild(span);
        }
        charIdx++;
        setTimeout(typeWriter, 20);
      } else {
        currentIdx++;
        charIdx = 0;
        setTimeout(typeWriter, 100);
      }
    };
    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 03. GSAP Animations
  useEffect(() => {
    const q = gsap.utils.selector(heroRef);

    // 🌌 1. Background Typography Assembly (Cinematic Reveal)
    const bgName = q('.hero__bg-name');
    if (bgName[0]) {
      const text = "GOKUL MG";
      bgName[0].innerHTML = text.split('').map(char => 
        char === ' ' ? '&nbsp;' : `<span>${char}</span>`
      ).join('');

      const chars = bgName[0].querySelectorAll('span');
      
      gsap.fromTo(chars, 
        { 
          opacity: 0, 
          x: () => gsap.utils.random(-1000, 1000), 
          y: () => gsap.utils.random(-500, 500),
          z: () => gsap.utils.random(-1000, 1000),
          rotateX: () => gsap.utils.random(-360, 360),
          rotateY: () => gsap.utils.random(-360, 360),
          filter: 'blur(20px) brightness(2)'
        },
        { 
          opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, filter: 'blur(2px) brightness(1)',
          duration: 4, 
          stagger: { each: 0.1, from: "random" }, 
          ease: "expo.out",
          delay: 0.5
        }
      );

      // Recursive Micro-Glitch for Background Text
      const glitch = () => {
        gsap.to(chars[Math.floor(Math.random() * chars.length)], {
          opacity: 0.2,
          filter: 'blur(8px) brightness(3)',
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => setTimeout(glitch, gsap.utils.random(1000, 5000))
        });
      };
      glitch();
    }

    // ✨ 2. Light Streaks Animation
    gsap.fromTo(q('.hero__light-streak'),
      { y: -100, opacity: 0 },
      { 
        y: '100vh', opacity: 0.2, 
        duration: gsap.utils.random(10, 20), 
        repeat: -1, 
        ease: 'none',
        stagger: { each: 5, repeat: -1 }
      }
    );

    // 🎖️ 3. Magnetic Buttons Interaction
    q('.btn, .social-link, .ai-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      });
    });

    gsap.fromTo(q('.hero__pre-title, .hero__description, .hero__actions, .hero__socials'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // 🎖️ 4. Improved Emoji Slot Logic
    const spinSlot = (slot) => {
      // Clear previous animations to prevent conflict
      gsap.killTweensOf(slot);
      
      const tl = gsap.timeline();
      tl.to(slot, {
        y: '-75%',
        duration: 1.5,
        ease: 'expo.inOut',
      })
      .to(slot, {
        y: '0%',
        duration: 1,
        ease: 'power2.inOut',
        delay: 3 // Stay on an emoji for 3s before returning to alphabet
      });
    };

    const slotElements = q('.emoji-slot');
    slotElements.forEach((slot) => {
      // Auto-spin on scroll reveal
      ScrollTrigger.create({
        trigger: slot,
        start: "top 85%",
        onEnter: () => spinSlot(slot),
        onEnterBack: () => spinSlot(slot),
      });

      // Interactive hover spin
      const parent = slot.closest('.rolling-letter-wrap');
      if (parent) {
        parent.addEventListener('mouseenter', () => spinSlot(slot));
      }
    });

    // 🎖️ 5. Drift Animation for Binary Bits
    q('.binary-bit').forEach((bit) => {
      gsap.to(bit, {
        y: '-120vh',
        duration: 15 + Math.random() * 15,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 10
      });
    });

    gsap.fromTo(q('.terminal-card'),
      { x: 50, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const toggleAssistant = (on) => {
    if (on) {
      gsap.to(textContentRef.current, { x: -20, opacity: 0, duration: 0.3, onComplete: () => setAssistantMode(true) });
    } else {
      gsap.to(assistantContentRef.current, { x: 20, opacity: 0, duration: 0.3, onComplete: () => setAssistantMode(false) });
    }
  };

  useEffect(() => {
    if (assistantMode) {
      gsap.fromTo(assistantContentRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
    } else if (textContentRef.current) {
      gsap.fromTo(textContentRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
    }
  }, [assistantMode]);

  const handleAction = (id) => {
    toggleAssistant(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="data-rail"><span>SYSTEM_ONLINE</span><span>SECURE_LINK_v3.0</span><span>GOKUL_MG_IDENTITY</span></div>
      <div className="code-drift"><span>0101</span><span>FLUTTER</span><span>PYTHON</span><span>AI_INIT</span><span>NODE_READY</span></div>
      <div className="hero__background-overlay">
        <div className="hero__bg-name">GOKUL MG</div>
        <div className="hero__horizon" />
        <div className="hero__light-streak" style={{ top: '20%' }} />
        <div className="hero__light-streak" style={{ top: '60%', animationDelay: '-5s' }} />
        <div className="section-hud--corners" />
        <div className="hud-bit" style={{ top: '15%', left: '10%' }}>[ SECTOR_01 // ACTIVE ]</div>
        <div className="hud-bit" style={{ bottom: '20%', right: '15%' }}>[ BUFFER_INIT // 0xAF32 ]</div>
        <div className="hud-bit" style={{ top: '40%', right: '5%' }}>[ LATENCY // 12ms ]</div>
        <div className="hero__grid-pattern" />
        <div className="scanner-line" />
        
        {binaryBits.map(bit => (
          <div 
            key={bit.id} 
            className="binary-bit" 
            style={{ 
              left: `${bit.x}%`, 
              top: '110%',
              opacity: 0.05,
              position: 'absolute',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'var(--accent-cyan)',
              pointerEvents: 'none'
            }}
          >
            {bit.val}
          </div>
        ))}
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__left-wrapper">
            {!assistantMode ? (
              <div className="hero__text-section" ref={textContentRef}>
                <div className="hero__pre-title">
                  <span className="pre-title__dash" />
                  <span>Creative Developer</span>
                </div>
                
                <h1 className="hero__title">
                  Cr<span className="rolling-letter-wrap">
                    <span className="rolling-letter">
                     <div className="emoji-slot">
                      <span>a</span>
  <span>🧠</span><span>
🔹</span>
  <span>💡</span>
</div>
                    </span>
                  </span>fting 
                  <br />
                  Digit<span className="rolling-letter-wrap">
                    <span className="rolling-letter">
                      <div className="emoji-slot"><span>a</span><span>💻</span><span>🔹</span><span>👾</span></div>
                    </span>
                  </span>l 
                  <span className="title-accent">Vision</span>
                </h1>

                <p className="hero__description">
                  Turning technical complexity into <strong>elegant digital experiences</strong>. 
                  Focused on performance and modern aesthetics.
                </p>

                <div className="hero__actions">
                  <button className="btn btn-primary" onClick={() => toggleAssistant(true)}>
                    <span>Initiate AI</span>
                    <i className="fas fa-robot" />
                  </button>
                  <a href="/Gokul_M G_Resume.pdf" target="_blank" className="btn btn-secondary">
                    <span>Get Resume</span>
                    <i className="fas fa-file-download" />
                  </a>
                </div>

                <div className="hero__socials">
                  <a href="https://github.com/Gokulmg123" target="_blank" className="social-link"><i className="fab fa-github" /></a>
                  <a href="https://www.linkedin.com/in/gokul-m-g-838797362/" target="_blank" className="social-link"><i className="fab fa-linkedin-in" /></a>
                  <a href="mailto:gokulmg752@gmail.com" className="social-link"><i className="fas fa-envelope" /></a>
                </div>
              </div>
            ) : (
              <div className="hero__ai-section" ref={assistantContentRef}>
                <div className="ai-hud__header">
                  <span className="tech-label">Core Engine v2.8</span>
                  <button className="ai-exit" onClick={() => toggleAssistant(false)}>
                    <i className="fas fa-times" /> EXIT
                  </button>
                </div>
                <div className="ai-hud__main">
                  <div className="ai-hud__icon">
                    <Lottie animationData={aiAnimationData} loop={true} style={{ width: '150px' }} />
                  </div>
                  <div className="ai-hud__text">
                    <h2 className="ai-title">Mira <span className="gradient-text">Assistant</span></h2>
                    <p className="ai-status">STATUS: ONLINE | WAITING FOR UPLINK</p>
                  </div>
                </div>
                <div className="ai-hud__actions">
                  <button className="ai-btn" onClick={() => handleAction('projects')}>
                    <span className="ai-btn__num">01</span>
                    <span className="ai-btn__text">PROJECT_CAROUSEL</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                  <button className="ai-btn" onClick={() => handleAction('skills')}>
                    <span className="ai-btn__num">02</span>
                    <span className="ai-btn__text">TECH_STACK_DATA</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                  <button className="ai-btn" onClick={() => handleAction('contact')}>
                    <span className="ai-btn__num">03</span>
                    <span className="ai-btn__text">MAIL_PROTOCOL</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hero__terminal-section">
            <div className="terminal-card">
              <div className="terminal-nav">
                <div className="nav-dots"><span className="nav-dot red" /><span className="nav-dot yellow" /><span className="nav-dot green" /></div>
                <div className="nav-path">~/gokul/system.sh</div>
              </div>
              <div className="terminal-body" ref={terminalRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
