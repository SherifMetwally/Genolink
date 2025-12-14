import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import OncoHematologyDetail from '@/components/OncoHematologyDetail';
import SampleRequirements from '@/components/SampleRequirements';
import WhyGenolink from '@/components/WhyGenolink';
import ForPhysicians from '@/components/ForPhysicians';
import ForPatients from '@/components/ForPatients';
import Partners from '@/components/Partners';
import Collaboration from '@/components/Collaboration';
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
      <OncoHematologyDetail />
      <SampleRequirements />
      <WhyGenolink />
      <ForPhysicians />
      <ForPatients />
      <Partners />
      <Collaboration />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

