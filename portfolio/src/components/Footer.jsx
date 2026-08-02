import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p>© {new Date().getFullYear()} Muhammed Savaad. Graphic designer and visual creator.</p>
      <a href="#top" className={s.top}>
        Back to top &uarr;
      </a>
    </footer>
  );
}
