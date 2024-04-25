import React from 'react';
import '../css/leaderboard.css'

const Leaderboard = ({ leaderboardData }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul className='leaderboardList'>
        {leaderboardData.map((player, index) => (
          <li key={index}>
            <span>{player.name}</span>
            <span>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
