import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Recycle, HeartHandshake, TreePine, ShieldCheck, CheckCircle2, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sustainability = () => {
  const navigate = useNavigate();
  const [pledged, setPledged] = useState(false);

  const initiatives = [
    { 
      icon: Leaf, 
      title: 'Eco-Tourism Promotion', 
      desc: 'Supporting homestays and resorts that run on solar/renewable energy, practice rainwater harvesting, and eliminate single-use plastics.' 
    },
    { 
      icon: HeartHandshake, 
      title: 'Community Direct Benefit', 
      desc: 'Ensuring that traveler spend directly benefits rural families, certified local guides, and traditional village craftspeople.' 
    },
    { 
      icon: TreePine, 
      title: 'Western Ghats Conservation', 
      desc: 'Regulating tourist footfall in ecologically sensitive evergreen forests and promoting awareness of endemic flora and fauna.' 
    },
    { 
      icon: Recycle, 
      title: 'Zero Waste Trails', 
      desc: 'Implementing strict pack-it-in, pack-it-out waste management protocols across popular mountain trekking routes and heritage ruins.' 
    }
  ];

  const sustainabilityPillars = [
    { tag: 'Livelihoods', title: 'Rural Economic Growth', desc: 'Direct employment through certified local guiding and homestay hosting.' },
    { tag: 'Heritage', title: 'Cultural Preservation', desc: 'Safeguarding Karnataka heritage towns, temples, and vernacular crafts.' },
    { tag: 'Circularity', title: 'Responsible Consumption', desc: 'Minimizing single-use plastics and promoting local farm-to-table food.' },
    { tag: 'Eco-Transit', title: 'Low-Carbon Circuits', desc: 'Encouraging shared electric transit and low-emission regional travel.' },
    { tag: 'Biodiversity', title: 'Western Ghats Ecology', desc: 'Flora & fauna protection, trekking etiquette, and habitat corridors.' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#81B29A]/15 blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#81B29A]" /> Responsible Travel Framework
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-3">
            Preserving Karnataka Naturally
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            At EKaNa, we believe travel must enrich local ecosystems, honor indigenous cultures, and protect our fragile biodiversity for generations to come.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Core Pillars Strip */}
        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 border border-gray-100 mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">Impact Framework</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A363B] font-heading mt-1">
              5 Core Sustainable Travel Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sustainabilityPillars.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-extrabold text-[#3D5A80] uppercase tracking-wider block mb-1.5">
                    {item.tag}
                  </span>
                  <h4 className="text-sm font-bold text-[#2A363B] mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Initiatives Grid */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow-pill bg-[#81B29A]/15 text-[#63927A] border-[#81B29A]/30 mb-2">
              Action Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-[#2A363B] font-heading tracking-tight">
              How EKaNa Drives Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((init, idx) => {
              const Icon = init.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F1DE] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#E07A5F]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2A363B] font-heading mb-2">{init.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{init.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Traveler Pledge CTA */}
        <div className="bg-gradient-to-br from-[#2A363B] to-[#3D5A80] rounded-3xl p-8 sm:p-12 text-white text-center max-w-3xl mx-auto shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3">
            Take the Responsible Traveler Pledge
          </h3>
          <p className="text-white/80 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Leave no trace behind, support local smallholder farmers, respect temple dress customs, and travel gently across Karnataka.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setPledged(!pledged)}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                pledged 
                  ? 'bg-[#81B29A] text-white shadow-lg' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {pledged ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-[#E07A5F]" />}
              <span>{pledged ? 'Pledge Taken! Thank You' : 'Take the Digital Pledge'}</span>
            </button>

            <button 
              onClick={() => navigate('/plan')}
              className="btn-primary text-xs py-3 px-6 shadow-md"
            >
              <span>Plan Eco-Friendly Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sustainability;