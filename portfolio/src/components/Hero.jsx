import { useState, useEffect, useRef, useCallback } from 'react';
import s from './Hero.module.css';

const ROTATING_WORDS = ['CREATIVES', 'WEBSITES', 'LAYOUTS', 'DESIGNS'];
const LINE_2 = 'THAT LOOK LOUD';
const LINE_3 = 'AND WORK WELL';
const INTERACTION_RADIUS = 120;
const MAX_DISPLACEMENT = 14;

function InteractiveLetter({ char, mouse, titleRect }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!ref.current || !mouse || !titleRect) {
      setStyle({});
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - mouse.x;
    const dy = cy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < INTERACTION_RADIUS) {
      const force = 1 - dist / INTERACTION_RADIUS;
      const eased = force * force;
      const angle = Math.atan2(dy, dx);
      const tx = Math.cos(angle) * eased * MAX_DISPLACEMENT;
      const ty = Math.sin(angle) * eased * MAX_DISPLACEMENT;
      const rotate = (dx > 0 ? 1 : -1) * eased * 8;
      const scale = 1 + eased * 0.12;

      setStyle({
        transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`,
        color: eased > 0.5 ? 'var(--orange)' : undefined,
        transition: 'transform 0.08s ease-out, color 0.2s ease',
      });
    } else {
      setStyle({
        transform: 'translate(0, 0) rotate(0deg) scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.3s ease',
      });
    }
  }, [mouse, titleRect]);

  if (char === ' ') {
    return <span className={s.letter}>&nbsp;</span>;
  }

  return (
    <span ref={ref} className={s.letter} style={style}>
      {char}
    </span>
  );
}

function InteractiveLine({ text, mouse, titleRect, className, dataText }) {
  const chars = text.split('');
  return (
    <span data-text={dataText || text} className={className}>
      {chars.map((char, i) => (
        <InteractiveLetter
          key={`${char}-${i}`}
          char={char}
          mouse={mouse}
          titleRect={titleRect}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mouse, setMouse] = useState(null);
  const [titleRect, setTitleRect] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsFading(false);
      }, 180);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMouse({ x: e.clientX, y: e.clientY });
    if (titleRef.current) {
      setTitleRect(titleRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse(null);
  }, []);

  const currentWord = ROTATING_WORDS[wordIdx];
  const line1Text = `I MAKE ${currentWord}`;

  return (
    <section className={s.hero} id="top">
      <div className={s.inner}>
        <p className={s.eyebrow}>GRAPHIC DESIGN</p>

        <h1
          ref={titleRef}
          className={s.title}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Line 1 */}
          <span
            key={line1Text}
            data-text={line1Text}
            className={`risoText ${s.line}`}
          >
            {'I MAKE '.split('').map((char, i) => (
              <InteractiveLetter
                key={`static-${i}`}
                char={char}
                mouse={mouse}
                titleRect={titleRect}
              />
            ))}
            <span className={`${s.wordAccent} ${isFading ? s.wordOut : s.wordIn}`}>
              {currentWord.split('').map((char, i) => (
                <InteractiveLetter
                  key={`word-${currentWord}-${i}`}
                  char={char}
                  mouse={mouse}
                  titleRect={titleRect}
                />
              ))}
            </span>
          </span>

          {/* Line 2 */}
          <InteractiveLine
            text={LINE_2}
            mouse={mouse}
            titleRect={titleRect}
            className={`risoText ${s.line}`}
          />

          {/* Line 3 */}
          <InteractiveLine
            text={LINE_3}
            mouse={mouse}
            titleRect={titleRect}
            className={`risoText risoTextAlt ${s.line}`}
          />
        </h1>

        <div className={s.meta}>
          <p className={s.sub}>
            I&rsquo;m Muhammed Savaad, a graphic designer focused on bold brand visuals,
            clean digital interfaces, social media creatives, posters, and layout systems
            that communicate clearly and leave a strong impression.
          </p>

          <a href="#work" className={s.stamp}>
            <svg className={s.ring} viewBox="0 0 120 120" aria-hidden="true">
              <path id="stampCircle" d="M60,10 a50,50 0 1,1 -0.1,0" fill="none" />
              <text
                fontSize="9.2"
                letterSpacing="2"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
              >
                <textPath href="#stampCircle" startOffset="0%">
                  AVAILABLE FOR WORK / SCROLL TO VIEW /{' '}
                </textPath>
              </text>
            </svg>
            <span className={s.center}>&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
