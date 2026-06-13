import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BadgeDetail } from '../../utils/bobriciUtils';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80 }
  }
};

const Ukoly: React.FC = () => {
  const { badgeDetails, badgeNames } = useOutletContext<{ badgeDetails: BadgeDetail[], badgeNames: string[] }>();

  // Pokud úkol není v seznamu detailů, vytvoříme pro něj aspoň základní kartu
  const allBadges = badgeNames.map(name => {
    const detail = badgeDetails.find(d => d.name === name);
    return detail || { name, story: 'Tento bobřík čeká na svůj příběh...', task: 'Úkol zatím nebyl definován.' };
  });

  return (
    <motion.div 
      className="ukoly-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Seznam bobříků a jejich zkoušek</h2>
      <p className="page-intro">Zde najdeš legendy starých lovců a podmínky pro získání jednotlivých bobříků.</p>
      
      <motion.div 
        className="ukoly-list"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {allBadges.map((badge) => (
          <motion.div key={badge.name} className="ukol-card" variants={cardVariants}>
            <div className="ukol-header">
              <div className="ukol-badge-icon">🦫</div>
              <h3 className="ukol-name">{badge.name}</h3>
            </div>
            
            <div className="ukol-body">
              <div className="ukol-story">
                <h4>Příběhové zasazení</h4>
                <p>{badge.story}</p>
              </div>
              
              <div className="ukol-task-box">
                <h4>Samotný úkol</h4>
                <p>{badge.task}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Ukoly;
