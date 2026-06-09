import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import KissingKiller from './pages/KissingKiller';
import Palermo from './pages/Palermo';
import BobriciLayout from './pages/Bobrici/BobriciLayout';
import Ukoly from './pages/Bobrici/Ukoly';
import Hraci from './pages/Bobrici/Hraci';
import HracDetail from './pages/Bobrici/HracDetail';
import Zebricek from './pages/Bobrici/Zebricek';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <header>
          <nav className="main-nav">
            <Link to="/" className="nav-logo">SPT 2. Turnus</Link>
            <div className="nav-links">
              <Link to="/">Domů</Link>
              <Link to="/bobrici">Bobříci</Link>
              <Link to="/kissing-killer">Kissing Killer</Link>
              <Link to="/palermo">Palermo</Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kissing-killer" element={<KissingKiller />} />
            <Route path="/palermo" element={<Palermo />} />
            <Route path="/bobrici" element={<BobriciLayout />}>
              <Route index element={<Ukoly />} />
              <Route path="ukoly" element={<Ukoly />} />
              <Route path="hraci" element={<Hraci />} />
              <Route path="hraci/:id" element={<HracDetail />} />
              <Route path="zebricek" element={<Zebricek />} />
            </Route>
          </Routes>
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p className="made-by">Vyrobeno LukyNkem</p>
              <p>&copy; {new Date().getFullYear()} SPT 2. Turnus</p>
            </div>
            <div className="footer-links">
              <a href="https://www.sptlomnice.cz/2-turnus" target="_blank" rel="noopener noreferrer">Webovky</a>
              <a href="https://www.facebook.com/spt.lucane/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/spt.lucane/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
