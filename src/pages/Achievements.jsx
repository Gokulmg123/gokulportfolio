import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: '🏆',
    title: 'District Winner YIP 5.0',
    link: '/achievements/achivement 3.jpg.pdf',
    org: 'KDISC',
    desc: 'Won the District Level YIP 5.0 competition with our innovative project, showcasing problem-solving and technical excellence.',
    year: '2024',
  },
  {
    icon: '💻',
    title: 'Flutter Development',
    link: '/achievements/flutter certificate.pdf',
    org: 'Simplilearn',
    desc: 'Successfully completed a Flutter development course, gaining practical experience in building cross-platform mobile applications.',
    year: '2025',
  },
  {
    icon: '💻',
    title: 'Prompt Engineering',
    link: '/achievements/CertificateOfCompletion_Introduction to Prompt Engineering for Generative AI.pdf',
    org: 'LinkedIn',
    desc: 'Completed a course on Prompt Engineering for Generative AI, learning to design, optimize, and evaluate prompts for better AI outputs.',
    year: '2025',
  },
  {
    icon: '🤖',
    title: 'AI for All',
    link: '/achievements/Gokul MG_AI_APPRECIATE_CERTIFICATE.png',
    org: 'INTEL',
    desc: 'Participated in recognition programs building a rapid prototype that won recognition from judges for innovation and execution.',
    year: '2025',
  },
  {
    icon: '🐍',
    title: 'Python Course Completion',
    link: '/achievements/achievement 1.jpg',
    org: 'GUVI',
    desc: 'Successfully completed an industry-relevant Python programming course by GUVI, gaining hands-on expertise and real-world skills.',
    year: '2023',
  },
  {
    icon: '🤖',
    title: 'AI for India 2.0',
    link: '/achievements/achivement 2.jpg',
    org: 'GUVI',
    desc: 'Successfully completed the "AI for India 2.0 course on GUVI", supported by Skill India, building a strong foundation in Artificial Intelligence.',
    year: '2023',
  },
]; 

const hobbies = [
  { gif: '/hobbiegif/digital-art.gif', title: 'Designing UI', desc: 'Creating clean and modern interfaces' },
  { gif: '/hobbiegif/headphones.gif', title: 'Music', desc: 'Listening & focusing with deep work playlists' },
  { gif: '/hobbiegif/artificial-intelligence.gif', title: 'Learning Tech', desc: 'Exploring ML, AI & new tools' },
  { gif: '/hobbiegif/game-console.gif', title: 'Gaming', desc: 'Strategy & problem-solving games' },
  { gif: '/hobbiegif/creative.gif', title: 'Creative Thinking', desc: 'Turning ideas into real projects' },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Rolling Emoji Animation Logic
      const rollSlot = (slot) => {
        gsap.fromTo(slot, { y: '0%' }, { y: '-75%', duration: 1.5, ease: 'expo.inOut' });
      };

      const slots = q('.emoji-slot');
      slots.forEach(slot => {
        ScrollTrigger.create({
          trigger: slot,
          start: 'top 85%',
          onEnter: () => rollSlot(slot)
        });
      });

      q('.rolling-letter-wrap').forEach(wrap => {
        wrap.addEventListener('mouseenter', () => rollSlot(wrap.querySelector('.emoji-slot')));
      });

      // 2. Timeline Animations
      gsap.fromTo(q('.achievements__timeline::before'),
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.achievements__timeline',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      const items = q('.achievement-item');
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const card = item.querySelector('.achievement-card');
        const dot = item.querySelector('.achievement-dot');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });

        tl.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
        )
        .fromTo(card,
          { x: isLeft ? -40 : 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.2'
        );
      });

      // 3. Hobbies Animation
      gsap.fromTo(q('.hobby-card'),
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, 
          stagger: 0.1, duration: 0.8, 
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.achievements__hobbies-grid', start: 'top 85%' }
        }
      );

      // Global Section Reveal
      gsap.fromTo(q('.section-title'),
        { opacity: 0, y: 50, skewX: -10 },
        { 
          opacity: 1, y: 0, skewX: 0, 
          duration: 1.2, 
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.section-title'), start: 'top 85%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [q]);

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="section-hud section-hud--top" />
      <div className="section-hud--corners" />
      <div className="container">
        <div className="achievements__header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Recognition</div>
          <h2 className="section-title">
            Milest<span className="rolling-letter-wrap">
              <span className="rolling-letter">
                <div className="emoji-slot"><span>o</span><span>🏆</span><span>🔹</span><span>💎</span></div>
              </span>
            </span>nes &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="achievements__subtitle">
            A journey of growth, learning, and building things that matter
          </p>
        </div>

        <div className="achievements__timeline">
          {achievements.map((item, idx) => (
            <div className="achievement-item" key={idx}>
              {idx % 2 === 0 ? (
                <>
                  <div className="achievement-card">
                    <div className="achievement-card__icon">{item.icon}</div>
                    <div className="achievement-card__header">
                      <div className="achievement-card__title">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="achievement-link">
                            {item.title} <i className="fas fa-external-link-alt" />
                          </a>
                        ) : item.title}
                      </div>
                      <span className="achievement-card__year">{item.year}</span>
                    </div>
                    <div className="achievement-card__org">{item.org}</div>
                    <div className="achievement-card__desc">{item.desc}</div>
                  </div>
                  <div className="achievement-dot-col">
                    <div className="achievement-dot" />
                  </div>
                  <div className="achievement-spacer" />
                </>
              ) : (
                <>
                  <div className="achievement-spacer" />
                  <div className="achievement-dot-col">
                    <div className="achievement-dot" />
                  </div>
                  <div className="achievement-card">
                    <div className="achievement-card__icon">{item.icon}</div>
                    <div className="achievement-card__header">
                      <div className="achievement-card__title">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="achievement-link">
                            {item.title} <i className="fas fa-external-link-alt" />
                          </a>
                        ) : item.title}
                      </div>
                      <span className="achievement-card__year">{item.year}</span>
                    </div>
                    <div className="achievement-card__org">{item.org}</div>
                    <div className="achievement-card__desc">{item.desc}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="achievements__hobbies">
          <div className="skills__header" style={{ marginTop: '120px', marginBottom: '60px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>LIFESTYLE</div>
            <h3 className="section-title">Beyond <span className="gradient-text">Code</span> 💡</h3>
          </div>

          <div className="achievements__hobbies-grid">
            {hobbies.map((hobby, idx) => (
              <div className="hobby-card" key={idx}>
                <div className="hobby-card__icon">
                  <img src={hobby.gif} alt={hobby.title} />
                </div>
                <div className="hobby-card__title">{hobby.title}</div>
                <div className="hobby-card__desc">{hobby.desc}</div>
                <div className="hobby-card__decoration" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
