'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLungs, 
  FaDna, 
  FaFlask,
  FaVial,
  FaChevronDown,
  FaChevronUp,
  FaMicroscope,
  FaHeartbeat,
  FaSyringe,
  FaClipboardCheck
} from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

interface Service {
  id: string;
  icon: any;
  title: string;
  featured: boolean;
  description: string;
  details: string[];
}

const services: Service[] = [
  {
    id: 'somatic-tumor-profiling',
    icon: FaDna,
    title: 'Somatic Tumor Profiling',
    featured: true,
    description: 'Tissue or Liquid — Same High Precision. Whether the sample is FFPE tumor tissue or liquid biopsy, Genolink provides a full somatic genomic profile using advanced DNA + RNA sequencing.',
    details: [
      'Actionable mutations',
      'Fusions & complex rearrangements',
      'CNVs & splice variants',
      'Immunotherapy biomarkers',
      'Treatment-matched insights & clinical trials',
    ],
  },
  {
    id: 'hereditary-cancer',
    icon: FaHeartbeat,
    title: 'Hereditary Cancer Testing',
    featured: true,
    description: 'Empowering Early Detection & Prevention. Our hereditary cancer panels identify inherited mutations linked to breast, ovarian, colorectal, prostate, pancreatic cancers, and more.',
    details: [
      'Screening strategies',
      'Family risk assessment',
      'Preventive care decisions',
    ],
  },
  {
    id: 'complete-oncology-diagnostic',
    icon: FaClipboardCheck,
    title: 'Complete Oncology Diagnostic Support',
    featured: true,
    description: 'Integrated Pathology Services. Genolink offers a seamless diagnostic workflow combining genomics with expert pathology to deliver the most complete diagnostic picture for each patient.',
    details: [
      'Pathology Services',
      'Expert Pathology Review (Second Opinion)',
      'Immunohistochemistry (IHC)',
      'Digital Pathology & Remote Consultations',
    ],
  },
  {
    id: 'tumor-panels',
    icon: FaLungs,
    title: 'Tumor-Specific Panels',
    featured: false,
    description: 'Targeted genomic panels designed for specific cancer types.',
    details: [
      'Breast Cancer',
      'Lung Cancer',
      'Colorectal Cancer',
      'Prostate Cancer',
      'Ovarian Cancer',
      'Thyroid Cancer',
      'Gastrointestinal Tumors',
    ],
  },
  {
    id: 'immunotherapy-biomarkers',
    icon: FaFlask,
    title: 'Immunotherapy Biomarkers',
    featured: false,
    description: 'Comprehensive biomarker testing to guide immunotherapy decisions.',
    details: [
      'PD-L1 IHC',
      'MSI / MMR',
      'TMB',
    ],
  },
  {
    id: 'liquid-biopsy',
    icon: FaVial,
    title: 'Liquid Biopsy (ctDNA)',
    featured: false,
    description: 'Non-invasive blood-based genomic testing for cancer detection and monitoring.',
    details: [
      'Detection of actionable mutations',
      'Monitoring disease progression',
      'Identifying resistance mechanisms',
    ],
  },
  {
    id: 'leukemia-panels',
    icon: FaDna,
    title: 'Leukemia Genomic Panels',
    featured: false,
    description: 'Comprehensive genomic panels for acute and chronic leukemias.',
    details: [
      'AML, ALL, CLL, CML',
      'FLT3, NPM1, IDH1/2, JAK2, TP53, DNMT3A, and more',
    ],
  },
  {
    id: 'lymphoma-diagnostics',
    icon: FaMicroscope,
    title: 'Lymphoma Diagnostics',
    featured: false,
    description: 'Advanced testing for B-cell and T-cell lymphomas.',
    details: [
      'B-cell & T-cell NGS panels',
      'BCR/TCR clonality testing',
      'Fusions & rearrangements',
    ],
  },
  {
    id: 'myeloma',
    icon: FaSyringe,
    title: 'Myeloma & Plasma Disorders',
    featured: false,
    description: 'Specialized testing for multiple myeloma and related plasma cell disorders.',
    details: [
      'Myeloma NGS',
      'FISH for risk markers (17p, t(4;14), t(11;14)…)',
    ],
  },
  {
    id: 'cytogenetics',
    icon: FaFlask,
    title: 'Cytogenetics & FISH',
    featured: false,
    description: 'Classical and molecular cytogenetic analysis for hematologic malignancies.',
    details: [
      'Karyotype analysis',
      'Hematologic FISH panels (BCR-ABL, PML-RARA, KMT2A…)',
    ],
  },
  {
    id: 'mrd',
    icon: FaMicroscope,
    title: 'Minimal Residual Disease (MRD)',
    featured: false,
    description: 'Ultra-sensitive detection of residual cancer cells to monitor treatment response.',
    details: [
      'NGS-based MRD',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section id="services" className="relative py-20 bg-lab-blue-dark overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 opacity-5"
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
            <FaDna className="text-gold" />
            <span>Genolink Oncology Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Precision Genomics for Every Cancer Patient
          </p>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto mb-6">
            At Genolink, we deliver next-generation oncology diagnostics designed to empower clinicians with fast, accurate, and actionable genomic insights—across both somatic and hereditary cancer testing.
          </p>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto mb-16">
          {/* Section Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-gold/30 mb-12 cursor-pointer transition-all duration-300"
          >
            <Image
              src={getImagePath('sections/services.png')}
              alt="Oncology and Onco-Hematology Services"
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              unoptimized
            />
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;

              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative rounded-lg overflow-hidden border transition-all duration-300 ${
                    service.featured
                      ? 'bg-gold/10 border-gold shadow-lg shadow-gold/20'
                      : 'bg-lab-blue/50 backdrop-blur-sm border-gold/20 hover:border-gold/50'
                  }`}
                >
                  {service.featured && (
                    <div className="absolute top-4 right-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}

                  {/* Service Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={getImagePath(`services/${index + 1}.png`)}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      unoptimized
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          service.featured ? 'bg-gold/30' : 'bg-gold/20'
                        }`}>
                          <Icon className="text-2xl text-gold" />
                        </div>
                      </div>
                      <div className={`flex-1 ${service.featured ? 'pr-20' : ''}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <button
                      onClick={() => toggleService(service.id)}
                      className="flex items-center justify-between w-full text-gold hover:text-gold-light transition-colors font-semibold text-sm"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
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
                          <div className="mt-4 pt-4 border-t border-gold/20">
                            <ul className="space-y-2">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-sm">
                                  <span className="text-gold mt-1">•</span>
                                  <span className="text-gray-300">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
