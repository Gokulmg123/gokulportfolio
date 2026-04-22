import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

// ── Typed text hook ────────────────────────────────────────
function useTyped(strings, speed = 70, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [blink, setBlink] = useState(true);
  const state = useRef({ idx: 0, char: 0, del: false });

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let timer;
    function tick() {
      const { idx, char, del } = state.current;
      const word = strings[idx];
      if (!del) {
        state.current.char++;
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        setDisplay(word.slice(0, state.current.char));
        if (state.current.char === word.length) {
          timer = setTimeout(() => { state.current.del = true; tick(); }, pause);
          return;
        }
      } else {
        state.current.char--;
        setDisplay(word.slice(0, state.current.char));
        if (state.current.char === 0) {
          state.current.del = false;
          state.current.idx = (idx + 1) % strings.length;
        }
      }
      timer = setTimeout(tick, del ? speed / 2 : speed);
    }
    const terminalRef = { current: null }; // dummy
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [strings, speed, pause]);

  return { display, blink };
}

// ── Education timeline item ────────────────────────────────
function EduItem({ num, degree, year, school, score, last }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    );
  }, []);

  return (
    <div ref={ref} className={`edu-item ${last ? 'edu-item--last' : ''}`}>
      <div className="timeline-dot">
        {String(num + 1).padStart(2, '0')}
      </div>
      <div className="edu-item__content">
        <span className="edu-item__year">{year}</span>
        <h3 className="edu-item__degree">{degree}</h3>
        <p className="edu-item__school">{school}</p>
        {score && <div className="edu-item__score"><span className="score-star">★</span> {score}</div>}
      </div>
    </div>
  );
}

// ── Info card ──────────────────────────────────────────────
function InfoCard({ label, value, accent, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay,
        scrollTrigger: { trigger: ref.current, start: 'top 95%' }
      }
    );
  }, [delay]);
  return (
    <div ref={ref} className="info-card">
      <span className="info-card__label">{label}</span>
      <span className={`info-card__value ${accent ? 'info-card__value--accent' : ''}`}>{value}</span>
    </div>
  );
}

const ROLES = ['Flutter Developer', 'Python Developer', 'Web Designer', 'Full-Stack Dev', 'AI Enthusiast'];

const EDU = [
  { degree: 'MSc Computer Science', year: '2025 – 2027', school: 'Dept of Computer Science, University of Kerala', score: null },
  { degree: 'BSc Computer Science', year: '2022 – 2025', school: 'Govt College Kariavattom, University of Kerala', score: 'CGPA: 8.5' },
  { degree: 'Higher Secondary', year: '2020 – 2022', school: 'GHSS Thonnakkal (Computer Science)', score: '97.3%' },
];

export default function About() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const bioRef = useRef(null);
  const { display, blink } = useTyped(ROLES, 68, 1800);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.fromTo(q('.tech-label'),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    );

    // Premium Smooth Reveal for Title
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 50, skewY: 2 },
      { 
        opacity: 1, y: 0, skewY: 0,
        duration: 1.5, 
        ease: 'expo.out',
        scrollTrigger: { 
          trigger: headRef.current, 
          start: 'top 85%'
        } 
      }
    );

    // Minute detailing: Floating nodes animation
    gsap.to(q('.hud-node'), {
      y: -10,
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
      ease: 'sine.inOut'
    });

  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="section-hud section-hud--top" />
      
      {/* Minute detailing: Background HUD elements */}
      <div className="about__hud">
        <div className="hud-line hud-line--v" style={{ left: '5%', opacity: 0.1 }} />
        <div className="hud-line hud-line--h" style={{ top: '15%', opacity: 0.05 }} />
        <div className="neural-node" style={{ top: '10%', right: '10%' }} />
        <div className="neural-node" style={{ bottom: '20%', left: '15%' }} />
        <div className="neural-node" style={{ top: '60%', right: '5%' }} />
        <div className="hud-node" style={{ top: '20%', left: '4%', position: 'absolute', width: '6px', height: '6px', background: 'var(--accent-cyan)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-cyan)' }} />
      </div>

      <div className="container">
        <div className="about__inner">
          <div className="about__hero">
            <div className="about__hero-left">
              <span className="tech-label">System.Identity</span>
              <h2 className="section-title" ref={headRef}>
                Bridging Logic <br />
                With <span className="gradient-text">Creative Vision</span>
              </h2>

              <div className="role-wrap" style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '1.2rem', 
                color: 'var(--accent-cyan)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ opacity: 0.5 }}>$</span>
                <span className="role-text">{display}</span>
                <span className={`role-cursor${blink ? ' on' : ''}`} style={{ width: '8px', height: '1.2em', background: 'var(--accent-cyan)', opacity: blink ? 1 : 0 }}></span>
              </div>

              <div ref={bioRef}>
                <p className="about-bio">
  I&apos;m <strong>Gokul MG</strong>, a <strong>Full-Stack Developer</strong> based in <strong>Trivandrum</strong>, focused on building 
  <strong> scalable, user-centric digital solutions</strong>. I specialize in <strong>Python,Flutter, and modern web technologies</strong>, 
  combining <strong>clean design</strong> with <strong>efficient engineering</strong> to deliver high-performance applications.
</p>
                <p className="about-bio" style={{ marginTop: '20px' }}>
  Driven by a deep interest in <strong>Artificial Intelligence and Machine Learning</strong>, I aim to build 
  <strong> intelligent systems</strong> that go beyond functionality—delivering meaningful, real-world impact.
</p>
              </div>
            </div>

            <div className="about__hero-right">
              <div className="info-grid">
                <InfoCard label="Base" value="Kerala, India" delay={0.0} />
                <InfoCard label="Uplink" value="gokulmg752@gmail.com" delay={0.1} />
                <InfoCard label="Availability" value="Ready for Mission" accent delay={0.2} />
                <InfoCard label="Specialization" value="AI & Full-Stack" delay={0.3} />
              </div>
            </div>
          </div>

          <div className="divider-wrap">
            <div className="divider-line" />
            <span className="tech-label" style={{ margin: 0 }}>Execution History</span>
            <div className="divider-line" />
          </div>

          <div className="edu-section">
            <div className="edu-list">
              {EDU.map((e, i) => (
                <EduItem key={i} num={i} last={i === EDU.length - 1} {...e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}