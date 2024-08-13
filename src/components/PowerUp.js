import React from 'react';

const PowerUp = ({ powerUps, activatePowerUp }) => {
  return (
    <div>
      <h3>Power-ups:</h3>
      <button onClick={() => activatePowerUp('doubleWin')} disabled={powerUps.doubleWin === 0}>
        Double Win ({powerUps.doubleWin})
      </button>
      <button onClick={() => activatePowerUp('peekChoice')} disabled={powerUps.peekChoice === 0}>
        Peek Next Choice ({powerUps.peekChoice})
      </button>
    </div>
  );
};

export default PowerUp;