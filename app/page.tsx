import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { SectionDivider } from '@/components/SectionDivider';
import { Process } from '@/components/Process';
import { About } from '@/components/About';
import { WhyUs } from '@/components/WhyUs';
import { Marquee as MarqueeReverse } from '@/components/Marquee';
import { Faq } from '@/components/Faq';
import { CTABanner } from '@/components/CTABanner';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <SectionDivider fromColor="#04090F" toColor="#04090F" />
      <Services />
      <SectionDivider fromColor="#04090F" toColor="#07111F" />
      <Process />
      <SectionDivider fromColor="#07111F" toColor="#04090F" flip />
      <About />
      <SectionDivider fromColor="#04090F" toColor="#07111F" />
      <WhyUs />
      <SectionDivider fromColor="#07111F" toColor="#04090F" flip />
      <MarqueeReverse reverse />
      <Faq />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
