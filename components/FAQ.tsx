'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';

const faqs = [
  {
    id: 'genetic-testing',
    question: 'What is genetic testing?',
    answer: 'Genetic testing analyzes specific genes to help your physician better understand your condition, guide diagnosis, or support treatment decisions. All tests are requested and interpreted by your treating physician.',
  },
  {
    id: 'medical-advice',
    question: 'Does Genolink provide direct medical advice?',
    answer: 'No. Genolink does not replace your physician. All tests are ordered, interpreted, and explained by your doctor as part of your medical care.',
  },
  {
    id: 'samples',
    question: 'What type of samples are required?',
    answer: 'Blood samples • Tissue samples (such as biopsy or FFPE tissue)',
    isList: true,
    note: 'Your physician will determine the appropriate test and sample type.',
  },
  {
    id: 'where-tests',
    question: 'Where are the tests performed?',
    answer: 'All tests are performed at internationally accredited partner laboratories in the United States and Europe, following strict quality and regulatory standards.',
  },
  {
    id: 'results-delivery',
    question: 'How are my results delivered?',
    answer: 'Test results are shared directly with your physician, who will explain them to you clearly and discuss their clinical relevance.',
  },
  {
    id: 'confidentiality',
    question: 'Is my information kept confidential?',
    answer: 'Yes. All samples and results are handled with strict confidentiality and data protection standards. Your information is shared only with your physician and authorized medical teams.',
  },
  {
    id: 'turnaround',
    question: 'How long does it take to receive results?',
    answer: 'Turnaround time depends on the type of test requested. Your physician or care team will inform you of the expected timeline.',
  },
  {
    id: 'referral',
    question: 'Do I need a referral from a doctor?',
    answer: 'Yes. All genetic tests provided through Genolink require a physician request and medical supervision.',
  },
  {
    id: 'treatment-guide',
    question: 'Can genetic testing help guide treatment decisions?',
    answer: 'Genetic testing may provide valuable information to support diagnosis or treatment planning. Final medical decisions are always made by your treating physician.',
  },
  {
    id: 'contact',
    question: 'Who can I contact if I have questions?',
    answer: 'For general inquiries, you may contact our team at: • customer.service@geno-link.com',
    isList: true,
    note: 'For medical questions, please consult your physician.',
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
                              <div>
                                <ul className="space-y-2 mb-3">
                                  {faq.answer.split(' • ').map((item, index) => {
                                    const emailMatch = item.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
                                    if (emailMatch) {
                                      const email = emailMatch[1];
                                      const beforeEmail = item.substring(0, item.indexOf(email));
                                      const afterEmail = item.substring(item.indexOf(email) + email.length);
                                      return (
                                        <li key={index} className="flex items-start space-x-2 text-gray-200 leading-relaxed">
                                          <span className="text-gold mt-1">•</span>
                                          <span>
                                            {beforeEmail}
                                            <a
                                              href={`mailto:${email}`}
                                              className="text-gold hover:text-gold-light inline-flex items-center gap-1 underline"
                                            >
                                              <FaEnvelope className="text-sm" />
                                              {email}
                                            </a>
                                            {afterEmail}
                                          </span>
                                        </li>
                                      );
                                    }
                                    return (
                                      <li key={index} className="flex items-start space-x-2 text-gray-200 leading-relaxed">
                                        <span className="text-gold mt-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                                {faq.note && (
                                  <p className="text-gray-300 text-sm italic mt-3">
                                    {faq.note}
                                  </p>
                                )}
                              </div>
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

