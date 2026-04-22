import './App.css';
import './pages/PageStyles.css';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SideNav from './components/SideNav';
import ThemeToggle from './components/ThemeToggle';
import AnimatedLines from './components/AnimatedLines';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';

// GSAP & Smooth Scroll
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function PortfolioApp() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // 🔧 Optimize ScrollTrigger for mobile
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // 🚀 Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false, // ❗ keep false for better mobile performance
      direction: 'vertical',
      gestureDirection: 'vertical',
      mouseMultiplier: 1,
      touchMultiplier: isMobile ? 1.2 : 2,
      infinite: false,
    });

    // Sync Lenis with GSAP
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.fps(60);

    // ✨ Global Big Text Reveal Animations
    const bigTexts = document.querySelectorAll('.section-title, .hero__title');
    bigTexts.forEach((el) => {
      // Skip if it has rolling letter wrap to avoid double animation/conflict
      if (el.querySelector('.rolling-letter-wrap')) return;

      const targets = el.children.length > 0 ? el.children : [el];
      
      gsap.fromTo(targets, 
        { y: 100, opacity: 0, skewY: 7, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          skewY: 0,
          scale: 1,
          duration: 1.6, 
          stagger: 0.15, 
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'restart none none reverse', // Re-triggers on scroll up/down
          }
        }
      );
    });

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div className="app">
      {/* Global UI */}
      <AnimatedLines />
      <SideNav />
      <ThemeToggle />

      {/* Main Sections */}
      <main id="smooth-wrapper">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}