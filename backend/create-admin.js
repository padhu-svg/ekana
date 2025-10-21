const axios = require('axios');

const createAdmin = async () => {
  const adminData = {
    username: 'admin',
    email: 'admin@ekana.com',
    password: 'admin123'
  };

  try {
    const response = await axios.post('http://localhost:8000/api/v1/admin/create-admin', adminData);
    console.log('✅ Admin created successfully:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data);
    } else {
      console.error('❌ Network error:', error.message);
    }
  }
};

createAdmin();