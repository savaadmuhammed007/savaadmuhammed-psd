import { useState, useEffect } from 'react';
import s from './Hero.module.css';

const ROTATING_WORDS = ['CREATIVES', 'WEBSITES', 'LAYOUTS', 'DESIGNS'];
const LINE_2 = 'THAT LOOK LOUD';
const LINE_3 = 'AND WORK WELL';

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Trigger staggered entrance after mount
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

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

  const currentWord = ROTATING_WORDS[wordIdx];
  const line1Text = `I MAKE ${currentWord}`;

  return (
    <section className={s.hero} id="top">
      <div className={s.inner}>
        <p className={`${s.eyebrow} ${entered ? s.entered : ''}`}>GRAPHIC DESIGN</p>

        <h1 className={`${s.title} ${entered ? s.entered : ''}`}>
          {/* Line 1 */}
          <span
            key={line1Text}
            data-text={line1Text}
            className={`risoText ${s.line} ${s.line1}`}
          >
            I MAKE{' '}
            <span className={`${s.wordAccent} ${isFading ? s.wordOut : s.wordIn}`}>
              {currentWord}
            </span>
          </span>

          {/* Line 2 */}
          <span data-text={LINE_2} className={`risoText ${s.line} ${s.line2}`}>
            {LINE_2}
          </span>

          {/* Line 3 */}
          <span data-text={LINE_3} className={`risoText risoTextAlt ${s.line} ${s.line3}`}>
            {LINE_3}
          </span>
        </h1>

        <div className={`${s.meta} ${entered ? s.entered : ''}`}>
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
