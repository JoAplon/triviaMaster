import React from 'react';
import { Link } from 'react-router-dom';

const ModeSelection = () => {
  return (
    <div>
      <h2>Choose Game Mode: </h2>
      <div>
        <Link to="/singleplayer">
          <button>Single Player</button>
        </Link>
      </div>
      <div>
        <Link to="/multiplayer">
          <button>Multiplayer</button>
        </Link>
      </div>
    </div>
  );
};

export default ModeSelection;
