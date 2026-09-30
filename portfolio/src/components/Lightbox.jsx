import { useEffect } from 'react';
import s from './Lightbox.module.css';

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className={s.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Artwork Preview"
    >
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        {/* Header bar */}
        <div className={s.topBar}>
          <span className={s.badge}>PREVIEW</span>
          <button
            type="button"
            className={s.closeBtn}
            onClick={onClose}
            aria-label="Close preview"
          >
            ✕ [ESC]
          </button>
        </div>

        {/* Image preview */}
        <div className={s.mediaWrapper}>
          <img
            src={item.image}
            alt="Artwork preview"
            className={s.mediaImage}
          />

          {onPrev && (
            <button
              type="button"
              className={`${s.navBtn} ${s.prevBtn}`}
              onClick={onPrev}
              aria-label="Previous artwork"
            >
              &larr;
            </button>
          )}

          {onNext && (
            <button
              type="button"
              className={`${s.navBtn} ${s.nextBtn}`}
              onClick={onNext}
              aria-label="Next artwork"
            >
              &rarr;
            </button>
          )}
        </div>

        {/* Footer if external link exists */}
        {item.link && (
          <div className={s.bottomBar}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={s.externalBtn}
            >
              Open Flipbook ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
