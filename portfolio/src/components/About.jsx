import { useReveal } from '../hooks/useReveal';
import s from './About.module.css';

const TAGS = [
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Adobe InDesign',
  'After Effects',
  'Typography',
  'Design Systems',
];

export default function About() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`${s.section} ${visible ? s.visible : ''}`} id="about">
      <div className={s.portrait} aria-hidden="true">
        <span>SD</span>
      </div>

      <div className={s.copy}>
        <h2>About</h2>
        <p>
          I create visual designs that feel sharp, modern, and easy to understand. My work
          brings together brand identity, UI layouts, posters, social media creatives, and
          typography-led compositions for digital and print use.
        </p>
        <p>
          I like building designs with strong hierarchy, balanced spacing, clean contrast,
          and a clear purpose, so every piece looks good and communicates the right message.
        </p>

        <ul className={s.tags}>
          {TAGS.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
