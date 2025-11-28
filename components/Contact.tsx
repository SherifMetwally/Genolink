'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-lab-blue overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/contact-bg.png)`,
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
            <FaPhone className="text-gold" />
            <span>Contact Us</span>
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
                src={getImagePath('sections/contact.png')}
                alt="Contact Us - Get in Touch"
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
              For general inquiries or testing information:
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.a
              href="mailto:info@genolink.com"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold transition-all duration-300 text-center group"
            >
              <FaEnvelope className="text-4xl text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-gold mb-2">Email</h3>
              <p className="text-gray-200 text-sm">info@genolink.com</p>
            </motion.a>

            <motion.a
              href="tel:+201144311155"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold transition-all duration-300 text-center group"
            >
              <FaPhone className="text-4xl text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-gold mb-2">Phone</h3>
              <p className="text-gray-200 text-sm">+201144311155</p>
            </motion.a>

            <motion.a
              href="https://www.genolink.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold transition-all duration-300 text-center group"
            >
              <FaGlobe className="text-4xl text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-gold mb-2">Website</h3>
              <p className="text-gray-200 text-sm">www.genolink.com</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold transition-all duration-300 text-center"
            >
              <FaMapMarkerAlt className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gold mb-2">Location</h3>
              <p className="text-gray-200 text-sm">Cairo, Egypt</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center text-white text-lg font-semibold"
          >
            Serving healthcare providers and patients across the Middle East.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

