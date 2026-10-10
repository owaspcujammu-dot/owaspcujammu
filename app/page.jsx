import About from '@/components/About';
import Activities from '@/components/Activities';
import Contact from '@/components/Contact';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Join from '@/components/Join';
import Mission from '@/components/Mission';
import Navbar from '@/components/Navbar';
import Team from '@/components/Team';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Activities />
        <Mission />
        <Events />
        <Team />
        <Join />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
