import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, HeartHandshake, TreePine } from 'lucide-react';

const Sustainability = () => {
  const initiatives = [
    { icon: Leaf, title: 'Eco-Tourism Promotion', desc: 'Supporting homestays and resorts that run on renewable energy, practice rainwater harvesting, and minimize plastic use.' },
    { icon: HeartHandshake, title: 'Community Empowerment', desc: 'Ensuring tourism revenue goes directly to local artisans, guides, and families rather than large commercial chains.' },
    { icon: TreePine, title: 'Biodiversity Conservation', desc: 'Regulating footfall in sensitive Western Ghats zones and promoting awareness about local flora and fauna.' },
    { icon: Recycle, title: 'Zero Waste Trails', desc: 'Implementing strict waste management protocols across popular trekking routes and heritage sites.' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-8 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="bg-[#81B29A] rounded-3xl p-12 mb-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d14abac2?w=1200')] bg-cover bg-center"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Experience Karnataka Naturally</h1>
            <p className="text-xl text-[#F4F1DE] max-w-3xl mx-auto font-medium">
              EKaNa is committed to the UN Sustainable Development Goals. We believe travel should preserve our heritage, protect our ecology, and empower our people.
            </p>
          </div>
        </div>

        {/* UN SDGs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A363B] font-heading mb-8 text-center">Our Commitment to the Global Goals</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['Goal 8: Decent Work', 'Goal 11: Sustainable Cities', 'Goal 12: Responsible Consumption', 'Goal 13: Climate Action', 'Goal 15: Life on Land'].map((goal, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center flex flex-col items-center justify-center h-32"
              >
                <span className="font-bold text-[#3D5A80] text-sm uppercase tracking-wider">{goal}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((init, idx) => {
            const Icon = init.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex items-start"
              >
                <div className="bg-[#F4F1DE] p-4 rounded-full mr-6 shrink-0">
                  <Icon className="w-8 h-8 text-[#E07A5F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2A363B] font-heading mb-3">{init.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{init.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default Sustainability;