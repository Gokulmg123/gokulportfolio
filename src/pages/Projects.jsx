import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Jarvis AI Assistant',
    desc: 'A next-generation voice & gesture-controlled AI assistant built with Python, MediaPipe and Gemini AI. Features real-time hand gesture recognition to control YouTube, intelligent voice commands, and a custom-built GUI.',
    tags: ['Python', 'MediaPipe', 'Gemini AI', 'OpenCV'],
    img: 'https://cdn.mos.cms.futurecdn.net/VFLt5vHV7aCoLrLGjP9Qwm-1920-80.jpg',
    github: 'https://github.com/Gokulmg123/updatedjarvis',
  },
  {
    title: 'Smart Student Monitoring',
    desc: 'A comprehensive academic monitoring system designed to streamline tracking and management of student academic performance. Provides educators with powerful tools to monitor progress.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    img:'/Screenshot 2026-01-26 172453.png',
    github: 'https://github.com/Gokulmg123/studentprogressmonitor',
  },
  {
    title: 'Quotation Builder',
    desc: 'A responsive Flutter application to simplify creating professional product or service quotations. Features real-time calculations for discounts, tax, and totals.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODlA9Em6JXtp9seDdLK_uKyy4ooqApHXXlg&s',
    github: 'https://github.com/Gokulmg123/Smart-Product-Quotation-Builder',
  },
  {
    title: 'Lyrico Music Player',
    desc: 'A feature-rich music player built with Flutter and Firebase, offering a stunning UI and an immersive listening experience.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    img: 'https://cdn.dribbble.com/userupload/42532948/file/original-97b5e8ce1a5f66a8025ec8c06a2f564c.png?format=webp&resize=400x300&vertical=center',
    github: 'https://github.com/Gokulmg123/music-player',
  },
  {
    title: 'Portfolio Website',
    desc: 'This futuristic portfolio — crafted with React, and a custom dark aesthetic design system with GSAP animations.',
    tags: ['React', 'CSS3', 'GSAP'],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUWQ09qEZe7tquSlCHdu7NciKA_v3-lPHIMw&s',
    github: 'https://github.com/Gokulmg123/portfolio',
  },
  {
    title: 'Flappy Bird Clone',
    desc: 'A fun and challenging Flappy Bird game built with Flutter and Flame, featuring smooth gameplay and vibrant graphics.',
    tags: ['Flutter', 'Dart', 'Flame'],
    img: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/474/827/datas/original.jpg',
    github: 'https://github.com/Gokulmg123/flappy',
  },
  {
    title: 'Personal diary app ',
    desc: 'A simple and elegant personal diary app built with Flutter, allowing users to jot down their thoughts and memories in a secure and private environment.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprp-KBkQQPtNFd_C_BgS89cl0jkDprZK4qpQ0ww4FdW0FCeyk41A6swTjXihTD88lvSAJUh2G5VpSVOnFXX8UkaA&s&ec=121630540',
    github: 'https://github.com/Gokulmg123/diaryapp',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);
    
    gsap.fromTo(q('.project-card'), 
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 450;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects__header-flex">
          <div>
            <span className="tech-label">My Works</span>
            <h2 className="section-title">Latest <span className="gradient-text">Projects</span></h2>
          </div>

          <div className="projects__nav">
            <button className="carousel-btn" onClick={() => scrollCarousel('left')} aria-label="Previous">
              <i className="fas fa-chevron-left" />
            </button>
            <button className="carousel-btn" onClick={() => scrollCarousel('right')} aria-label="Next">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="projects__carousel-wrapper">
          <div className="projects__grid" ref={carouselRef}>
            {projects.map((project, idx) => (
              <div className="project-card" key={idx}>
                <div className="project-card__header">
                  <img src={project.img} alt={project.title} className="project-card__img" />
                  <div className="project-card__overlay" />
                </div>

                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.desc}</p>

                  <div className="project-card__tags">
                    {project.tags.map(tag => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-card__links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                      <i className="fab fa-github" /> Source
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