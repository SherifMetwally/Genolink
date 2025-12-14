'use client';

import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { smoothScrollTo, getImagePath } from '@/lib/utils';
import HeroCarousel from './HeroCarousel';

// Add your carousel images here - place them in public/carousel/ folder
// Example: ['/carousel/image1.jpg', '/carousel/image2.jpg', '/carousel/image3.jpg']
const carouselImages = [
  getImagePath('carousel/hero1.png'),
  getImagePath('carousel/hero2.png'),
  getImagePath('carousel/hero3.png'),
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-lab-blue">
      {/* Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        <HeroCarousel images={carouselImages} autoPlayInterval={5000} />
      </div>

      {/* Animated Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(2, 80, 152, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content Overlay with backdrop for better text readability and logo contrast */}
      <div className="absolute inset-0 bg-lab-blue/45 backdrop-blur-[2px] z-[1]" />
      
      {/* Content Overlay */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
          >
            Precision Oncology & Onco-Hematology Diagnostics Across Egypt, Libya, North Africa, GCC & the Middle East.
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
              Genolink is a leading Egypt-based precision diagnostics company specializing in Oncology and Onco-Hematology genomics. We partner with world-class accredited laboratories to deliver advanced cancer testing solutions across Egypt, Libya, North Africa, GCC & the Middle East.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScrollTo('contact')}
                className="px-8 py-4 bg-gold hover:bg-gold-light text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                Submit a Sample
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScrollTo('contact')}
                className="px-8 py-4 bg-transparent border-2 border-gold hover:bg-gold/20 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Contact Our Team
              </motion.button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <motion.button
              onClick={() => smoothScrollTo('about')}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gold hover:text-gold cursor-pointer group text-white"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <HiChevronDown className="text-3xl group-hover:scale-110 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

