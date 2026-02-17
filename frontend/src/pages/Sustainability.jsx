import { motion } from 'framer-motion';
import { Leaf, Users, Globe, Heart, Target, Award } from 'lucide-react';

const Sustainability = () => {
  const sdgGoals = [
    {
      number: 8,
      title: 'Decent Work and Economic Growth',
      description: 'Supporting local entrepreneurs and creating sustainable tourism jobs',
      icon: Users,
      color: 'bg-red-500'
    },
    {
      number: 11,
      title: 'Sustainable Cities and Communities',
      description: 'Promoting responsible tourism that preserves local communities',
      icon: Globe,
      color: 'bg-orange-500'
    },
    {
      number: 12,
      title: 'Responsible Consumption',
      description: 'Encouraging eco-friendly travel practices and local products',
      icon: Leaf,
      color: 'bg-yellow-500'
    },
    {
      number: 13,
      title: 'Climate Action',
      description: 'Reducing carbon footprint through sustainable travel options',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      number: 15,
      title: 'Life on Land',
      description: 'Protecting Karnataka\'s biodiversity and natural habitats',
      icon: Heart,
      color: 'bg-blue-500'
    }
  ];

  const initiatives = [
    {
      title: 'Eco-Certified Accommodations',
      description: 'Partner with homestays and hotels that follow sustainable practices',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500',
      impact: '50+ certified partners'
    },
    {
      title: 'Local Community Support',
      description: 'Direct booking platform ensuring 80% revenue goes to local entrepreneurs',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
      impact: '200+ families supported'
    },
    {
      title: 'Wildlife Conservation',
      description: 'Supporting conservation efforts in Karnataka\'s national parks',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=500',
      impact: '5 conservation projects'
    }
  ];

  const metrics = [
    { label: 'CO2 Offset', value: '500 tons', icon: Leaf },
    { label: 'Local Jobs Created', value: '1,200+', icon: Users },
    { label: 'Communities Supported', value: '50+', icon: Globe },
    { label: 'Conservation Projects', value: '15', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              Sustainable Tourism for Karnataka
            </h1>
            <p className="text-xl text-yellow-200 max-w-3xl mx-auto">
              We're committed to preserving Karnataka's natural beauty and supporting local communities 
              through responsible tourism practices
            </p>
          </motion.div>
        </div>
      </section>

      {/* SDG Goals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Commitment to UN SDGs</h2>
            <p className="text-xl text-gray-600">Aligning our mission with global sustainability goals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className={`${goal.color} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <goal.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">SDG {goal.number}</div>
                    <h3 className="font-bold text-gray-900">{goal.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Measurable results of our sustainability efforts</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Initiatives</h2>
            <p className="text-xl text-gray-600">Programs making a real difference in Karnataka</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{initiative.title}</h3>
                  <p className="text-gray-600 mb-4">{initiative.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-semibold">{initiative.impact}</span>
                    <Award className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Sustainability Mission</h2>
            <p className="text-xl text-yellow-200 mb-8">
              Be part of the change. Travel responsibly and support local communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary text-lg px-8 py-4">
                Become a Partner
              </button>
              <button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;