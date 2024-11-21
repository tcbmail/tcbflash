import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Target, TrendingUp } from 'lucide-react';

const Consulting = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          AI Consulting Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Expert guidance to help you navigate the AI landscape and implement the right solutions for your business.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: Lightbulb,
            title: 'Strategy Development',
            description: 'Develop comprehensive AI strategies aligned with your business goals.',
          },
          {
            icon: Target,
            title: 'Solution Assessment',
            description: 'Evaluate and recommend the best AI solutions for your specific needs.',
          },
          {
            icon: Users,
            title: 'Team Training',
            description: 'Train your team to effectively work with AI technologies.',
          },
          {
            icon: TrendingUp,
            title: 'Implementation Support',
            description: 'Guide you through the implementation and optimization of AI solutions.',
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

export default Consulting;