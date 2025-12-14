'use client';

import { motion } from 'framer-motion';
import { FaStethoscope, FaDna, FaVial, FaFileAlt, FaMicroscope, FaClipboardCheck, FaUsers, FaShippingFast } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const benefits = [
  {
    icon: FaDna,
    text: 'Comprehensive genomic testing across solid tumors and hematologic malignancies',
  },
  {
    icon: FaVial,
    text: 'Tissue-based and liquid biopsy testing options',
  },
  {
    icon: FaFileAlt,
    text: 'High-quality, clinical-grade reports with clear interpretation',
  },
  {
    icon: FaMicroscope,
    text: 'Access to advanced biomarkers, including HRD, TMB, MSI, PD-L1, and HER2',
  },
  {
    icon: FaClipboardCheck,
    text: 'Integrated pathology and molecular diagnostics support',
  },
  {
    icon: FaUsers,
    text: 'Scientific support for case discussion and tumor boards',
  },
  {
    icon: FaShippingFast,
    text: 'End-to-end sample coordination and logistics',
  },
];

export default function ForPhysicians() {
  return (
    <section id="physicians" className="relative py-20 bg-lab-blue overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/for-physicians-bg.png)`,
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
            <FaStethoscope className="text-gold" />
            <span>For Physicians</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-gold/30 order-2 lg:order-1 cursor-pointer transition-all duration-300"
            >
              <Image
                src={getImagePath('sections/for-physicians.png')}
                alt="For Physicians - Partner with GenoLink"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
              Genolink partners with physicians to deliver accurate, clinically actionable genomic insights that support confident diagnostic and treatment decisions in oncology and onco-hematology.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">What we offer:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                          <Icon className="text-gold text-sm" />
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-200">{benefit.text}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

