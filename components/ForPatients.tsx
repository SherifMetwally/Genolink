'use client';

import { motion } from 'framer-motion';
import { FaUserMd, FaShieldAlt, FaLock, FaHeartbeat } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const features = [
  {
    icon: FaUserMd,
    title: 'Medical Supervision',
    description: 'All tests are requested and supervised by your physician.',
  },
  {
    icon: FaShieldAlt,
    title: 'Accredited Laboratories',
    description: 'Testing is performed at internationally accredited laboratories.',
  },
  {
    icon: FaLock,
    title: 'Confidential Results',
    description: 'Your results are confidential and shared only with you and your physician.',
  },
];

export default function ForPatients() {
  return (
    <section id="patients" className="relative py-20 bg-lab-blue-dark overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/for-patients-bg.png)`,
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
            <FaHeartbeat className="text-gold" />
            <span>For Patients</span>
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
                className="text-xl md:text-2xl text-gold mb-4 font-semibold"
              >
                Your health deserves precision.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4"
              >
                Genolink works closely with your physician to provide reliable genetic testing through internationally accredited laboratories, helping your doctor better understand your condition and choose the most appropriate care for you.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-200 leading-relaxed"
              >
                Genetic testing can offer valuable insights, but results are always interpreted and explained by your treating physician as part of your medical care.
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
                src={getImagePath('sections/for-patients.png')}
                alt="For Patients - Precision Healthcare"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-lab-blue/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <Icon className="text-3xl text-gold" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gold">{feature.title}</h4>
                  <p className="text-gray-200">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

