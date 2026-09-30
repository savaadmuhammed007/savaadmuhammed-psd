import { useReveal } from '../hooks/useReveal';
import s from './Work.module.css';

export default function Card({ project, onSelectImage }) {
  const [ref, visible] = useReveal();
  const isLink = Boolean(project.link);

  const handleClick = (e) => {
    if (isLink) return;
    if (onSelectImage && project.image) {
      e.preventDefault();
      onSelectImage(project);
    }
  };

  const CardTag = isLink ? 'a' : 'article';
  const customProps = isLink
    ? {
        href: project.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${project.title || 'Magazine Work'} - View interactive flipbook (opens in new tab)`,
      }
    : {
        onClick: handleClick,
        role: onSelectImage ? 'button' : undefined,
        tabIndex: onSelectImage ? 0 : undefined,
        'aria-label': project.title || 'Creative artwork',
        onKeyDown: (e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onSelectImage) {
            e.preventDefault();
            onSelectImage(project);
          }
        },
      };

  return (
    <CardTag
      ref={ref}
      className={`${s.gridItem} ${isLink ? s.linkedItem : ''} ${visible ? s.visible : ''}`}
      style={{ '--card-color': project.color }}
      {...customProps}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title || 'Creative artwork'}
          className={s.image}
          loading="lazy"
        />
      ) : (
        <div className={s.placeholderBlock} />
      )}

      {/* Floating badge for magazine flipbook link */}
      {isLink && (
        <div className={s.magazineBadge}>
          <span>READ FLIPBOOK ↗</span>
        </div>
      )}
    </CardTag>
  );
}
