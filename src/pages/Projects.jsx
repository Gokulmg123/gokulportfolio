import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Jarvis AI Assistant',
    desc: 'A next-generation voice & gesture-controlled AI assistant built with Python, MediaPipe and Gemini AI. Features real-time hand gesture recognition to control YouTube, intelligent voice commands, and a custom-built GUI.',
    tags: ['Python', 'MediaPipe', 'Gemini AI', 'OpenCV', 'PyQt5', 'Speech Recognition'],
    icon: '',
    gradient: 'linear-gradient(135deg, #7c3aed44, #00e5ff33)',
    img: 'https://cdn.mos.cms.futurecdn.net/VFLt5vHV7aCoLrLGjP9Qwm-1920-80.jpg',
    github: 'https://github.com/Gokulmg123/updatedjarvis',
  },
  {
    title: 'Smart Student Academic Monitoring System',
    desc: 'A comprehensive academic monitoring system designed to streamline tracking and management of student academic performance. Provides educators with powerful tools to monitor progress and identify areas needing improvement.',
    tags: ['React', 'Node.js', 'MongoDB', 'CSS3', 'Express'],
    icon: '',
    gradient: 'linear-gradient(135deg, #00e5ff33, #7c3aed33)',
    img:'/Screenshot 2026-01-26 172453.png',
    github: 'https://github.com/Gokulmg123/studentprogressmonitor',
  },
  {
    title: 'Smart Product Quotation Builder',
    desc: 'A responsive Flutter application to simplify creating professional product or service quotations. Features real-time calculations for discounts, tax, and totals — displayed in a clean, printable preview layout.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    icon: '',
    gradient: 'linear-gradient(135deg, #f43f8e33, #7c3aed33)',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODlA9Em6JXtp9seDdLK_uKyy4ooqApHXXlg&s',
    github: 'https://github.com/Gokulmg123/Smart-Product-Quotation-Builder',
  },
  {
    title: 'Lyrico',
    desc: 'A feature-rich music player built with Flutter and Firebase, offering a stunning UI and an immersive listening experience.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    icon: '',
    gradient: 'linear-gradient(135deg, #10b98133, #00e5ff33)',
    img: 'https://cdn.dribbble.com/userupload/42532948/file/original-97b5e8ce1a5f66a8025ec8c06a2f564c.png?format=webp&resize=400x300&vertical=center',
    github: 'https://github.com/Gokulmg123/music-player',
  },
  {
    title: 'Portfolio Website',
    desc: 'This futuristic portfolio — crafted with React, and a custom dark aesthetic design system with Lottie animations.',
    tags: ['React', 'CSS3'],
    icon: '🌐',
    gradient: 'linear-gradient(135deg, #f9731633, #f43f8e33)',
    img: null,
    github: 'https://github.com/Gokulmg123/portfolio',
  },
  {
    title: 'Flappy Bird Game',
    desc: 'A fun and challenging Flappy Bird game built with Flutter and Flame, featuring smooth gameplay and vibrant graphics for an addictive experience.',
    tags: ['Flutter', 'Dart', 'Flame'],
    icon: '',
    gradient: 'linear-gradient(135deg, #7c3aed33, #f43f8e33)',
    img: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/474/827/datas/original.jpg',
    github: 'https://github.com/Gokulmg123/flappy',
  },
  {
    title: 'Personal diary app',
    desc: 'A simple and elegant personal diary app built with Flutter, allowing users to jot down their thoughts and memories in a secure and private environment.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    icon: '',
    gradient: 'linear-gradient(135deg, #10b98133, #00e5ff33)',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprp-KBkQQPtNFd_C_BgS89cl0jkDprZK4qpQ0ww4FdW0FCeyk41A6swTjXihTD88lvSAJUh2G5VpSVOnFXX8UkaA&s&ec=121630540',
    github: 'https://github.com/Gokulmg123/diaryapp',
  },
  
];

export default function Projects() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    const headerChildren = sectionRef.current?.querySelectorAll('.projects__header > *');

    // FIX 1: Set initial state explicitly before ScrollTrigger runs.
    // Using gsap.from() means if the trigger never fires the elements
    // stay invisible. Using gsap.set() + gsap.to() guarantees they are
    // always visible once the animation plays (or immediately on revert).
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
    gsap.set(headerChildren, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      // Header animation
      gsap.to(headerChildren, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Cards animation
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          // FIX 2: Trigger on the section, not the carousel wrapper.
          // The wrapper has overflow:hidden which can confuse ScrollTrigger's
          // position measurements and prevent the trigger from ever firing.
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, sectionRef);

    // FIX 3: Refresh ScrollTrigger after layout settles.
    // The carousel changes scroll width after render, causing stale measurements.
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount =
        window.innerWidth < 768 ? 300 : window.innerWidth < 1024 ? 400 : 500;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">

        <div className="projects__header-flex">
          <div className="projects__header">
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">
              <span className="gradient-text">Projects</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.8 }}>
              Things I’ve built — from AI-powered tools to full-stack applications with polished, user-focused interfaces.
            </p>
          </div>

          <div className="projects__nav">
            <button
              className="carousel-btn"
              onClick={() => scrollCarousel('left')}
              aria-label="Previous Project"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              className="carousel-btn"
              onClick={() => scrollCarousel('right')}
              aria-label="Next Project"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="projects__carousel-wrapper">
          <div className="projects__grid" ref={carouselRef}>
            {projects.map((project, idx) => (
              <div
                className="project-card"
                key={project.title}
                id={`project-card-${idx}`}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="project-card__header"
                  style={{ background: project.gradient }}
                >
                  {project.img && (
                    <img
                      src={project.img}
                      alt={project.title}
                      className="project-card__img"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <div className="project-card__header-overlay">
                    <div className="project-card__header-icon">{project.icon}</div>
                  </div>
                  <span className="project-card__number">0{idx + 1}</span>
                </div>

                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.desc}</p>

                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-card__links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                    >
                      <i className="fab fa-github" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}