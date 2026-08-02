import s from './Marquee.module.css';

const ITEMS = ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Print Design', 'Social Media Designs', 'Poster Design', 'layout Design', 'Web Development'];
// duplicated so the CSS loop (-50%) is seamless
const TRACK = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className={s.marquee} aria-hidden="true">
      <div className={s.track}>
        {TRACK.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
