import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  
  const sectionRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending...");

  try {
    const response = await fetch("https://formspree.io/f/mwvalqqo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("Message sent successfully 🚀");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("Failed to send. Try again.");
    }
  } catch (error) {
    setStatus("Something went wrong.");
  }

  setTimeout(() => setStatus(""), 3000);
};

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Header text
      gsap.from(q('.section-label, .section-title'), {
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

      // Left Column (Cards)
      gsap.from(q('.contact__tagline'), {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__layout', start: 'top 80%' }
      });

      gsap.from(q('.contact-card'), {
        x: -40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__cards', start: 'top 80%' }
      });

      gsap.from(q('.contact__social'), {
        y: 20, opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.contact__socials', start: 'top 85%' }
      });

      // Right Column (Form)
      gsap.from(q('.contact__form-wrapper'), {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__layout', start: 'top 80%' }
      });

      // Massive Background Parallax Text
      gsap.to(q('.contact__bg-text'), {
        y: -150, // moves upward slowly while scrolling down into section
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Let's Connect</div>
        <h2 className="section-title" style={{ marginBottom: 72 }}>
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <div className="contact__layout">
          {/* Left: Info */}
          <div className="contact__info">
            <p className="contact__tagline">
              I'm always open to <strong>new opportunities</strong>, collaborations,
              or just a good conversation about <strong>technology</strong>.
            </p>

            <div className="contact__cards">
              <a
                href="mailto:gokulmg752@gmail.com"
                className="contact-card"
                id="contact-email-link"
              >
                <div className="contact-card__icon" style={{ color: '#0a66c2', borderColor: 'rgba(10,102,194,0.3)', background: 'rgba(10,102,194,0.08)' }}>
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <div className="contact-card__label">Email</div>
                  <div className="contact-card__value">gokulmg752@gmail.com</div>
                </div>
                <i className="fas fa-arrow-right contact-card__arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/gokul-m-g-838797362/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                id="contact-linkedin-link"
              >
                <div className="contact-card__icon" style={{ color: '#0a66c2', borderColor: 'rgba(10,102,194,0.3)', background: 'rgba(10,102,194,0.08)' }}>
                  <i className="fab fa-linkedin-in" />
                </div>
                <div>
                  <div className="contact-card__label">LinkedIn</div>
                  <div className="contact-card__value">https://www.linkedin.com/in/gokul-m-g-838797362/</div>
                </div>
                <i className="fas fa-arrow-right contact-card__arrow" />
              </a>

              <a
                href="https://github.com/Gokulmg123"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                id="contact-github-link"
              >
                <div className="contact-card__icon" style={{ color: '#0a66c2', borderColor: 'rgba(10,102,194,0.3)', background: 'rgba(10,102,194,0.08)' }}>
                  <i className="fab fa-github" />
                </div>
                <div>
                  <div className="contact-card__label">GitHub</div>
                  <div className="contact-card__value">github.com/Gokulmg123</div>
                </div>
                <i className="fas fa-arrow-right contact-card__arrow" />
              </a>
            </div>

            <div className="contact__socials">
              <a href="https://github.com/Gokulmg123" target="_blank" rel="noopener noreferrer" className="contact__social" aria-label="GitHub" id="social-github">
                <i className="fab fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/gokul-m-g-838797362/" target="_blank" rel="noopener noreferrer" className="contact__social" aria-label="LinkedIn" id="social-linkedin">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="mailto:gokulmg752@gmail.com" className="contact__social" aria-label="Email" id="social-email">
                <i className="fas fa-envelope" />
              </a>
              <a href="/Gokul_M G_Resume.pdf" target="_blank" rel="noopener noreferrer" className="contact__social" aria-label="Resume" id="social-resume">
                <i className="fas fa-file-pdf" />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrapper">
            <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className="form-input"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="form-submit" id="contact-submit-btn">
                <i className="fas fa-paper-plane" />
                {status || 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="contact__footer">
          <div className="contact__footer-text">
            Designed & Built with ❤️ by
          </div>
          <div className="contact__footer-brand">Gokul MG</div>
          <div className="contact__footer-text" style={{ marginTop: 8 }}>
            © 2025 · All rights reserved
          </div>
        </div>
      </div>

      {/* Big bg text */}
      <div className="contact__bg-text" aria-hidden="true">CONTACT</div>
    </section>
  );
}
