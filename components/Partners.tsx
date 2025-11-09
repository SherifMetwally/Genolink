'use client';

import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

const partners = [
  {
    name: 'Eurofins',
    description: 'Leading international genomic laboratory',
  },
  {
    name: 'Other Leading Partners',
    description: 'Global-standard molecular diagnostics',
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

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-center text-gray-200 mb-12 leading-relaxed"
          >
            We proudly represent and collaborate with globally recognized genomic laboratories, including:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border-2 border-gold/30 hover:border-gold transition-all duration-300 text-center"
              >
                <h3 className="text-3xl font-bold mb-4 text-gold">{partner.name}</h3>
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

