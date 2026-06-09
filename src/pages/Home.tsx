import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Hry pro vedoucí</h1>
      <p>Vítejte na stránkách s výsledky a přehledy her.</p>
      <div className="game-links">
        <Link to="/bobrici" className="game-card">
          <h2>Bobříci</h2>
          <p>Seznam úkolů, žebříčky a profily hráčů.</p>
        </Link>
        <Link to="/kissing-killer" className="game-card">
          <h2>Kissing Killer</h2>
          <p>Aktuální žebříček vítězství.</p>
        </Link>
        <Link to="/palermo" className="game-card">
          <h2>Palermo</h2>
          <p>Statistiky ze hry Palermo.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
