import { useReveal } from '../hooks/useReveal';
import s from './Work.module.css';

export default function Card({ project }) {
  const [ref, visible] = useReveal();

  return (
    <article
      ref={ref}
      className={`${s.card} ${visible ? s.visible : ''}`}
      style={{ '--card-color': project.color }}
    >
      <span className={s.index}>{project.index}</span>
      <div className={s.block} />
      <h3 className={s.cardTitle}>{project.title}</h3>
      <p className={s.cardMeta}>{project.meta}</p>
    </article>
  );
}
