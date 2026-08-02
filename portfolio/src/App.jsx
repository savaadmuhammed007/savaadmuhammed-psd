import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
