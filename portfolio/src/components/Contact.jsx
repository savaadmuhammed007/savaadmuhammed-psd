import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import s from './Contact.module.css';

const SOCIALS = ['Instagram', 'Behance', 'Dribbble', 'LinkedIn'];

// Contact form submission logic
export default function Contact() {
  const [ref, visible] = useReveal();
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    if (!data.name || !data.email || !data.message) {
      setStatus({ state: 'err', message: 'Fill in every field before sending.' });
      return;
    }

    setStatus({ state: 'sending', message: 'Sending…' });

    try {
      // const res = await fetch('/api/contact/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!res.ok) throw new Error('Request failed');

      await new Promise((resolve) => setTimeout(resolve, 500)); // fake latency

      setStatus({ state: 'ok', message: "Message received — I'll get back to you soon." });
      e.target.reset();
    } catch {
      setStatus({ state: 'err', message: 'Something went wrong. Try emailing directly instead.' });
    }
  }

  return (
    <section ref={ref} className={`${s.section} ${visible ? s.visible : ''}`} id="contact">
      <div className={s.head}>
        <h2>Let&rsquo;s talk</h2>
        <p className={s.note}>
          Have a project, a brand, or an idea half-sketched on paper? Send it over.
        </p>
      </div>

      <a href="mailto:savaadmuhammed.psd@gmail.com" className={s.email}>
        savaadmuhammed.psd@gmail.com
      </a>

      <div className={s.body}>
        <form className={s.form} onSubmit={handleSubmit} noValidate>
          <label className={s.field}>
            <span>Name</span>
            <input type="text" name="name" required />
          </label>
          <label className={s.field}>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label className={s.field}>
            <span>Message</span>
            <textarea name="message" rows="4" required />
          </label>

          <button type="submit" className={s.btn} disabled={status.state === 'sending'}>
            Send message →
          </button>

          <p
            className={`${s.status} ${status.state === 'ok' ? s.ok : ''} ${status.state === 'err' ? s.errText : ''
              }`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>

        <div className={s.socials}>
          <span className={s.socialsLabel}>Find me</span>
          {SOCIALS.map((name) => (
            <a key={name} href="#" target="_blank" rel="noopener noreferrer">
              {name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
