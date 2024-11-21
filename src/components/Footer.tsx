import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-indigo-600" />
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">
                TCB Flash
              </span>
            </Link>
            <p className="text-gray-600">
              Empowering businesses with AI-driven solutions
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/about" className="hover:text-indigo-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-indigo-600 transition-colors duration-200">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-indigo-600 transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/services/ai-integration" className="hover:text-indigo-600 transition-colors duration-200">
                  AI Integration
                </Link>
              </li>
              <li>
                <Link to="/services/custom-software" className="hover:text-indigo-600 transition-colors duration-200">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link to="/services/process-automation" className="hover:text-indigo-600 transition-colors duration-200">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="hover:text-indigo-600 transition-colors duration-200">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/tcbflash" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/tcbflash" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} TCB Flash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;