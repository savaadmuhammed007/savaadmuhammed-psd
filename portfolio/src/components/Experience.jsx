import { useReveal } from '../hooks/useReveal';
import s from './Experience.module.css';

const EXPERIENCES = [
  {
    period: 'July 2025 - Present',
    title: 'Graphic Designer',
    company: 'Nuvana.go',
  },
  {
    period: 'May 2025 - July 2025',
    title: 'Graphic Designer',
    company: 'Life Science Academy',
  },
  // {
  //   period: 'Ongoing',
  //   title: 'Creative Tools & Production',
  //   company: 'Personal Design Practice',
  // },
];

export default function Experience() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`${s.section} ${visible ? s.visible : ''}`} id="experience">
      <div className={s.head}>
        <h2>Experience</h2>
        <p>
          A practical mix of branding, digital design, layout, and creative production
          built through real projects and continuous design practice.
        </p>
      </div>

      <div className={s.list}>
        {EXPERIENCES.map((item, index) => (
          <article className={s.item} key={item.title}>
            <span className={s.number}>{String(index + 1).padStart(2, '0')}</span>
            <div className={s.content}>
              <p className={s.period}>{item.period}</p>
              <h3>{item.title}</h3>
              <p className={s.company}>{item.company}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
