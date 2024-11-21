import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Settings, Smartphone } from 'lucide-react';

const CustomSoftware = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          Custom Software Development
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Build tailored software solutions that perfectly match your business needs and drive efficiency.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: Layout,
            title: 'Web Applications',
            description: 'Modern, responsive web applications built with the latest technologies.',
          },
          {
            icon: Smartphone,
            title: 'Mobile Solutions',
            description: 'Native and cross-platform mobile applications for iOS and Android.',
          },
          {
            icon: Code,
            title: 'API Development',
            description: 'Robust and scalable APIs that connect your systems and services.',
          },
          {
            icon: Settings,
            title: 'System Integration',
            description: 'Seamless integration of new software with your existing systems.',
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

export default CustomSoftware;