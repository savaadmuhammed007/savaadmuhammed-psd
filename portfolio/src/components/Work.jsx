import { useState } from 'react';
import { projects, socialMediaProjects, magazineProjects, flyerProjects } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import Card from './Card';
import Lightbox from './Lightbox';
import s from './Work.module.css';

export default function Work() {
  const [ref, visible] = useReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLightboxIndex, setSelectedLightboxIndex] = useState(null);

  const totalCount = projects.length;
  const socialCount = socialMediaProjects.length;
  const magazineCount = magazineProjects.length;
  const flyerCount = flyerProjects.length;

  const currentProjects =
    activeFilter === 'social'
      ? socialMediaProjects
      : activeFilter === 'magazine'
      ? magazineProjects
      : activeFilter === 'flyers'
      ? flyerProjects
      : projects;

  const handleOpenLightbox = (project) => {
    const idx = currentProjects.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      setSelectedLightboxIndex(idx);
    }
  };

  const handlePrevLightbox = () => {
    if (selectedLightboxIndex === null) return;
    setSelectedLightboxIndex((prev) => (prev > 0 ? prev - 1 : currentProjects.length - 1));
  };

  const handleNextLightbox = () => {
    if (selectedLightboxIndex === null) return;
    setSelectedLightboxIndex((prev) => (prev < currentProjects.length - 1 ? prev + 1 : 0));
  };

  const showSocial = activeFilter === 'all' || activeFilter === 'social';
  const showMagazine = activeFilter === 'all' || activeFilter === 'magazine';
  const showFlyers = activeFilter === 'all' || activeFilter === 'flyers';

  return (
    <section ref={ref} className={`${s.section} ${visible ? s.visible : ''}`} id="work">
      {/* Header with Title and Filter Tabs */}
      <div className={s.head}>
        <div className={s.titleGroup}>
          <span className={s.sectionTag}>PORTFOLIO</span>
          <h2>Selected Work</h2>
        </div>

        {/* Filter Navigation */}
        <div className={s.filterGroup} role="tablist" aria-label="Filter works by category">
          <button
            type="button"
            className={`${s.filterBtn} ${activeFilter === 'all' ? s.filterActive : ''}`}
            onClick={() => setActiveFilter('all')}
            role="tab"
            aria-selected={activeFilter === 'all'}
          >
            All Works <span className={s.filterCount}>{totalCount}</span>
          </button>
          <button
            type="button"
            className={`${s.filterBtn} ${activeFilter === 'social' ? s.filterActive : ''}`}
            onClick={() => setActiveFilter('social')}
            role="tab"
            aria-selected={activeFilter === 'social'}
          >
            Social Media Poster <span className={s.filterCount}>{socialCount}</span>
          </button>
          <button
            type="button"
            className={`${s.filterBtn} ${activeFilter === 'magazine' ? s.filterActive : ''}`}
            onClick={() => setActiveFilter('magazine')}
            role="tab"
            aria-selected={activeFilter === 'magazine'}
          >
            Magazine Work <span className={s.filterCount}>{magazineCount}</span>
          </button>
          <button
            type="button"
            className={`${s.filterBtn} ${activeFilter === 'flyers' ? s.filterActive : ''}`}
            onClick={() => setActiveFilter('flyers')}
            role="tab"
            aria-selected={activeFilter === 'flyers'}
          >
            Flyers & Print Works <span className={s.filterCount}>{flyerCount}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Social Media Poster */}
      {showSocial && (
        <div className={s.categorySection}>
          <div className={s.categoryHead}>
            <div className={s.categoryTitleWrap}>
              <span className={s.categoryNum}>01</span>
              <h3 className={s.categoryTitle}>Social Media Poster</h3>
            </div>
          </div>

          <div className={s.grid}>
            {socialMediaProjects.map((project) => (
              <Card
                key={project.id}
                project={project}
                onSelectImage={handleOpenLightbox}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Magazine Work */}
      {showMagazine && (
        <div className={`${s.categorySection} ${s.magazineCategorySection}`}>
          <div className={s.categoryHead}>
            <div className={s.categoryTitleWrap}>
              <span className={s.categoryNum}>02</span>
              <h3 className={s.categoryTitle}>Magazine Work</h3>
            </div>
          </div>

          <div className={s.magazineGrid}>
            {magazineProjects.map((project) => (
              <Card
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Flyers & Print Works */}
      {showFlyers && (
        <div className={`${s.categorySection} ${s.flyerCategorySection}`}>
          <div className={s.categoryHead}>
            <div className={s.categoryTitleWrap}>
              <span className={s.categoryNum}>03</span>
              <h3 className={s.categoryTitle}>Flyers & Print Works</h3>
            </div>
          </div>

          <div className={s.flyerGrid}>
            {flyerProjects.map((project) => (
              <Card
                key={project.id}
                project={project}
                onSelectImage={handleOpenLightbox}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox for full-size inspection */}
      {selectedLightboxIndex !== null && (
        <Lightbox
          item={currentProjects[selectedLightboxIndex]}
          onClose={() => setSelectedLightboxIndex(null)}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}
    </section>
  );
}
