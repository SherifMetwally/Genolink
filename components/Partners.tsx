'use client';

import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const partners = [
  {
    name: 'Eurofins',
    description: 'Leading international genomic laboratory',
    logo: getImagePath('partners/2.png'),
  },
  {
    name: 'Dante Omics',
    description: 'Global-standard molecular diagnostics',
    logo: getImagePath('partners/1.png'),
  },
  {
    name: 'Other Leading Partners',
    description: 'Global-standard molecular diagnostics',
    logo: null,
  },
];

export default function Partners() {
  return (
    <section id="partners" className="relative py-20 bg-lab-blue overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/partners-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 white-gradient flex items-center justify-center gap-3">
            <FaGlobe className="text-gold" />
            <span>Our Partners</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-gold/30 mb-8 cursor-pointer transition-all duration-300"
            >
              <Image
                src={getImagePath('sections/partners.png')}
                alt="Our Partners - Global Genomic Laboratories"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-center text-gray-200 leading-relaxed"
            >
              We proudly represent and collaborate with globally recognized genomic laboratories, including:
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border-2 border-gold/30 hover:border-gold transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                {partner.logo ? (
                  <motion.div 
                    className={`relative w-full h-32 mb-4 group ${partner.name === 'Eurofins' ? 'bg-white rounded-lg p-4' : ''}`}
                    whileHover={{ 
                      scale: 1.15,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{
                        rotate: [0, -3, 3, -3, 0],
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                    >
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(112,153,60,0.6)]"
                        unoptimized
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <h3 className="text-3xl font-bold mb-4 text-gold">{partner.name}</h3>
                )}
                <p className="text-gray-200">{partner.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-200 mt-12 leading-relaxed"
          >
            These collaborations ensure every test meets international clinical standards with validated quality, 
            accuracy, and innovation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

