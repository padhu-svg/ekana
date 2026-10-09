import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, Navigation, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlanTrip = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  
  const [formData, setFormData] = useState({
    destination: '',
    duration: '3',
    travelers: '2',
    interests: []
  });

  const interestsList = ['Heritage', 'Nature & Hills', 'Wildlife', 'Beaches', 'Culture & Cuisine', 'Temples'];

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
    // Simulate AI generation delay
    setTimeout(() => {
      setItinerary([
        {
          day: 1,
          title: 'Arrival & Local Exploration',
          activities: [
            { time: '10:00 AM', desc: 'Arrive and check into your sustainable eco-stay.' },
            { time: '01:00 PM', desc: 'Traditional Karnataka Thali lunch.' },
            { time: '04:00 PM', desc: 'Guided walking tour of the local heritage district.' }
          ]
        },
        {
          day: 2,
          title: 'Deep Dive into Culture',
          activities: [
            { time: '09:00 AM', desc: 'Morning visit to historic temples and monuments.' },
            { time: '02:00 PM', desc: 'Artisan village visit - interact with local craftsmen.' },
            { time: '06:00 PM', desc: 'Sunset viewpoint and evening cultural performance.' }
          ]
        },
        {
          day: 3,
          title: 'Nature & Departure',
          activities: [
            { time: '06:00 AM', desc: 'Early morning nature trail and bird watching.' },
            { time: '11:00 AM', desc: 'Visit local markets for souvenirs.' },
            { time: '02:00 PM', desc: 'Departure.' }
          ]
        }
      ]);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-8 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2A363B] font-heading mb-4">Smart Itinerary Builder</h1>
          <p className="text-lg text-gray-600">Let our AI craft the perfect Karnataka experience based on your preferences.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-[#81B29A]' : 'bg-gray-200'}`}></div>
            <div className="px-4 text-sm font-semibold text-gray-500">Step {step} of 3</div>
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-[#81B29A]' : 'bg-gray-200'}`}></div>
            <div className="px-4 text-sm font-semibold text-gray-500"></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 3 ? 'bg-[#81B29A]' : 'bg-gray-200'}`}></div>
          </div>

          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold text-[#2A363B] mb-6">Tell us about your trip</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Where do you want to go?</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select 
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E07A5F] focus:outline-none"
                    >
                      <option value="">Select a District (e.g. Mysuru, Hampi)</option>
                      <option value="Mysuru">Mysuru</option>
                      <option value="Hampi">Hampi (Vijayanagara)</option>
                      <option value="Kodagu">Coorg (Kodagu)</option>
                      <option value="Dakshina Kannada">Dakshina Kannada</option>
                      <option value="Chikkamagaluru">Chikkamagaluru</option>
                      <option value="Anywhere">Surprise Me! (Anywhere in Karnataka)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input 
                        type="number" min="1" max="14"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E07A5F] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input 
                        type="number" min="1" max="20"
                        value={formData.travelers}
                        onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E07A5F] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.destination}
                  className="w-full mt-8 bg-[#E07A5F] hover:bg-[#D0694E] text-white py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Interests */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold text-[#2A363B] mb-2">What interests you?</h2>
              <p className="text-gray-500 mb-6">Select all that apply to personalize your itinerary.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {interestsList.map(interest => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.interests.includes(interest)
                        ? 'border-[#3D5A80] bg-[#3D5A80]/10 text-[#3D5A80]'
                        : 'border-gray-200 text-gray-600 hover:border-[#3D5A80]/50'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(1)}
                  className="w-1/3 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={generateItinerary}
                  className="w-2/3 bg-[#81B29A] hover:bg-[#63927A] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Magic Itinerary
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E07A5F] mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-[#2A363B] mb-2">Crafting your perfect trip...</h3>
              <p className="text-gray-500">Our AI is analyzing routes, local experiences, and eco-stays.</p>
            </motion.div>
          )}

          {/* STEP 3: Result */}
          {step === 3 && itinerary && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-3xl font-bold text-[#2A363B] font-heading mb-2">Your {formData.duration}-Day EKaNa Experience</h2>
                  <p className="text-[#E07A5F] font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> {formData.destination} &bull; {formData.travelers} Travelers
                  </p>
                </div>
                <button onClick={() => setStep(1)} className="text-[#3D5A80] font-semibold hover:underline">
                  Start Over
                </button>
              </div>

              <div className="space-y-8">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-[#81B29A]/30">
                    <div className="absolute -left-3 top-0 bg-[#81B29A] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                      {day.day}
                    </div>
                    <h3 className="text-xl font-bold text-[#2A363B] mb-4">{day.title}</h3>
                    <div className="space-y-4">
                      {day.activities.map((act, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-start border border-gray-100">
                          <Clock className="w-5 h-5 text-[#3D5A80] mr-3 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-gray-800 block mb-1">{act.time}</span>
                            <span className="text-gray-600">{act.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-[#3D5A80]/10 rounded-2xl border border-[#3D5A80]/20 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h4 className="font-bold text-[#2A363B] text-lg">Ready to make this a reality?</h4>
                  <p className="text-gray-600 text-sm">Connect with verified local guides and sustainable stays.</p>
                </div>
                <button className="bg-[#3D5A80] hover:bg-[#293E58] text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center shrink-0">
                  <Navigation className="w-4 h-4 mr-2" /> Book This Itinerary
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
