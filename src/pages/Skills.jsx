import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = {
  All: null,
  Frontend: [
    { name: 'React', icon: 'devicon-react-original colored',  },
    { name: 'HTML5', icon: 'devicon-html5-plain colored',  },
    { name: 'CSS3', icon: 'devicon-css3-plain colored', },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored',  },
    { name: 'Vite', icon: 'devicon-vitejs-plain colored', },
    { name: 'Flutter', icon: 'devicon-flutter-plain colored',  },
    
  ],
  Backend: [
    { name: 'Python', icon: 'devicon-python-plain colored',  },
    { name: 'Dart', icon: 'devicon-dart-plain colored',  },
    
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored',  },
    { name: 'Express', icon: 'devicon-express-original',  },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored',  },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored',   },
  ],
  'AI/ML': [
    
    { name: 'OpenCV', icon: 'devicon-opencv-plain colored',  },
    { name: 'MediaPipe', icon: 'fas fa-hand-sparkles', customColor: '#00e5ff' },
    { name: 'NumPy', icon: 'devicon-numpy-plain colored',  },
    { name: 'Prompt Engineering', icon: 'fas fa-robot', customColor: '#7c3aed' },
    { name: 'Gemini AI', icon: 'fas fa-robot', customColor: '#7c3aed' },
  ],
  Tools: [
    { name: 'Git', icon: 'devicon-git-plain colored',  },
    { name: 'GitHub', icon: 'devicon-github-original',  },
    { name: 'VS Code', icon: 'devicon-vscode-plain colored',  },
    { name: 'Figma', icon: 'devicon-figma-plain colored',  },
    { name: 'Antigravity', icon: 'fab fa-google',  },
    { name: 'Postman', icon: 'devicon-postman-plain colored',  },
  ],
};

const allSkills = [
  ...skillCategories.Frontend,
  ...skillCategories.Backend,
  ...skillCategories['AI/ML'],
  ...skillCategories.Tools,
];

const marqueeSkills = [...allSkills, ...allSkills]; // doubled for infinite loop
const tabs = Object.keys(skillCategories);

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');
  const sectionRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  const displayed = activeTab === 'All' ? allSkills : skillCategories[activeTab];

  // Run scroll animation once on mount
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header animation
      gsap.from(q('.skills__header > *'), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [q]);

  // Re-run card stagger animation when tab changes
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(q('.skill-card'), 
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.04,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.skills__grid',
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeTab, q]);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div className="skills__header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Technical Skills</div>
          <h2 className="section-title">
            My <span className="gradient-text">Toolkit</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
            Technologies I work with to bring ideas to life
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills__tabs" role="tablist" aria-label="Skill categories">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`skills__tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              id={`skills-tab-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills__grid">
          {displayed.map((skill, idx) => (
            <div className="skill-card" key={`${skill.name}-${idx}`} id={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              <div className="skill-card__icon">
                <i
                  className={skill.icon}
                  style={skill.customColor ? { color: skill.customColor } : {}}
                />
              </div>
              <div className="skill-card__name">{skill.name}</div>
              <div className="skill-card__level">
                {[1, 2, 3, 4, 5].map(dot => (
                  <div
                    key={dot}
                    className={`skill-card__dot ${dot <= skill.level ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row */}
      <div className="skills__marquee-wrapper">
        <div className="skills__marquee">
          {marqueeSkills.map((skill, idx) => (
            <div className="skills__marquee-item" key={idx}>
              <i className={skill.icon} style={skill.customColor ? { color: skill.customColor } : {}} />
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
