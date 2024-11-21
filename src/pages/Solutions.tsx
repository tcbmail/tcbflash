import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  Car,
  Home,
  Building,
  Landmark,
  Cog,
  Database,
  BarChart3,
} from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: BrainCircuit,
      title: 'AI Integration',
      description:
        'Integrate powerful AI models into your existing systems to automate decision-making and enhance capabilities.',
      features: [
        'Natural Language Processing',
        'Machine Learning Models',
        'Predictive Analytics',
        'Computer Vision',
      ],
    },
    {
      icon: Bot,
      title: 'Chatbots & Virtual Assistants',
      description:
        'Custom AI-powered chatbots that handle customer service, support, and internal communications.',
      features: [
        '24/7 Customer Support',
        'Multi-language Support',
        'Integration with Existing Systems',
        'Advanced Analytics',
      ],
    },
    {
      icon: Database,
      title: 'Process Automation',
      description:
        'Streamline your operations with intelligent automation solutions that reduce manual work and errors.',
      features: [
        'Workflow Automation',
        'Document Processing',
        'Data Entry Automation',
        'Quality Control',
      ],
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description:
        'Transform your data into actionable insights with advanced analytics and reporting tools.',
      features: [
        'Real-time Analytics',
        'Custom Dashboards',
        'Trend Analysis',
        'Performance Monitoring',
      ],
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          Our Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Discover our comprehensive range of AI-powered solutions designed to
          transform your business operations and drive growth.
        </motion.p>
      </section>

      {/* Solutions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <solution.icon className="h-12 w-12 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
            <p className="text-gray-600 mb-6">{solution.description}</p>
            <ul className="space-y-3">
              {solution.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center text-gray-700"
                >
                  <Cog className="h-5 w-5 text-indigo-600 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      {/* Industries Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Industries We Serve
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Car, name: 'Automotive' },
            { icon: Home, name: 'Real Estate' },
            { icon: Building, name: 'Construction' },
            { icon: Landmark, name: 'Government' },
          ].map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="text-center"
            >
              <industry.icon className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{industry.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Solutions;