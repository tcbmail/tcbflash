import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'AI Customer Service Bot',
      description:
        'An intelligent chatbot that handles customer inquiries 24/7, reducing response time by 80%.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      tags: ['AI', 'NLP', 'React', 'Node.js'],
      link: '#',
      github: '#',
    },
    {
      title: 'Document Analysis System',
      description:
        'Automated system for processing and analyzing legal documents using AI.',
      image: 'https://images.unsplash.com/photo-1542879437-4a5f0a359aec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      tags: ['Machine Learning', 'Python', 'OCR', 'API'],
      link: '#',
      github: '#',
    },
    {
      title: 'Predictive Analytics Dashboard',
      description:
        'Real-time business intelligence dashboard with predictive analytics capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      tags: ['Analytics', 'React', 'D3.js', 'AI'],
      link: '#',
      github: '#',
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
          Our Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Explore our successful projects and see how we've helped businesses
          transform their operations with AI-powered solutions.
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href={project.link}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={project.github}
                  className="text-gray-600 hover:text-gray-700"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '95%', label: 'Success Rate' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;