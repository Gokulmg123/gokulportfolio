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
    desc: ' Won the District Level YIP 5.0 competition with our innovative project, showcasing problem-solving and technical excellence.',
    year: '2024',
  },
   {
    icon: '💻',
    title: 'Flutter Development',
    link: '/achievements/flutter certificate.pdf',
    org: 'simplilearn',
    desc: 'Successfully completed a Flutter development course, gaining practical experience in building cross-platform mobile applications.',
    year: '2025',
  },
  {
    icon: '💻',
    title: 'Prompt Engineering',
    link: '/achievements/CertificateOfCompletion_Introduction to Prompt Engineering for Generative AI.pdf',
    org: 'linkedin',
    desc: 'Completed a course on Prompt Engineering for Generative AI, learning to design, optimize, and evaluate prompts for better AI outputs.',
    year: '2025',
  },
  {
    icon: '🤖',
    title: 'Ai for All',
    link: '/achievements/Gokul MG_AI_APPRECIATE_CERTIFICATE.png',
    org: 'INTEL',
    desc: 'Participated in 24-hour hackathon, building a rapid prototype that won recognition from judges for innovation and execution.',
    year: '2025',
  },
  {
    icon: '🐍',
    title: 'Python course completion',
    link: '/achievements/achivement 1.jpg',
    org: 'GUVI',
    desc: 'Successfully completed an industry-relevant Python programming course by GUVI, gaining hands-on expertise and real-world skills.',
    year: '2023',
  },
  {
    icon: '🤖',
    title: 'Ai for india 2.0',
    link: '/achievements/achivement 2.jpg',
    org: 'GUVI',
    desc: 'Successfully completed the "AI for India 2.0 course on GUVI", supported by Skill India, building a strong foundation in Artificial Intelligence.',
    year: '2023',
  },
  
  
 
];const hobbies = [
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

      // Header
      gsap.from(q('.achievements__header > *'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Animate line drawing down
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

      // Animate each timeline dot & card as we scroll past them
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
            { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
          );
      });

      // Stats stagger
      gsap.from(q('.achievement-stat'), {
        y: 40,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.achievements__stats',
          start: 'top 85%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [q]);

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="container">
        <div className="achievements__header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Recognition</div>
          <h2 className="section-title">
            Milestones &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            A journey of growth, learning, and building things that matter
          </p>
        </div>

        {/* Timeline */}
        <div className="achievements__timeline">
          {achievements.map((item, idx) => (
            <div className="achievement-item" key={idx} id={`achievement-${idx}`}>
              {idx % 2 === 0 ? (
                <>
                  <div className="achievement-card">
                    <div className="achievement-card__icon">{item.icon}</div>

                    <div className="achievement-card__title"> {item.link ? (
    <a 
      href={item.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="achievement-link"
    >
      {item.title} ↗
    </a>
  ) : (
    item.title
  )}</div>
                    <div className="achievement-card__org">{item.org}</div>
                    <div className="achievement-card__desc">{item.desc}</div>
                    <div className="achievement-card__year">{item.year}</div>
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

                    <div className="achievement-card__title">{item.link ? (
    <a 
      href={item.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="achievement-link"
    >
      {item.title} ↗
    </a>
  ) : (
    item.title
  )}</div>
                    <div className="achievement-card__org">{item.org}</div>
                    <div className="achievement-card__desc">{item.desc}</div>
                    <div className="achievement-card__year">{item.year}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

       {/* Hobbies Section */}
<div className="achievements__hobbies">
  <h3 className="achievements__hobbies-title">
    Beyond Code 💡
  </h3>

  <div className="achievements__hobbies-grid">
    {hobbies.map((hobby, idx) => (
      <div className="hobby-card" key={idx}>
        <div className="hobby-card__icon">
  <img src={hobby.gif} alt={hobby.title} />
</div>
        <div className="hobby-card__title">{hobby.title}</div>
        <div className="hobby-card__desc">{hobby.desc}</div>
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}
