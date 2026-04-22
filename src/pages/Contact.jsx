import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  
  const sectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("https://formspree.io/f/mwvalqqo", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent 🚀");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else setStatus("Failed. Try again.");
    } catch (error) { setStatus("Error occurred."); }
    setTimeout(() => setStatus(""), 3000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // Reveal Form
      gsap.fromTo(q('.contact-card'), 
        { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      // Rolling Title Animation
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

      // Reveal Headline
      gsap.fromTo(q('.section-title'),
        { opacity: 0, y: 50, skewX: -10 },
        { 
          opacity: 1, y: 0, skewX: 0, 
          duration: 1.2, 
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.section-title'), start: 'top 85%' }
        }
      );

      // Hover re-trigger
      q('.rolling-letter-wrap').forEach(wrap => {
        wrap.addEventListener('mouseenter', () => rollSlot(wrap.querySelector('.emoji-slot')));
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="section-hud section-hud--top" />
      <div className="section-hud--corners" />
      <div className="container">
        <span className="tech-label">Get in touch</span>
        <h2 className="section-title">
          Let&apos;s Bu<span className="rolling-letter-wrap">
            <span className="rolling-letter">
              <div className="emoji-slot"><span>i</span><span>📧</span><span>🔹</span><span>📍</span></div>
            </span>
          </span>ld Something Great
        </h2>

        <div className="contact__layout">
          <div className="contact__info">
            <p className="contact__tagline">
              I&apos;m always open to new opportunities, collaborations, or just a good conversation about technology.
            </p>

            <div className="contact__cards">
              <a href="mailto:gokulmg752@gmail.com" className="contact-card">
                <i className="fas fa-envelope contact-card__icon" />
                <div>
                  <span className="contact-card__label">Email</span>
                  <div className="contact-card__value">gokulmg752@gmail.com</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/gokul-m-g-838797362/" target="_blank" rel="noopener noreferrer" className="contact-card">
                <i className="fab fa-linkedin-in contact-card__icon" />
                <div>
                  <span className="contact-card__label">LinkedIn</span>
                  <div className="contact-card__value">Connect on LinkedIn</div>
                </div>
              </a>
              <a href="https://github.com/Gokulmg123" target="_blank" rel="noopener noreferrer" className="contact-card">
                <i className="fab fa-github contact-card__icon" />
                <div>
                  <span className="contact-card__label">GitHub</span>
                  <div className="contact-card__value">Follow on GitHub</div>
                </div>
              </a>
            </div>
          </div>

          <div className="contact__form-wrapper">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input name="name" type="text" className="form-input" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-input" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea name="message" className="form-textarea" placeholder="How can I help you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
              </div>
              <button type="submit" className="form-submit">{status || 'Send Message'}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
