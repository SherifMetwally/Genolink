'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLungs, 
  FaDna, 
  FaFemale, 
  FaPills,
  FaChevronDown,
  FaChevronUp,
  FaFlask
} from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const services = [
  {
    id: 'onco',
    icon: FaLungs,
    title: 'Onco-Hemato Genomics',
    featured: true,
    description: 'Comprehensive genomic profiling for both solid tumors and hematologic malignancies.',
    details: [
      'Solid tumor profiling (tissue & liquid biopsy)',
      'Hematologic malignancy panels (leukemia, lymphoma, myeloma)',
      'Fusion gene and translocation detection (e.g., BCR-ABL, PML-RARA, KMT2A)',
      'Actionable biomarkers for targeted and immunotherapy',
      'Minimal Residual Disease (MRD) and therapy monitoring by NGS',
      'Companion diagnostics and clinical trial matching',
    ],
    highlight: 'Genolink serves as the regional reference for Onco-Hemato Genomics and Precision Medicine across the Middle East — empowering physicians with global-standard molecular insights.',
  },
  {
    id: 'hereditary',
    icon: FaDna,
    title: 'Hereditary & Rare Diseases',
    featured: false,
    description: 'Comprehensive genetic testing for hereditary conditions and rare diseases.',
    details: [
      'Germline panels for hereditary cancer and rare syndromes',
      'Carrier screening and family-based genetic evaluation',
      'Whole Exome Sequencing (WES) and targeted gene analysis',
    ],
  },
  {
    id: 'women',
    icon: FaFemale,
    title: "Women's Health",
    featured: false,
    description: 'Specialized genetic testing for women\'s health and reproductive care.',
    details: [
      'Non-invasive prenatal testing (NIPT)',
      'Reproductive genetics and miscarriage analysis',
      'Pre-implantation genetic testing (PGT-A/PGS)',
    ],
  },
  {
    id: 'pharma',
    icon: FaPills,
    title: 'Pharmacogenomics',
    featured: false,
    description: 'Personalized medication optimization based on genetic profile.',
    details: [
      'Drug–gene interaction testing',
      'Personalized treatment optimization based on individual genetic profile',
    ],
  },
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>('onco');

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section id="services" className="relative py-20 bg-lab-blue-dark overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/services-bg.png)`,
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
            <FaFlask className="text-gold" />
            <span>Our Services</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-gold/30 cursor-pointer transition-all duration-300"
            >
              <Image
                src={getImagePath('sections/services.png')}
                alt="Our Services - Advanced Genomic Testing"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedService === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  service.featured
                    ? 'md:col-span-2 border-gold bg-gold/10'
                    : 'border-gold/30 bg-lab-blue/50 hover:border-gold/60'
                }`}
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full text-left p-6 focus:outline-none"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        service.featured ? 'bg-gold' : 'bg-gold/20'
                      }`}>
                        <Icon className={`text-2xl ${
                          service.featured ? 'text-lab-blue-dark' : 'text-gold'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          service.featured ? 'text-white' : 'text-white'
                        }`}>
                          {index + 1}. {service.title}
                        </h3>
                        {service.featured && (
                          <span className="text-sm text-gold/80">Featured Service</span>
                        )}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? (
                        <FaChevronUp className="text-gold text-xl" />
                      ) : (
                        <FaChevronDown className="text-gold text-xl" />
                      )}
                    </motion.div>
                  </div>
                  <p className="text-gray-200 mb-4">{service.description}</p>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gold/20 pt-4">
                        <ul className="space-y-2 mb-4">
                          {service.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start space-x-2 text-gray-200"
                            >
                              <span className="text-gold mt-1">•</span>
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                        {service.highlight && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gold font-semibold italic border-l-4 border-gold pl-4 py-2"
                          >
                            {service.highlight}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-center max-w-4xl mx-auto"
        >
          <p className="text-gray-200 leading-relaxed">
            All tests are conducted in globally accredited laboratories, following international clinical standards.
            Each report is reviewed by expert molecular pathologists and delivered with clear, actionable insights 
            for confident clinical decision-making.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

