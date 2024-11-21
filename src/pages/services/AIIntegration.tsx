import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Zap } from 'lucide-react';

const AIIntegration = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          AI Integration Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Transform your business with cutting-edge AI solutions that enhance decision-making and automate complex tasks.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: Brain,
            title: 'Machine Learning Integration',
            description: 'Implement custom machine learning models that learn from your data and improve over time.',
          },
          {
            icon: Network,
            title: 'Natural Language Processing',
            description: 'Add sophisticated text analysis and language understanding capabilities to your applications.',
          },
          {
            icon: Cpu,
            title: 'Computer Vision',
            description: 'Integrate image and video analysis capabilities for automated visual data processing.',
          },
          {
            icon: Zap,
            title: 'Predictive Analytics',
            description: 'Leverage AI to forecast trends and make data-driven decisions.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIIntegration;