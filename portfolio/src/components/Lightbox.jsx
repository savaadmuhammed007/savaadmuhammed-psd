import { useEffect, useRef, useState } from 'react';
import s from './Lightbox.module.css';

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const hasMultipleImages = Boolean(item?.images && item.images.length > 1);
  const [isFlipped, setIsFlipped] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

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

    // Prevent background scrolling cleanly without causing shifts or horizontal jumps
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [onClose, onPrev, onNext, hasMultipleImages]);

  // Mobile swipe navigation handler
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect intentional horizontal swipe (>40px and more horizontal than vertical)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0 && onNext) {
        onNext(); // swipe left -> next artwork
      } else if (deltaX > 0 && onPrev) {
        onPrev(); // swipe right -> previous artwork
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!item) return null;

  return (
    <div
      className={s.backdrop}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
