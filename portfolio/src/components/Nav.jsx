import { useState } from 'react';
import s from './Nav.module.css';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={s.nav}>
      <div className={s.inner}>
        <a href="#top" className={s.logo}>
          Muhammed Savaad<span className={s.dot}>●</span>
        </a>

        <button
          className={s.toggle}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="nav-links" className={`${s.links} ${open ? s.open : ''}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={s.cta} onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
