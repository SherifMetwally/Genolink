'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { smoothScrollTo, getImagePath } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-lab-blue-dark border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
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

