import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Hry pro vedoucí</h1>
        <p className="hero-description">
          Jsme druhý turnus táboru <strong>SPT</strong> (nejlepší turnus). 
          Tento web slouží jako centrální přehled výsledků, úkolů a statistik pro naše oblíbené hry.
        </p>
      </section>

      <div className="game-links">
        <Link to="/bobrici" className="game-card bobrici-card">
          <div className="card-icon">🦫</div>
          <div className="card-content">
            <h2>Bobříci</h2>
            <p>Seznam úkolů, žebříčky a profily hráčů.</p>
            <span className="card-action">Zobrazit výsledky →</span>
          </div>
        </Link>

        <Link to="/kissing-killer" className="game-card killer-card">
          <div className="card-icon">💋</div>
          <div className="card-content">
            <h2>Kissing Killer</h2>
            <p>Aktuální žebříček vítězství v napínavé hře.</p>
            <span className="card-action">Kdo vede? →</span>
          </div>
        </Link>

        <Link to="/palermo" className="game-card palermo-card">
          <div className="card-icon">🕵️</div>
          <div className="card-content">
            <h2>Palermo</h2>
            <p>Statistiky a role z detektivní hry Palermo.</p>
            <span className="card-action">Statistiky →</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
