import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AIIntegration from './pages/services/AIIntegration';
import CustomSoftware from './pages/services/CustomSoftware';
import ProcessAutomation from './pages/services/ProcessAutomation';
import Consulting from './pages/services/Consulting';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/ai-integration" element={<AIIntegration />} />
            <Route path="/services/custom-software" element={<CustomSoftware />} />
            <Route path="/services/process-automation" element={<ProcessAutomation />} />
            <Route path="/services/consulting" element={<Consulting />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;