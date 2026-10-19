import { useEffect, useState } from 'react';
import s from './Lightbox.module.css';

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const hasMultipleImages = Boolean(item?.images && item.images.length > 1);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when switching artwork
  useEffect(() => {
    setIsFlipped(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if ((e.key === ' ' || e.key === 'Enter') && hasMultipleImages) {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
        return;
      }
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext, hasMultipleImages]);

  if (!item) return null;

  return (
    <div
      className={s.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Artwork Preview"
    >
      {/* Floating minimal close button */}
      <button
        type="button"
        className={s.closeBtn}
        onClick={onClose}
        aria-label="Close preview"
      >
        ✕
      </button>

      {/* Navigation arrows */}
      {onPrev && (
        <button
          type="button"
          className={`${s.navBtn} ${s.prevBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous artwork"
        >
          ‹
        </button>
      )}

      {onNext && (
        <button
          type="button"
          className={`${s.navBtn} ${s.nextBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next artwork"
        >
          ›
        </button>
      )}

      {/* Main viewer content (click propagation stopped so clicking background closes) */}
      <div className={s.viewContent} onClick={(e) => e.stopPropagation()}>
        {hasMultipleImages ? (
          <div className={s.flipWrapper}>
            <div
              className={`${s.flipCard} ${isFlipped ? s.isFlipped : ''}`}
              onClick={() => setIsFlipped((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-label={`Double-sided flyer. Currently viewing ${isFlipped ? 'Side 2' : 'Side 1'}. Tap to flip.`}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
            >
              {/* Front Face (Side 1) */}
              <div className={s.cardFaceFront}>
                <img
                  src={item.images[0].url}
                  alt={item.images[0].title || 'Flyer Front'}
                  className={s.flyerImg}
                />
              </div>

              {/* Back Face (Side 2) */}
              <div className={s.cardFaceBack}>
                <img
                  src={item.images[1].url}
                  alt={item.images[1].title || 'Flyer Back'}
                  className={s.flyerImg}
                />
              </div>
            </div>

            {/* Clean minimal flip indicator pill */}
            <button
              type="button"
              className={s.flipPill}
              onClick={() => setIsFlipped((prev) => !prev)}
              aria-label="Flip between side 1 and side 2"
            >
              <span className={s.flipIcon}>↻</span>
              <span>{isFlipped ? 'Side 2 of 2' : 'Side 1 of 2'} &bull; Tap to flip</span>
            </button>
          </div>
        ) : (
          <div className={s.singleWrapper}>
            <img
              src={item.image}
              alt={item.title || 'Artwork preview'}
              className={s.singleImg}
            />
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={s.linkPill}
              >
                {item.linkText || 'Open Flipbook ↗'}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
