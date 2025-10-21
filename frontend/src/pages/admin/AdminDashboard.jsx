import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Users, BarChart3, LogOut, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [places, setPlaces] = useState([]);
  const [stats, setStats] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    state: 'Karnataka',
    district: '',
    description: '',
    images: [''],
    latitude: '',
    longitude: '',
    best_time: '',
    duration: '',
    rating: 4.0
  });

  const categories = ['Hills', 'Heritage', 'Wildlife', 'Coast', 'Culture', 'Eco-Tourism'];

  useEffect(() => {
    fetchDashboardData();
    fetchPlaces();
  }, []);



  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:8000/api/v1/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }
      
      const data = await response.json();
      setAdmin(data.admin);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:8000/api/v1/admin/places', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPlaces(data);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();
    try {
      // Handle image upload if file is selected
      let imageUrls = [];
      for (const img of newPlace.images) {
        if (typeof img === 'object' && img.file) {
          // Upload file to Supabase Storage
          const formData = new FormData();
          formData.append('image', img.file);
          
          const uploadResponse = await fetch('http://localhost:8000/api/v1/upload', {
            method: 'POST',
            body: formData
          });
          
          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            if (uploadData.success) {
              imageUrls.push(uploadData.imageUrl);
            }
          } else {
            throw new Error('Failed to upload image');
          }
        } else if (typeof img === 'string' && img.trim() !== '') {
          // Use URL directly
          imageUrls.push(img.trim());
        }
      }

      // Save place data to database
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:8000/api/v1/admin/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newPlace,
          latitude: parseFloat(newPlace.latitude) || null,
          longitude: parseFloat(newPlace.longitude) || null,
          rating: parseFloat(newPlace.rating) || 4.0,
          images: imageUrls
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add place');
      }
      
      alert('Place added successfully!');
      setShowAddForm(false);
      setNewPlace({
        name: '', category: '', state: 'Karnataka', district: '', description: '',
        images: [''], latitude: '', longitude: '', best_time: '', duration: '', rating: 4.0
      });
      fetchPlaces();
    } catch (error) {
      console.error('Error adding place:', error);
      alert('Error adding place: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/ekana_logo.jpeg" alt="EKaNa" className="h-10 w-10 rounded-full" />
              <h1 className="text-2xl font-bold text-green-800">EKaNa Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {admin?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-green-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Places</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_places || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.2</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Add Place Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Tourist Places</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Place</span>
          </button>
        </div>

        {/* Add Place Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Tourist Place</h3>
              
              <form onSubmit={handleAddPlace} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Place Name</label>
                    <input
                      type="text"
                      value={newPlace.name}
                      onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newPlace.category}
                      onChange={(e) => setNewPlace({...newPlace, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                    <input
                      type="text"
                      value={newPlace.district}
                      onChange={(e) => setNewPlace({...newPlace, district: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Best Time</label>
                    <input
                      type="text"
                      value={newPlace.best_time}
                      onChange={(e) => setNewPlace({...newPlace, best_time: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Oct-Mar"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={newPlace.duration}
                      onChange={(e) => setNewPlace({...newPlace, duration: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 2-3 hours"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newPlace.description}
                    onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="3"
                    required
                  />
                </div>
                
                <ImageUpload
                  value={newPlace.images[0]}
                  onChange={(imageUrl) => setNewPlace({...newPlace, images: [imageUrl]})}
                  label="Place Image"
                />
                
                <div className="flex space-x-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                  >
                    Add Place
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{place.name}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {place.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{place.district}, {place.state}</p>
                <p className="text-gray-700 text-sm line-clamp-2 mb-4">{place.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating: {place.rating}/5</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;