import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Sustainability from './pages/Sustainability';
import ExploreMap from './pages/ExploreMap';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PlaceDetails from './pages/PlaceDetails';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/map" element={<ExploreMap />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
      </Routes>
    </PublicLayout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;