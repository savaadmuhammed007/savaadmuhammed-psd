import { useReveal } from '../hooks/useReveal';
import s from './Work.module.css';

export default function Card({ project }) {
  const [ref, visible] = useReveal();

  return (
    <article
      ref={ref}
      className={`${s.gridItem} ${visible ? s.visible : ''}`}
      style={{ '--card-color': project.color }}
    >
      {project.image ? (
        <img src={project.image} alt={project.title || 'Creative artwork'} className={s.image} loading="lazy" />
      ) : (
        <div className={s.placeholderBlock} />
      )}
    </article>
  );
}
