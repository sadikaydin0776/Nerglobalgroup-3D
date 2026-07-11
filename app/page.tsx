import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { About } from '@/components/About';
import { WhyUs } from '@/components/WhyUs';
import { Marquee as MarqueeReverse } from '@/components/Marquee';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Process />
      <About />
      <WhyUs />
      <MarqueeReverse reverse />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
