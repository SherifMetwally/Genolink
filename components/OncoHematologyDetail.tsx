'use client';

import { motion } from 'framer-motion';
import { FaDna, FaVial, FaMicroscope, FaQuestionCircle } from 'react-icons/fa';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

export default function OncoHematologyDetail() {
  const inclusions = [
    'DNA Mutations: SNVs, indels',
    'Copy Number Variations (CNVs)',
    'RNA-based Fusion Detection',
    'Complex Rearrangements & Translocations',
    'Guideline-based (NCCN/ELN) therapeutic insights',
    'Prognostic markers & risk groups',
    'Available targeted therapies & clinical trials',
  ];

  const clinicalValues = [
    'Supports precise classification of leukemias and lymphomas',
    'Improves diagnostic accuracy in ambiguous or complex cases',
    'Enables identification of targeted therapy options',
    'Aligns with NCCN and ELN recommendations',
    'Helps clinicians make confident treatment decisions',
  ];

  const rnaDetections = [
    'Gene fusions & translocations (e.g., BCR-ABL1, KMT2A, ETV6, IGH rearrangements)',
    'Cryptic or complex rearrangements missed by DNA',
    'Splice variants and expression-driven events',
    'Actionable driver alterations with therapeutic relevance',
  ];

  const faqs = [
    {
      question: 'Why is RNA sequencing important in hematologic cancers?',
      answer: 'RNA sequencing provides the highest sensitivity for detecting gene fusions and rearrangements, which are key drivers in leukemias and lymphomas and often missed by DNA-only tests.',
    },
    {
      question: 'Can the test guide treatment decisions?',
      answer: 'Yes. The report includes guideline-matched targeted therapy options, risk categories, and clinical trials relevant to the detected alterations.',
    },
    {
      question: 'Which patients should receive this test?',
      answer: 'Any patient with suspected or confirmed leukemia, lymphoma, MDS, MPN, or an unclear hematologic diagnosis.',
    },
    {
      question: 'What makes this test different?',
      answer: 'The integration of DNA + RNA provides a more complete molecular picture, enabling clinicians to detect all alteration types in a single test.',
    },
  ];

  return (
    <section id="onco-hematology-detail" className="relative py-20 bg-lab-blue overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/onco-hematology-detail-bg.png)`,
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
            <span>Onco-Hematology Comprehensive Genomic Profiling</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20"
          >
            <h3 className="text-3xl font-bold text-gold mb-6">Overview</h3>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              Our Onco-Hematology Comprehensive Genomic Profiling service provides an in-depth molecular assessment for leukemia, lymphoma, MDS, MPN, and other hematologic malignancies.
            </p>
            <p className="text-gray-200 text-lg leading-relaxed">
              Using advanced DNA and RNA sequencing, we deliver a complete and clinically actionable genomic profile to support accurate diagnosis, risk stratification, and personalized therapy selection.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-gold/30 cursor-pointer transition-all duration-300"
            >
              <Image
                src={getImagePath('sections/onco-hematology-detail.png')}
                alt="Onco-Hematology Comprehensive Genomic Profiling"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </motion.div>
          </motion.div>

          {/* NGS Panels Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gold/10 border-2 border-gold rounded-lg p-8"
          >
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              Our Onco-Hematology NGS panels provide comprehensive molecular profiling for myeloid and lymphoid malignancies, enabling precise diagnosis, risk stratification, and personalized treatment decisions in line with international guidelines.
            </p>
            <p className="text-gray-200 text-lg leading-relaxed">
              RNA analysis is essential for detecting clinically relevant gene fusions and expression signatures that cannot be identified by DNA testing alone, particularly in acute leukemias.
            </p>
          </motion.div>

          {/* Why DNA + RNA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20"
          >
            <h3 className="text-3xl font-bold text-gold mb-6">Why DNA + RNA?</h3>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              Most hematologic cancers are driven by gene fusions, rearrangements, and splice variants that cannot be reliably detected using DNA-only testing.
            </p>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              By integrating high-sensitivity RNA sequencing with DNA-based mutation analysis, our test identifies:
            </p>
            <ul className="space-y-3">
              {rnaDetections.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-3"
                >
                  <span className="text-gold mt-1">•</span>
                  <span className="text-gray-200 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-gray-200 text-lg leading-relaxed mt-6">
              This dual approach ensures unmatched detection accuracy and the highest clinical yield for hematologic malignancies.
            </p>
          </motion.div>

          {/* What the Test Includes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20"
          >
            <h3 className="text-3xl font-bold text-gold mb-6">What the Test Includes</h3>
            <ul className="space-y-3">
              {inclusions.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-3"
                >
                  <span className="text-gold mt-1">•</span>
                  <span className="text-gray-200 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Clinical Value */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20"
          >
            <h3 className="text-3xl font-bold text-gold mb-6">Clinical Value</h3>
            <ul className="space-y-3">
              {clinicalValues.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-3"
                >
                  <span className="text-gold mt-1">•</span>
                  <span className="text-gray-200 text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Technology */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20"
          >
            <h3 className="text-3xl font-bold text-gold mb-6">Technology</h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              Performed using hybrid-capture Next-Generation Sequencing (NGS) on both DNA and RNA extracted from blood or bone marrow samples. This method provides superior sensitivity for rearrangements and full coverage of clinically relevant genomic alterations.
            </p>
          </motion.div>

          {/* Turnaround Time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gold/10 border-2 border-gold rounded-lg p-6 text-center"
          >
            <FaVial className="text-5xl text-gold mx-auto mb-4" />
            <p className="text-2xl font-bold text-gold">Turnaround Time: 20–25 days</p>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20"
          >
            <h3 className="text-3xl font-bold text-gold mb-6 flex items-center gap-3">
              <FaQuestionCircle />
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="border-l-4 border-gold pl-6"
                >
                  <h4 className="text-xl font-bold text-white mb-3">{index + 1}. {faq.question}</h4>
                  <p className="text-gray-200 text-lg leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

