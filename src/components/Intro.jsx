import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import "./Intro.css";

/* ─── Data ──────────────────────────────────────────────────── */
const NAME_CHARS   = "GOKUL MG".split("");
const TITLE_CHARS  = "PORTFOLIO  ·  2026".split("");

const QUOTES = [
  "Detected: Recruiter Mode — Optimizing experience...",
  "Warning: High caffeine levels detected in dev environment.",
  "Compiling 3+ years of questionable commits...",
  "sudo make_portfolio --impress=true",
  "Loading personality module... done.",
  "Scanning for bugs… none found (allegedly).",
  "Initializing creativity engine — please stand by.",
  "Runtime error: Too many side projects. Ignoring.",
];

const HUD_LEFT = [
  { label: "SYS.CHECK", val: null },
  { label: "CPU",  val: "98%" },
  { label: "RAM",  val: "16GB" },
  { label: "NET",  val: "ONLINE" },
  { label: "LOC",  val: "IN/KL" },
  { label: "VER",  val: "2.0.26" },
];

const HUD_RIGHT = [
  { label: "PROFILE", val: null },
  { label: "ROLE", val: "DEV" },
  { label: "EXP",  val: "3Y+" },
  { label: "MODE", val: "FULL" },
  { label: "TYPE", val: "AI+WEB" },
  { label: "RANK", val: "S-TIER" },
];

/* ─── Typewriter hook ───────────────────────────────────────── */
function useTypewriter(texts, speed = 42, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [qIdx, setQIdx]       = useState(0);
  const [phase, setPhase]     = useState("type"); // type | hold | erase

  useEffect(() => {
    let timeout;
    const current = texts[qIdx];
    if (phase === "type") {
      if (display.length < current.length) {
        timeout = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          speed
        );
      } else {
        timeout = setTimeout(() => setPhase("hold"), pause);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erase"), 300);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          speed / 2
        );
      } else {
        setQIdx((i) => (i + 1) % texts.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, qIdx, texts, speed, pause]);

  return display;
}

/* ─── Sparks ────────────────────────────────────────────────── */
function Sparks({ count = 18 }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left:   `${Math.random() * 100}%`,
      size:   `${1.5 + Math.random() * 2.5}px`,
      color:  Math.random() > 0.5 ? "var(--cyan)" : "var(--green)",
      delay:  `${Math.random() * 8}s`,
      dur:    `${6 + Math.random() * 8}s`,
    }))
  ).current;

  return (
    <div className="sparks" aria-hidden>
      {items.map((s) => (
        <span
          key={s.id}
          className="spark"
          style={{
            left:            s.left,
            bottom:          0,
            width:           s.size,
            height:          s.size,
            background:      s.color,
            boxShadow:       `0 0 6px ${s.color}`,
            animationDelay:  s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Loading bar ───────────────────────────────────────────── */
function LoadingBar({ progress }) {
  return (
    <div className="loader-section">
      <div className="loader-label">
        <span>INITIALIZING PROFILE</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="loader-track">
        <div className="loader-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

/* ─── Letter animation variants ────────────────────────────── */
const charVariants = {
  hidden: (i) => {
    const dirX = Math.random() > 0.5 ? 1 : -1;
    const dirY = Math.random() > 0.5 ? 1 : -1;
    return {
      x: dirX * (Math.random() * 300 + 100),
      y: dirY * (Math.random() * 300 + 100),
      opacity: 0,
      rotate: (Math.random() - 0.5) * 90,
      scale: 0.5,
      filter: "blur(20px)"
    };
  },
  visible: (i) => ({
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const subCharVariants = {
  hidden:  { y: 20, opacity: 0 },
  visible: (i) => ({
    y:       0,
    opacity: 1,
    transition: {
      delay:    0.8 + i * 0.04,
      duration: 0.4,
      ease:     "easeOut",
    },
  }),
};

const hudVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x:       0,
    transition: { delay: 1.2 + i * 0.1, duration: 0.4 },
  }),
};
const hudRVariants = {
  hidden:  { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x:       0,
    transition: { delay: 1.2 + i * 0.1, duration: 0.4 },
  }),
};

/* ─── Main component ────────────────────────────────────────── */
export default function Intro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [animate,  setAnimate]  = useState(false);
  const rootRef   = useRef(null);
  const quoteText = useTypewriter(QUOTES, 38, 2400);

  /* boot sequence */
  useEffect(() => {
    const t1 = setTimeout(() => setAnimate(true), 100);

    /* gsap progress bar */
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val:      100,
      duration: 3.8,
      ease:     "power2.inOut",
      delay:    0.4,
      onUpdate: () => setProgress(obj.val),
    });

    /* cyan glow pulse on root */
    const glow = gsap.to(rootRef.current, {
      boxShadow: "inset 0 0 120px rgba(0,245,255,0.06)",
      duration:  2,
      repeat:    -1,
      yoyo:      true,
      ease:      "sine.inOut",
    });

    return () => {
      clearTimeout(t1);
      tween.kill();
      glow.kill();
    };
  }, []);

  /* keydown skip/enter */
  useEffect(() => {
    const handleKeyDown = () => {
      if (progress >= 99.5) {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [progress, onComplete]);

  return (
    <motion.div 
      className="hero-root" 
      ref={rootRef}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* grid + scanlines */}
      <div className="hero-grid" aria-hidden />
      <Sparks />

      {/* corner brackets */}
      {["tl","tr","bl","br"].map((pos) => (
        <motion.div
          key={pos}
          className={`corner corner-${pos}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
          aria-hidden
        />
      ))}

      {/* top status */}
      <motion.div
        className="status-bar"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="status-dot" />
        IDENTITY VERIFIED
      </motion.div>

      {/* HUD left */}
      <div className="hud-left" aria-hidden>
        {HUD_LEFT.map((row, i) => (
          <motion.div
            key={row.label}
            className="hud-row"
            variants={hudVariants}
            custom={i}
            initial="hidden"
            animate="visible"
          >
            <span>{row.label}</span>
            {row.val && <span className="hud-val">{row.val}</span>}
          </motion.div>
        ))}
      </div>

      {/* HUD right */}
      <div className="hud-right" aria-hidden>
        {HUD_RIGHT.map((row, i) => (
          <motion.div
            key={row.label}
            className="hud-row"
            variants={hudRVariants}
            custom={i}
            initial="hidden"
            animate="visible"
          >
            {row.val && <span className="hud-val">{row.val}</span>}
            <span>{row.label}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Center ── */}
      <div className="hero-center">
        {/* Name — letter-by-letter */}
        <div className="name-block">
          <div className="name-line">
            {NAME_CHARS.map((ch, i) => (
              <motion.span
                key={i}
                className="char"
                variants={charVariants}
                custom={i}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>

          {/* subtitle */}
          <div className="subtitle-line">
            {TITLE_CHARS.map((ch, i) => (
              <motion.span
                key={i}
                className="sub-char"
                variants={subCharVariants}
                custom={i}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Quote box */}
        <motion.div
          className="quote-box"
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.5, ease: "backOut" }}
        >
          <p className="quote-text">
            {quoteText}
            <span className="quote-cursor" />
          </p>
        </motion.div>

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: progress >= 99.5 ? 1 : 0, y: progress >= 99.5 ? 0 : 16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={onComplete}
          style={{
            background:    "transparent",
            border:        "1px solid var(--cyan)",
            color:         "var(--cyan)",
            fontFamily:    "'Roboto Mono', monospace",
            fontSize:      "clamp(10px, 1.4vw, 13px)",
            letterSpacing: "0.35em",
            padding:       "10px 32px",
            cursor:        "pointer",
            textTransform: "uppercase",
            boxShadow:     "0 0 16px var(--glow-c)",
            transition:    "box-shadow 0.3s, background 0.3s",
            pointerEvents: progress >= 99.5 ? "auto" : "none",
          }}
          whileHover={{
            boxShadow:  "var(--glow-c)",
            background: "rgba(6, 182, 212, 0.07)",
          }}
          whileTap={{ scale: 0.96 }}
        >
          PRESS ANY KEY TO CONTINUE
        </motion.button>
      </div>

      {/* Loading bar */}
      <LoadingBar progress={progress} />

      {/* Bottom badge */}
      <motion.div
        className="online-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="badge-sq" />
        SYSTEM ONLINE
        <span className="badge-sq" />
      </motion.div>
    </motion.div>
  );
}