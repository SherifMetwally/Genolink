'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaGlobeAmericas, FaMicroscope, FaTruck, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const reasons = [
  {
    id: 'regional-reach',
    icon: FaMapMarkerAlt,
    title: 'Egypt-based operations with regional reach',
    description: 'GCC + Middle East coverage',
  },
  {
    id: 'partnerships',
    icon: FaGlobeAmericas,
    title: 'Partnerships with leading global genomics laboratories',
    description: 'Access to world-class testing facilities',
  },
  {
    id: 'quality',
    icon: FaMicroscope,
    title: 'High analytical sensitivity and clinical-grade reporting',
    description: 'Accurate, actionable results you can trust',
  },
  {
    id: 'logistics',
    icon: FaTruck,
    title: 'End-to-end sample logistics across multiple countries',
    description: 'Seamless international sample coordination',
  },
  {
    id: 'support',
    icon: FaHeadset,
    title: 'Scientific support for physicians and tumor boards',
    description: 'Expert guidance for treatment decisions',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function WhyGenolink() {
  return (
    <section id="why-genolink" className="relative py-20 bg-lab-blue-dark overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/why-genolink-bg.png)`,
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
            <FaCheckCircle className="text-gold" />
            <span>Why Genolink</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Image and Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-gold/30 cursor-pointer transition-all duration-300 order-2 lg:order-1"
            >
              <Image
                src={getImagePath('sections/why-genolink.png')}
                alt="Why Choose Genolink for Genomic Testing"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={reason.id}
                    variants={cardVariants}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-start space-x-4 bg-lab-blue/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                        <Icon className="text-2xl text-gold" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 text-gold">{reason.title}</h3>
                      <p className="text-gray-300 text-sm">{reason.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

