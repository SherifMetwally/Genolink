'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { smoothScrollTo, getImagePath } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-lab-blue-dark border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        {/* Quality & Compliance Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 pb-8 border-b border-gold/20"
        >
          <h3 className="text-lg font-bold text-gold mb-3 text-center">Quality & Compliance</h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed max-w-4xl mx-auto">
            All testing is performed at internationally accredited partner laboratories in accordance with applicable regulatory, quality, and confidentiality standards.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 md:mb-0"
          >
            <div className="relative h-10 w-32 md:h-12 md:w-40 mb-2">
              <Image
                src={getImagePath('logo.png')}
                alt="GenoLink Logo"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <p className="text-gray-300 text-sm">Bridging Global Genomics to the Middle East</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-gray-300 text-sm mb-2">
              © {new Date().getFullYear()} GenoLink. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mb-2">
              Developed by{' '}
              <a
                href="https://www.linkedin.com/in/sherifmetwally"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light underline transition-colors"
              >
                Sherif Metwally
              </a>
            </p>
            <button
              onClick={() => smoothScrollTo('home')}
              className="text-gold hover:text-gold underline text-sm transition-colors"
            >
              Back to Top
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

