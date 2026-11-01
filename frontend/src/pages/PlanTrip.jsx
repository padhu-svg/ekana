import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, Navigation, Clock, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Compass } from 'lucide-react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

const ALL_DISTRICTS = [
  'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 
  'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 
  'Haveri', 'Kalaburagi', 'Kodagu (Coorg)', 'Kolar', 'Koppal', 
  'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 
  'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara (Hampi)', 'Vijayapura', 'Yadgir'
];

const PlanTrip = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const districtParam = searchParams.get('district') || location.state?.district;
  const initialDistrict = districtParam
    ? (ALL_DISTRICTS.find(d => d.toLowerCase().includes(districtParam.toLowerCase()) || districtParam.toLowerCase().includes(d.toLowerCase())) || districtParam)
    : 'Chikkamagaluru';
  
  const [formData, setFormData] = useState({
    destination: initialDistrict,
    duration: '3',
    travelers: '2',
    interests: ['Heritage', 'Nature & Hills']
  });

  useEffect(() => {
    if (districtParam) {
      const match = ALL_DISTRICTS.find(d => d.toLowerCase().includes(districtParam.toLowerCase()) || districtParam.toLowerCase().includes(d.toLowerCase())) || districtParam;
      setFormData(prev => ({ ...prev, destination: match }));
    }
  }, [districtParam]);

  const interestsList = [
    'Heritage & UNESCO', 'Nature & Hills', 'Wildlife Reserves', 
    'Karavali Coast', 'Culture & Crafts', 'Temple Circuits', 'Organic Food & Farms'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = () => {
    setLoading(true);
    setTimeout(() => {
      setItinerary([
        {
          day: 1,
          title: `Arrival & Natural Landscape of ${formData.destination}`,
          activities: [
            { time: '09:30 AM', desc: 'Check in to a certified sustainable eco-homestay nestled amidst native flora.' },
            { time: '01:00 PM', desc: 'Authentic local lunch with traditional organic recipes and seasonal farm produce.' },
            { time: '03:30 PM', desc: 'Guided orientation walk through local village plantations and community landmarks.' },
            { time: '06:30 PM', desc: 'Scenic sunset viewpoint followed by an evening cultural storytelling session.' }
          ]
        },
        {
          day: 2,
          title: 'Deep Heritage & Nature Trail',
          activities: [
            { time: '07:00 AM', desc: 'Early morning guided biodiversity bird-watching walk or ancient stone trail.' },
            { time: '11:00 AM', desc: 'Explore historic monuments, stone carvings, or mountain viewpoints with a certified guide.' },
            { time: '02:30 PM', desc: 'Interactive workshop with regional artisans (handlooms, pottery, or wood carving).' },
            { time: '07:00 PM', desc: 'Traditional dinner featuring regional specialties like Jolada Rotti or fresh Neer Dosa.' }
          ]
        },
        {
          day: 3,
          title: 'Local Markets & Mindful Departure',
          activities: [
            { time: '08:30 AM', desc: 'Visit local farmers market to support direct-from-source spices, coffee, and honey.' },
            { time: '11:30 AM', desc: 'Final scenic spot and reflective photo stop before checkout.' },
            { time: '02:00 PM', desc: 'Departure with memorable, low-impact memories of Karnataka.' }
          ]
        }
      ]);
      setLoading(false);
      setStep(3);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#E07A5F]/15 blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" /> AI Travel Companion
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-2">
            Smart Karnataka Itinerary Builder
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto">
            Personalize a day-by-day travel plan curated with verified routes, eco-homestays, and local certified guides.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
          
          {/* Progress Steps Header */}
          <div className="grid grid-cols-3 gap-2 mb-8 pb-6 border-b border-gray-100">
            <div className={`flex flex-col items-center text-center pb-2 border-b-2 transition-colors ${
              step >= 1 ? 'border-[#E07A5F] text-[#E07A5F]' : 'border-gray-200 text-gray-400'
            }`}>
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Step 01</span>
              <span className="text-xs font-semibold hidden sm:inline text-gray-800">Destination</span>
            </div>
            
            <div className={`flex flex-col items-center text-center pb-2 border-b-2 transition-colors ${
              step >= 2 ? 'border-[#3D5A80] text-[#3D5A80]' : 'border-gray-200 text-gray-400'
            }`}>
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Step 02</span>
              <span className="text-xs font-semibold hidden sm:inline text-gray-800">Interests</span>
            </div>

            <div className={`flex flex-col items-center text-center pb-2 border-b-2 transition-colors ${
              step >= 3 ? 'border-[#81B29A] text-[#81B29A]' : 'border-gray-200 text-gray-400'
            }`}>
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Step 03</span>
              <span className="text-xs font-semibold hidden sm:inline text-gray-800">Itinerary</span>
            </div>
          </div>

          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-extrabold text-[#2A363B] font-heading mb-1">
                Where would you like to travel?
              </h2>
              <p className="text-xs text-gray-500 mb-6">Select from all 31 districts or choose a surprise circuit.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Target District / Region
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E07A5F] h-5 w-5" />
                    <select 
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none font-semibold text-sm"
                    >
                      <option value="">Select a District</option>
                      {ALL_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Duration (Days)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D5A80] h-5 w-5" />
                      <input 
                        type="number" min="1" max="14"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3D5A80] focus:outline-none font-semibold text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Number of Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81B29A] h-5 w-5" />
                      <input 
                        type="number" min="1" max="20"
                        value={formData.travelers}
                        onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#81B29A] focus:outline-none font-semibold text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.destination}
                  className="btn-primary w-full justify-center text-sm py-3.5 mt-6 disabled:opacity-50"
                >
                  <span>Continue to Interests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Interests Selection */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-extrabold text-[#2A363B] font-heading mb-1">
                What kind of experience do you seek?
              </h2>
              <p className="text-xs text-gray-500 mb-6">Select all themes you would like included in your itinerary.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {interestsList.map(interest => {
                  const isSelected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between text-xs font-bold ${
                        isSelected
                          ? 'border-[#3D5A80] bg-[#3D5A80] text-white shadow-xs'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-white hover:border-gray-300'
                      }`}
                    >
                      <span>{interest}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-full border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button 
                  onClick={generateItinerary}
                  className="w-2/3 btn-primary justify-center text-xs py-3"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Itinerary</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading Animation */}
          {loading && (
            <div className="py-16 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#E07A5F] border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-[#2A363B] font-heading mb-1">Analyzing Karnataka Circuits...</h3>
              <p className="text-xs text-gray-500">Checking verified route distances, heritage timings, and eco-homestays.</p>
            </div>
          )}

          {/* STEP 3: Generated Itinerary View */}
          {step === 3 && itinerary && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-6 border-b border-gray-100">
                <div>
                  <span className="eyebrow-pill bg-[#81B29A]/15 text-[#63927A] border-[#81B29A]/30 mb-2">
                    Custom Generated Plan
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#2A363B] font-heading">
                    {formData.duration}-Day {formData.destination} Journey
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.travelers} Travelers • Tailored for {formData.interests.join(', ')}
                  </p>
                </div>
                
                <button 
                  onClick={() => setStep(1)} 
                  className="text-xs font-bold text-[#E07A5F] hover:underline self-start sm:self-auto"
                >
                  Edit Preferences
                </button>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-8">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-[#81B29A]/30">
                    <div className="absolute -left-3.5 top-0 bg-[#81B29A] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs">
                      {day.day}
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-[#2A363B] font-heading mb-3">
                      Day {day.day}: {day.title}
                    </h3>

                    <div className="space-y-2.5">
                      {day.activities.map((act, i) => (
                        <div key={i} className="bg-gray-50 hover:bg-gray-100/70 transition-colors rounded-2xl p-3.5 flex items-start border border-gray-100 gap-3">
                          <span className="bg-[#3D5A80]/10 text-[#3D5A80] text-[11px] font-bold px-2 py-1 rounded-md shrink-0 mt-0.5">
                            {act.time}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                            {act.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action Box */}
              <div className="mt-10 p-6 bg-[#3D5A80] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base font-heading">Connect with Verified Hosts</h4>
                  <p className="text-white/75 text-xs">Book local homestays and certified guides for this route.</p>
                </div>
                <button 
                  onClick={() => navigate('/community')}
                  className="btn-primary text-xs py-2.5 px-5 shrink-0"
                >
                  <span>Explore Homestays</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
};

export default PlanTrip;
