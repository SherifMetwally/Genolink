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
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 gold-gradient"
          >
            GenoLink
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl font-light  mb-8 tracking-wider"
          >
            CREATING THE FUTURE
          </motion.p>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white">
              Bridging Global Genomics to the Middle East
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
              Empowering Precision Medicine Across the Middle East
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Genolink connects physicians and patients with world-class international genomic laboratories.
              We provide advanced, clinically validated genetic testing solutions that drive accurate diagnosis, 
              personalized treatment, and better patient outcomes.
            </p>
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

