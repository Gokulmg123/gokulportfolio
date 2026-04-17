import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import aiAnimationData from '../assets/AI Robot.json';
import BackgroundGlow from '../components/BackgroundGlow';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const [assistantMode, setAssistantMode] = useState(false);
  const lottieRef = useRef(null);
  const assistantRef = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(heroRef);
    gsap.set(q('.hero__fade-up'), { y: 40, opacity: 0 });
    gsap.to(q('.hero__fade-up'), 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const toggleAssistantMode = (turnOn) => {
    if (turnOn) {
      setAssistantMode(true);
    } else {
      if (assistantRef.current) {
        gsap.to(assistantRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => setAssistantMode(false)
        });
      } else {
        setAssistantMode(false);
      }
    }
  };

  useEffect(() => {
    if (assistantMode && assistantRef.current) {
      const q = gsap.utils.selector(assistantRef);
      gsap.fromTo(assistantRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo(q('.ai-bubble'), 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.2 }
      );
    }
  }, [assistantMode]);

  const handleAction = (sectionId) => {
    toggleAssistantMode(false);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <BackgroundGlow />

      <div className="container hero__layout">
        
        {/* Main Title Card */}
        <div className="hero__main-card glass-card glowing-edge hero__fade-up">
          <div className="glowing-edge-border" />
          <div className="hero__greeting">Hi there, I'm</div>
          <h1 className="hero__huge-title">
            G<span className="hero__o-ring">⚙️</span>KUL MG
          </h1>
          <p className="hero__desc-new">
            Designing intelligent digital experiences where elegant design meets advanced technology.
          </p>
        </div>

        {/* Middle Two Cards */}
        <div className="hero__middle-row">
          <div className="hero__skills-card glass-card glowing-edge hero__fade-up">
            <div className="glowing-edge-border" />
            <div className="hero__skill-item">
              <span className="hero__skill-icon">🌐</span> Web Developer
            </div>
            <div className="hero__skill-item">
              <span className="hero__skill-icon">📱</span> Flutter Developer
            </div>
            <div className="hero__skill-item">
              <span className="hero__skill-icon">🐍</span> Python Developer
            </div>
            <div className="hero__skill-item">
              <span className="hero__skill-icon">🧠</span> AI & Machine Learning Enthusiast
            </div>
            
          </div>

          <div className="hero__actions-card glass-card glowing-edge hero__fade-up">
            <div className="glowing-edge-border" />
            <div className="hero__actions-top">
              <button className="btn-ai" onClick={() => toggleAssistantMode(true)}>
                <i className="fas fa-robot" /> Ask AI Assistant
              </button>
              <a href="/Gokul_M G_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <i className="fas fa-file-alt" /> View Resume
              </a>
            </div>
            <div className="hero__socials-glass">
              <a href="https://github.com/Gokulmg123" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
              <a href="https://www.linkedin.com/in/gokul-m-g-838797362/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="mailto:gokulmg752@gmail.com" aria-label="Email"><i className="fas fa-envelope" /></a>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="hero__stats-row">
          <div className="hero__stat-card glass-card hero__fade-up" style={{ '--card-accent': 'var(--accent-cyan)' }}>
            {/*<div className="hero__stat-icon"><i className="fas fa-code-branch" /></div>*/}
            <div className="hero__stat-val">🧑‍💻</div>
            <div className="hero__stat-val">Creative</div>
          </div>
          <div className="hero__stat-card glass-card hero__fade-up" style={{ '--card-accent': 'var(--accent-purple)' }}>
            {/*<div className="hero__stat-icon"><i className="fas fa-database" /></div>*/}
            <div className="hero__stat-val">🔧</div>
            <div className="hero__stat-val">Problem Solver</div>
          </div>
          <div className="hero__stat-card glass-card hero__fade-up" style={{ '--card-accent': 'var(--accent-green)' }}>
            <div className="hero__stat-icon"><i className="fas fa-trophy" /></div>
            <div className="hero__stat-val">Winner</div>
            <div className="hero__stat-label">YIP 5.0 District Level</div>
          </div>
        </div>

      </div>

      {/* AI ASSISTANT OVERLAY */}
      {assistantMode && (
        <div className="hero__assistant" ref={assistantRef}>
          <div className="hero__assistant-bg" />
          
          <div className="ai-center">
            <Lottie lottieRef={lottieRef} animationData={aiAnimationData} loop={true} autoplay={true} className="ai-lottie" />
          </div>

          <h2 className="ai-greeting">Hi, I'm Gokul's AI. How can I help you?</h2>

          <div className="ai-bubbles">
            <button className="ai-bubble" onClick={() => handleAction('projects')}><i className="fas fa-rocket" /> Show me Gokul's Projects</button>
            <button className="ai-bubble ai-bubble--accent" onClick={() => handleAction('skills')}><i className="fas fa-code" /> What are his Skills?</button>
            <button className="ai-bubble" onClick={() => handleAction('contact')}><i className="fas fa-envelope" /> Let's get in touch</button>
          </div>

          <button className="ai-close" onClick={() => toggleAssistantMode(false)}>
            <i className="fas fa-times" /> Close Assistant
          </button>
        </div>
      )}

    </section>
  );
}

