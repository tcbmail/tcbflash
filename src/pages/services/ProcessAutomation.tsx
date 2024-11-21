import React from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, Workflow, Cog } from 'lucide-react';

const ProcessAutomation = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          Process Automation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Streamline your operations with intelligent automation solutions that save time and reduce errors.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: Workflow,
            title: 'Workflow Automation',
            description: 'Automate complex business processes and workflows for increased efficiency.',
          },
          {
            icon: Bot,
            title: 'Robotic Process Automation',
            description: 'Implement software robots to handle repetitive tasks and operations.',
          },
          {
            icon: FileText,
            title: 'Document Processing',
            description: 'Automated document handling, analysis, and data extraction.',
          },
          {
            icon: Cog,
            title: 'Business Process Optimization',
            description: 'Analyze and optimize your business processes for maximum efficiency.',
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

export default ProcessAutomation;