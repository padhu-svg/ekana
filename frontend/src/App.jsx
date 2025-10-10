import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Sustainability from './pages/Sustainability';
import ExploreMap from './pages/ExploreMap';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/map" element={<ExploreMap />} />
            <Route path="/sustainability" element={<Sustainability />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;