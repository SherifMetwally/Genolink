'use client';

import { motion } from 'framer-motion';
import { FaStethoscope, FaFlask, FaShippingFast, FaComments } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const benefits = [
  {
    icon: FaStethoscope,
    title: 'Comprehensive Portfolio',
    description: 'Covering oncology, hereditary, and reproductive genetics',
  },
  {
    icon: FaShippingFast,
    title: 'Easy Sample Logistics',
    description: 'Blood, saliva, paraffin blocks',
  },
  {
    icon: FaComments,
    title: 'Expert Support',
    description: 'Case discussion and report interpretation support',
  },
  {
    icon: FaFlask,
    title: 'Advanced Technology',
    description: 'Access to advanced molecular profiling technologies',
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
                Partner with Genolink to enhance your diagnostic and treatment capabilities.
                We offer seamless logistics, fast turnaround times, and expert case support — 
                ensuring you and your patients benefit from global-standard genomic insights.
              </p>
            </motion.div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-8 text-center">Why Partner with Us:</h3>

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
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                        <Icon className="text-xl text-gold" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gold">{benefit.title}</h4>
                      <p className="text-gray-200">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

