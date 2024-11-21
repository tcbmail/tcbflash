import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Code, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          About TCB Flash
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          We're a team of passionate developers and AI specialists dedicated to
          creating innovative solutions that help businesses thrive in the digital age.
        </motion.p>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Target,
            title: 'Mission',
            description:
              'To empower businesses with intelligent software solutions that drive efficiency and growth.',
          },
          {
            icon: Code,
            title: 'Innovation',
            description:
              'We stay at the forefront of technology, constantly exploring new ways to solve complex problems.',
          },
          {
            icon: Clock,
            title: 'Efficiency',
            description:
              'We believe in creating solutions that save time and resources while maximizing results.',
          },
          {
            icon: Award,
            title: 'Quality',
            description:
              'We maintain the highest standards in our code and deliver exceptional results for our clients.',
          },
        ].map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <value.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Team Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'John Doe',
              role: 'Founder & CEO',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
            },
            {
              name: 'Jane Smith',
              role: 'AI Lead',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
            },
            {
              name: 'Mike Johnson',
              role: 'Lead Developer',
              image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;