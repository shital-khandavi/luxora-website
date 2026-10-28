import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Customizer from '@/components/Customizer';
import Collection from '@/components/Collection';
import Details from '@/components/Details';
import Craftsmanship from '@/components/Craftsmanship';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SignupPopup from '@/components/SignupPopup';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <div className="relative min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Customizer />
        <Collection />
        <Details />
        <Craftsmanship />
        <About />
        <Contact />
      </main>
      <Footer />
      <SignupPopup />
    </div>
  );
}
