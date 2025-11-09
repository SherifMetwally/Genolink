'use client';

import { motion } from 'framer-motion';
import { FaHandshake, FaHospital, FaUniversity, FaEnvelope } from 'react-icons/fa';

export default function Collaboration() {
  return (
    <section id="collaboration" className="relative py-20 bg-lab-blue-dark overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/backgrounds/collaboration-bg.png)',
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

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-center text-gray-200 mb-12 leading-relaxed"
          >
            Genolink welcomes partnerships with healthcare providers, hospitals, and research institutions 
            interested in genomic testing and precision medicine programs.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-center text-gray-200 mb-8 leading-relaxed"
          >
            Our team supports every stage — from test selection and logistics to education and result interpretation.
          </motion.p>

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

