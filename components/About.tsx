'use client';

import { motion } from 'framer-motion';
import { FaDna, FaBullseye, FaEye, FaHeart, FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const aboutCards = [
  {
    id: 'who',
    icon: FaDna,
    title: 'Who We Are',
    content: 'Genolink is an Egypt-based precision diagnostics company specializing in Oncology and Onco-Hematology genomics. We collaborate with internationally accredited laboratories to deliver clinically actionable, state-of-the-art cancer testing solutions across Egypt, the GCC, the broader Middle East, and North Africa',
  },
  {
    id: 'mission',
    icon: FaBullseye,
    title: 'Our Mission',
    content: 'To empower clinicians with high-quality genomic insights that guide personalized cancer care.',
  },
  {
    id: 'vision',
    icon: FaEye,
    title: 'Our Vision',
    content: 'To become the leading trusted regional genomics partner for precision oncology and hematology diagnostics.',
  },
  {
    id: 'values',
    icon: FaHeart,
    title: 'Our Values',
    values: [
      { label: 'Excellence', text: 'Clinical-grade quality and accuracy' },
      { label: 'Speed', text: 'Optimized regional logistics and fast turnaround times' },
      { label: 'Innovation', text: 'Access to cutting-edge global technologies' },
      { label: 'Support', text: 'Strong scientific and medical consultation services' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-lab-blue overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/about-us-bg.png)`,
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
            <FaInfoCircle className="text-gold" />
            <span>About Us</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Image and Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-gold/30 cursor-pointer transition-all duration-300"
            >
              <Image
                src={getImagePath('sections/about-us.png')}
                alt="About GenoLink - Genomics and Precision Medicine"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
            <div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Genolink is an Egypt-based precision diagnostics company dedicated to advancing cancer care through cutting-edge Oncology and Onco-Hematology genomics.
              We partner with internationally accredited laboratories to deliver clinically actionable, state-of-the-art cancer testing solutions across Egypt, the GCC, and the wider Middle East and North Africa
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {aboutCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                        <Icon className="text-3xl text-gold" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gold">{card.title}</h3>
                      {card.values ? (
                        <ul className="space-y-3">
                          {card.values.map((value: any, idx: number) => (
                            <li key={idx} className="text-gray-200 leading-relaxed">
                              <span className="font-semibold text-gold">{value.label}:</span> {value.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-200 leading-relaxed">{card.content}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

