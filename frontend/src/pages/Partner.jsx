import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake, Building2 } from 'lucide-react';

const KARNATAKA_DISTRICTS = [
  'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 
  'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 
  'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 
  'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 
  'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir'
].sort();

const Partner = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Homestay Host',
    district: 'Kodagu',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'Homestay Host',
        district: 'Kodagu',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#E07A5F]/15 blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#E07A5F]" /> Open Partnership Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-3">
            Partner with the EKaNa Alliance
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Are you a local homestay host, certified nature guide, artisan collective, or district tourism body? Join Karnataka’s verified sustainable travel ecosystem.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Contact Details Sidebar */}
          <div className="bg-[#2A363B] text-white p-8 sm:p-10 lg:col-span-5 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="eyebrow-pill bg-white/10 text-[#E07A5F] border-white/15 mb-4">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-4">
                Empowering Local Custodians
              </h2>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-8">
                EKaNa collaborates directly with grassroots hosts, district administrations, and conservationists across all 31 districts to keep tourism revenue within village economies.
              </p>
              
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#E07A5F] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Karnataka Operations</h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                      EKaNa Tourism Alliance, Vidhana Soudha Road, Bengaluru, Karnataka 560001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#81B29A] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Direct Helpline</h4>
                    <p className="text-xs text-white/70 mt-1">+91 80 2235 2828</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#3D5A80] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Partnership Desk</h4>
                    <p className="text-xs text-white/70 mt-1">partners@ekana.life</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 leading-relaxed">
              ● 100% verified grassroots listings with zero middleman commissions on artisan tours.
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10 lg:col-span-7 bg-white">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2A363B] font-heading mb-2">
              Send a Partnership Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-8">
              Fill in your details below and our Karnataka district coordinator will reach out within 24 hours.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="p-8 bg-[#81B29A]/15 border border-[#81B29A]/30 rounded-3xl text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-[#81B29A] mx-auto mb-3" />
                <h4 className="text-lg font-bold text-[#2A363B] mb-1">Inquiry Submitted Successfully!</h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for your interest in joining EKaNa. Our regional field manager for {formData.district} will connect with you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name / Organization Name *
                  </label>
                  <input
                    type="text" required
                    placeholder="e.g. Ramesh Gowda (Gowda Estate)"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none text-sm font-medium transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email" required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel" required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Partner Category *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none text-sm font-medium transition-all"
                    >
                      <option value="Homestay Host">Homestay Host</option>
                      <option value="Certified Local Guide">Certified Local Guide</option>
                      <option value="Artisan / Craftsperson">Artisan / Craft Collective</option>
                      <option value="Eco Tour Operator">Eco Tour Operator</option>
                      <option value="Panchayat / Govt Body">Local Panchayat / Forest Dept</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      District (All 31 Available) *
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none text-sm font-medium transition-all"
                    >
                      {KARNATAKA_DISTRICTS.map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Brief Proposal / Property Description *
                  </label>
                  <textarea
                    rows="4" required
                    placeholder="Tell us about your homestay, local guiding services, craft workshops, or community initiative..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E07A5F] focus:outline-none text-sm font-medium transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center text-sm py-3.5 mt-2 shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  <span>Submit Partnership Application</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default Partner;
