'use client';

import { motion } from 'framer-motion';
import { FaHandshake, FaHospital, FaUniversity, FaEnvelope, FaArrowRight } from 'react-icons/fa';
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

          {/* Ready to Collaborate Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="bg-gold/10 border-2 border-gold rounded-xl p-8 md:p-10">
              {/* Header */}
              <h3 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
                Ready to Collaborate?
              </h3>

              {/* Introduction */}
              <div className="text-center mb-8">
                <h4 className="text-xl md:text-2xl font-semibold text-gold mb-4">
                  Interested in partnering with Genolink?
                </h4>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  Let&apos;s work together to expand access to high-quality genomic diagnostics.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gold/30 my-8"></div>

              {/* Hospitals & Healthcare Institutions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaHospital className="text-2xl text-gold" />
                  <h4 className="text-xl md:text-2xl font-bold text-gold">
                    For Hospitals & Healthcare Institutions
                  </h4>
                </div>
                <p className="text-lg text-gray-200 mb-4 leading-relaxed">
                  Contact our team to discuss diagnostic collaboration and partnership models.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.a
                    href="mailto:info@geno-link.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gold/20 text-gold px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gold/30 transition-colors border border-gold/30"
                  >
                    Request a Meeting
                    <FaArrowRight />
                  </motion.a>
                  <a
                    href="mailto:info@geno-link.com"
                    className="flex items-center gap-2 text-lg text-gray-200 hover:text-gold transition-colors"
                  >
                    <FaEnvelope className="text-gold" />
                    <span>info@geno-link.com</span>
                  </a>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gold/30 my-8"></div>

              {/* General Partnership Inquiries */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaHandshake className="text-2xl text-gold" />
                  <h4 className="text-xl md:text-2xl font-bold text-gold">
                    General Partnership Inquiries
                  </h4>
                </div>
                <p className="text-lg text-gray-200 mb-4 leading-relaxed">
                  For laboratories, companies, and other collaboration opportunities.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.a
                    href="mailto:customer.service@geno-link.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gold/20 text-gold px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gold/30 transition-colors border border-gold/30"
                  >
                    Contact Us
                    <FaArrowRight />
                  </motion.a>
                  <a
                    href="mailto:customer.service@geno-link.com"
                    className="flex items-center gap-2 text-lg text-gray-200 hover:text-gold transition-colors"
                  >
                    <FaEnvelope className="text-gold" />
                    <span>customer.service@geno-link.com</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Email Contacts */}

        </div>
      </div>
    </section>
  );
}

