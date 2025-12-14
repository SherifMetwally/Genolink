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
              className="text-xl md:text-2xl text-center text-gray-200 leading-relaxed mb-8"
            >
              Genolink – Regional Headquarters (Egypt)
            </motion.p>
          </motion.div>

          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-lab-blue-dark/40 backdrop-blur-sm border border-gold/20 rounded-xl p-8 md:p-10 mb-8"
          >
            {/* General Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaEnvelope className="text-2xl text-gold" />
                <h3 className="text-xl md:text-2xl font-bold text-gold">General Inquiries</h3>
              </div>
              <p className="text-gray-200 mb-3 leading-relaxed">
                For general questions and information about Genolink services.
              </p>
              <a
                href="mailto:customer.service@geno-link.com"
                className="text-lg text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
              >
                <FaEnvelope className="text-sm" />
                <span>Email: customer.service@geno-link.com</span>
              </a>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gold/30 my-8"></div>

            {/* Medical Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧑‍⚕️</span>
                <h3 className="text-xl md:text-2xl font-bold text-gold">Medical Support</h3>
              </div>
              <p className="text-gray-200 mb-3 leading-relaxed">
                For physicians, medical teams, test inquiries, and case discussions.
              </p>
              <a
                href="mailto:medical@geno-link.com"
                className="text-lg text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
              >
                <FaEnvelope className="text-sm" />
                <span>Email: medical@geno-link.com</span>
              </a>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gold/30 my-8"></div>

            {/* Business Partnerships */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🤝</span>
                <h3 className="text-xl md:text-2xl font-bold text-gold">Business Partnerships</h3>
              </div>
              <p className="text-gray-200 mb-3 leading-relaxed">
                For hospitals, healthcare institutions, and strategic collaborations.
              </p>
              <a
                href="mailto:info@geno-link.com"
                className="text-lg text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
              >
                <FaEnvelope className="text-sm" />
                <span>Email: info@geno-link.com</span>
              </a>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gold/30 my-8"></div>

            {/* Phone */}
            <motion.a
              href="tel:+2001144311155"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="block mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaPhone className="text-2xl text-gold" />
                <h3 className="text-xl md:text-2xl font-bold text-gold">Phone</h3>
              </div>
              <p className="text-lg text-gold hover:text-gold-light transition-colors">
                +20 011 443 111 55
              </p>
            </motion.a>

            {/* Divider */}
            <div className="border-t border-gold/30 my-8"></div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-2xl text-gold" />
                <h3 className="text-xl md:text-2xl font-bold text-gold">Address</h3>
              </div>
              <p className="text-lg text-gray-200 leading-relaxed">
                75 El Geish Road, Sporting, Alexandria, Egypt
              </p>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gold/30 my-8"></div>

            {/* Regional Coverage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <FaGlobe className="text-2xl text-gold" />
                <h3 className="text-xl md:text-2xl font-bold text-gold">Regional Coverage</h3>
              </div>
              <p className="text-lg text-gray-200 mb-3 leading-relaxed">
                Serving healthcare providers across Egypt, Libya, North Africa, the GCC, and the Middle East.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Additional regional contact points available upon request.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
