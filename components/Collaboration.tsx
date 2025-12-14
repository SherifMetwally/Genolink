'use client';

import { motion } from 'framer-motion';
import { FaHandshake, FaHospital, FaUniversity, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

export default function Collaboration() {
  return (
    <section id="collaboration" className="relative py-20 bg-lab-blue-dark overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/collaboration-bg.png)`,
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
            <FaHandshake className="text-gold" />
            <span>Collaboration & Partnerships</span>
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
              className="order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed"
              >
                Genolink welcomes partnerships with healthcare providers, hospitals, and research institutions seeking to advance oncology and precision genomic diagnostics.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-200 leading-relaxed"
              >
                Our team supports every stage — from test selection and logistics to education and result interpretation.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-gold/30 order-2 cursor-pointer transition-all duration-300"
            >
              <Image
                src={getImagePath('sections/collaboration.png')}
                alt="Collaboration & Partnerships"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gold/10 border-2 border-gold rounded-lg p-8 text-center"
          >
            <FaEnvelope className="text-5xl text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gold mb-4">For Partnership Inquiries:</h3>
            <a
              href="mailto:collaborate@genolink.com"
              className="text-xl text-gold hover:text-gold underline transition-colors"
            >
              📧 collaborate@genolink.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

