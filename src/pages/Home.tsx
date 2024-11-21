import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cpu, Users, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Seamlessly integrate AI capabilities into your existing systems and workflows.',
      link: '/services/ai-integration'
    },
    {
      icon: Cpu,
      title: 'Custom Software',
      description: 'Tailored software development to meet your specific business needs.',
      link: '/services/custom-software'
    },
    {
      icon: Cog,
      title: 'Process Automation',
      description: 'Automate repetitive tasks and streamline operations with intelligent solutions.',
      link: '/services/process-automation'
    },
    {
      icon: Users,
      title: 'Consulting',
      description: 'Expert guidance on implementing AI solutions in your business.',
      link: '/services/consulting'
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent"
        >
          Transform Your Business with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          We specialize in creating intelligent software solutions that save time,
          reduce costs, and drive growth using cutting-edge AI technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <Link
            to="/solutions"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/contact"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.link}
            className="block group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 h-full"
            >
              <service.icon className="h-12 w-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-200">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <span className="text-indigo-600 flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-200">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 opacity-90">
          Let's discuss how we can help transform your business with AI.
        </p>
        <Link
          to="/contact"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <span>Schedule a Consultation</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default Home;