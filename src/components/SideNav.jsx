import { useState, useEffect } from 'react';
import './SideNav.css';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function SideNav() {
  const [active, setActive] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <nav className="side-nav" aria-label="Page sections">
        {navItems.map((item, idx) => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
            {idx !== 0 && <div className="side-nav__line" />}
            <button
              className={`side-nav__dot ${active === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="side-nav__label">{item.label}</span>
            </button>
          </div>
        ))}
      </nav>
    </>
  );
}
