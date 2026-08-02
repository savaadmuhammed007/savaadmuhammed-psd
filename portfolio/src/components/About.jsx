import { useReveal } from '../hooks/useReveal';
import s from './About.module.css';

const TAGS = [
  'Figma',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Adobe InDesign',
  'After Effects',
  'Adobe XD',
  'Blender',
  'Canva',
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
          I specialize in creating bold visual identities, intuitive UI/UX designs, and striking typography systems.
          My focus is on bringing creative ideas to life using industry-standard design tools like Figma, Illustrator, Photoshop, and After Effects.
        </p>
        <p>
          Crafting digital interfaces, brand identity systems, poster graphics, and motion visuals that stand out with clarity, contrast, and high hierarchy.
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
