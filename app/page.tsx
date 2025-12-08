import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import SampleRequirements from '@/components/SampleRequirements';
import WhyGenolink from '@/components/WhyGenolink';
import Partners from '@/components/Partners';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <SampleRequirements />
      <WhyGenolink />
      <Partners />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

