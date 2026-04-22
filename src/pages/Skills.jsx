import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = {
  All: null,
  Frontend: [
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'Vite', icon: 'devicon-vitejs-plain colored' },
    { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
  ],
  Backend: [
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'Dart', icon: 'devicon-dart-plain colored' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'C', icon: 'devicon-c-plain colored' },
    { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
  ],
  'AI/ML': [
    { name: 'OpenCV', icon: 'devicon-opencv-plain colored' },
    { name: 'MediaPipe', icon: 'fas fa-hand-sparkles', customColor: '#00e5ff' },
    { name: 'NumPy', icon: 'devicon-numpy-plain colored' },
    { name: 'Prompt Eng', icon: 'fas fa-robot', customColor: '#7c3aed' },
    { name: 'Gemini AI', icon: 'fas fa-brain', customColor: '#7c3aed' },
  ],
  Tools: [
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
    { name: 'Figma', icon: 'devicon-figma-plain colored' },
    { name: 'Postman', icon: 'devicon-postman-plain colored' },
    { name: 'Canva', icon: 'devicon-canva-plain colored' },
    { name: 'Antigravity', icon: 'fab fa-google', customColor: '#7c3aed' },
  ],
};

const allSkills = Object.values(skillCategories).filter(v => v).flat();
const marqueeSkills = [...allSkills, ...allSkills]; 
const tabs = Object.keys(skillCategories);

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');
  const sectionRef = useRef(null);

  const displayed = activeTab === 'All' ? allSkills : skillCategories[activeTab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // Reveal Skills Cards - Runs when tab changes
      gsap.fromTo(q('.skill-card'), 
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // Reveal Headline - Runs only once on mount
      gsap.fromTo(q('.section-title'),
        { opacity: 0, y: 50, skewX: -10 },
        { 
          opacity: 1, y: 0, skewX: 0, 
          duration: 1.2, 
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.section-title'), start: 'top 85%' }
        }
      );

      // Rolling Title Animation Logic
      const rollSlot = (slot) => {
        gsap.fromTo(slot, { y: '0%' }, { y: '-75%', duration: 1.5, ease: 'expo.inOut' });
      };

      q('.emoji-slot').forEach(slot => {
        ScrollTrigger.create({
          trigger: slot,
          start: 'top 85%',
          onEnter: () => rollSlot(slot)
        });
      });

      // Hover re-trigger
      q('.rolling-letter-wrap').forEach(wrap => {
        wrap.addEventListener('mouseenter', () => rollSlot(wrap.querySelector('.emoji-slot')));
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="section-hud section-hud--top" />
      <div className="scanner-laser" />
      <div className="container">
        <div className="skills__header">
          <span className="tech-label">Technical stack</span>
          <h2 className="section-title inline-title">
            My T<span className="rolling-letter-wrap">
              <span className="rolling-letter">
                <div className="emoji-slot"><span>o</span><span>⚡</span><span>🔹</span><span>🛠</span></div>
              </span>
            </span>olkit
           
          </h2>
        </div>

        <div className="skills__tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`skills__tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="skills__grid">
          {displayed.map((skill, idx) => (
            <div className="skill-card" key={`${skill.name}-${idx}`}>
              <div className="skill-card__icon">
                <i className={skill.icon} style={skill.customColor ? { color: skill.customColor } : {}} />
              </div>
              <div className="skill-card__name">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills__marquee-wrapper">
        <div className="skills__marquee">
          {marqueeSkills.map((skill, idx) => (
            <div className="skills__marquee-item" key={idx}>
              <i className={skill.icon} style={skill.customColor ? { color: skill.customColor } : {}} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
