import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import ExploreMap from './pages/ExploreMap';
import PlaceDetails from './pages/PlaceDetails';
import PlanTrip from './pages/PlanTrip';
import Community from './pages/Community';
import Blog from './pages/Blog';
import Partner from './pages/Partner';
import Sustainability from './pages/Sustainability';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

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
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/plan" element={<PlanTrip />} />
        <Route path="/community" element={<Community />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/sustainability" element={<Sustainability />} />
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