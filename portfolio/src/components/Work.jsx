import { projects } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import Card from './Card';
import s from './Work.module.css';

export default function Work() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`${s.section} ${visible ? s.visible : ''}`} id="work">
      <div className={s.head}>
        <h2>Selected Work</h2>
        {/* <p className={s.note}>
          Six placeholders below — swap the titles, tags and colour blocks for your own
          projects and images.
        </p> */}
      </div>

      <div className={s.grid}>
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
