'use client';

import { motion } from 'framer-motion';
import { FaGlobe, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

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
          {/* Introduction Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-lab-blue-dark/40 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-gold/20">
              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                  Genolink collaborates with internationally accredited American and European laboratories to deliver clinically reliable genomic diagnostics in oncology and onco-hematology.
                </p>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                  Selected partners include Dante Omics and members of the Eurofins Group, enabling access to advanced genomic technologies, validated testing workflows, and high-quality clinical reporting.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-gold/20">
              <Image
                src={getImagePath('sections/partners.png')}
                alt="Our Partners - Global Genomic Laboratories"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Compliance Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gold/5 border-l-4 border-gold rounded-r-lg p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-gold text-2xl mt-1 flex-shrink-0" />
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                All testing is performed in compliance with international quality, accreditation, and confidentiality standards.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

