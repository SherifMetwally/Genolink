'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    id: 'regions',
    question: 'Which regions does Genolink serve?',
    answer: 'We support clinicians and hospitals across Egypt, Libya, North Africa, GCC & the Middle East.',
  },
  {
    id: 'turnaround',
    question: 'What is the turnaround time?',
    answer: 'Oncology profiling: 20-25 days • Leukemia panels: 10–15 days • IHC: 10 days • Hereditary testing: 14–21 days.',
    isList: true,
  },
  {
    id: 'logistics',
    question: 'Do you provide sample pickup across borders?',
    answer: 'Yes — we coordinate international sample logistics within the Middle East.',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 bg-lab-blue overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(2, 80, 152, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 white-gradient flex items-center justify-center gap-3">
            <FaQuestionCircle className="text-gold" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="section-divider mx-auto max-w-md"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  variants={cardVariants}
                  className="bg-lab-blue-dark/50 backdrop-blur-sm rounded-lg border border-gold/20 hover:border-gold/50 transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 text-gold text-xl">
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
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
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-gold/20 pt-4">
                            {faq.isList ? (
                              <ul className="space-y-2">
                                {faq.answer.split(' • ').map((item, index) => (
                                  <li key={index} className="flex items-start space-x-2 text-gray-200 leading-relaxed">
                                    <span className="text-gold mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-200 leading-relaxed">
                                {faq.answer}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

