import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { WhyUs } from '@/components/WhyUs';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <WhyUs />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
