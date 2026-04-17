import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // Scroll entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Showcase wrapper entrance
      tl.fromTo(q('.about__showcase-wrapper'),
        { opacity: 0, scale: 0.85, rotation: -8 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.4, ease: 'power3.out' }
      );

      // Badges pop in
      tl.to(q('.about__badge'), {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.75,
        ease: 'back.out(1.7)'
      }, '-=0.6');

      // Text content animation
      tl.from(q('.about__animate-text'), {
        y: 36,
        opacity: 0,
        stagger: 0.09,
        duration: 0.75,
        ease: 'power3.out'
      }, '-=1.1');

      // Parallax on badges while scrolling
      gsap.to(q('.about__badge--1'), {
        y: -55,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      gsap.to(q('.about__badge--2'), {
        y: 48,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });

      gsap.to(q('.about__badge--3'), {
        y: -38,
        x: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [q]);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="about__container">

          {/* Visual Side */}
          <div className="about__visual">
            <div className="about__showcase-wrapper">
              
              {/* Cinematic glow background */}
              <div className="about__showcase-glow"></div>

              {/* Main Portrait */}
              <img
                src="/abooutimage/light.jpg"
                alt="Gokul MG"
                className="about__showcase-img"
              />

              {/* Glass overlay */}
              <div className="about__glass-overlay"></div>

              {/* Floating Badges */}
              <div className="about__badge about__badge--1">
                <i className="devicon-react-original colored" />
                React Dev
              </div>
              <div className="about__badge about__badge--2">
                <i className="devicon-python-plain colored" />
                Python & AI
              </div>
              <div className="about__badge about__badge--4">
                <i className="devicon-flutter-plain colored" />
                mobile app development
              </div>
              <div className="about__badge about__badge--3">
                <i className="fas fa-brain" style={{ color: 'var(--accent-pink)' }} />
                ML Learner
              </div>

            </div>
          </div>

          {/* Content Side */}
          <div className="about__content">
            <div className="section-label about__animate-text">About Me</div>
            
            <h2 className="section-title about__animate-text">
              Passionate About <br />
              <span className="gradient-text">Technology & Innovation</span>
            </h2>

            <p className="about__body about__animate-text">
              I'm <strong>Gokul MG</strong>, a passionate <strong>Flutter, Python, and Web Developer</strong> based in Trivandrum, focused on building modern and impactful digital solutions. I specialize in <strong>full-stack development</strong> and <strong>Web designing</strong>, creating scalable and user-centric applications that seamlessly integrate design and functionality.
            </p>

            <p className="about__body about__animate-text">
              With experience in mobile development using <strong>Flutter</strong>, backend systems with <strong>Python</strong>, and interactive web applications, I enjoy transforming ideas into real-world products. I'm particularly interested in <strong>Artificial Intelligence</strong> and <strong>machine learning</strong>, constantly exploring new technologies to enhance my skills and stay ahead in the evolving tech landscape.
            </p>

            <div className="about__info-grid">
              <div className="about__info-item about__animate-text">
                <div className="about__info-label">Location</div>
                <div className="about__info-value">Trivandrum, Kerala, India</div>
              </div>
              <div className="about__info-item about__animate-text">
                <div className="about__info-label">Email</div>
                <div className="about__info-value">gokulmg752@gmail.com</div>
              </div>
              <div className="about__info-item about__animate-text">
                <div className="about__info-label">Status</div>
                <div className="about__info-value" style={{ color: 'var(--accent-green)' }}>
                  Open to Work
                </div>
              </div>
              <div className="about__info-item about__animate-text">
                <div className="about__info-label">Focus</div>
                <div className="about__info-value">Web & Mobile Dev & AI</div>
              </div>
            </div>

            <div className="about__timeline about__animate-text">
              <div className="timeline-item">
                <div className="timeline-header">
                  <div className="timeline-degree">MSc Computer Science</div>
                  <div className="timeline-year">2025 – 2027</div>
                </div>
                <div className="timeline-school">Department of Computer Science, University of Kerala</div>
              </div>

              <div className="timeline-item">
                <div className="timeline-header">
                  <div className="timeline-degree">BSc Computer Science</div>
                  <div className="timeline-year">2022 – 2025</div>
                </div>
                <div className="timeline-school">Government College Kariavattom, University of Kerala</div>
                <div className="timeline-score">
                  <i className="fas fa-star" style={{ marginRight: '4px' }} />
                  CGPA: 8.5
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-header">
                  <div className="timeline-degree">Higher Secondary (Computer Science)</div>
                  <div className="timeline-year">2020 – 2022</div>
                </div>
                <div className="timeline-school">Government Higher Secondary School, Thonnakkal</div>
                <div className="timeline-score">
                  <i className="fas fa-star" style={{ marginRight: '4px' }} />
                  Percentage: 97.3%
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}