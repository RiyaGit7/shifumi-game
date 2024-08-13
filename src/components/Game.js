import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandPaper, faHandScissors, faBolt, faEye } from '@fortawesome/free-solid-svg-icons';
import '../styles/Game.css';

const choices = [
  { name: 'rock', icon: faHandRock },
  { name: 'paper', icon: faHandPaper },
  { name: 'scissors', icon: faHandScissors }
];

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [streak, setStreak] = useState(0);
  const [powerUps, setPowerUps] = useState({ doubleWin: 0, peekChoice: 0 });
  const [computerNextChoice, setComputerNextChoice] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (result === 'You win!') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }, [result]);

  const handlePlayerChoice = (choice) => {
    const compChoice = computerNextChoice || choices[Math.floor(Math.random() * choices.length)].name;
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    const gameResult = determineWinner(choice, compChoice);
    setResult(gameResult);
    updateScore(gameResult);
    setComputerNextChoice(null);

    if (streak === 2) {
      setPowerUps(prev => ({ ...prev, doubleWin: prev.doubleWin + 1 }));
    } else if (streak === 3) {
      setPowerUps(prev => ({ ...prev, peekChoice: prev.peekChoice + 1 }));
    }
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    }
    return 'Computer wins!';
  };

  const updateScore = (result) => {
    if (result === 'You win!') {
      const points = powerUps.doubleWin > 0 ? 2 : 1;
      setScore(prevScore => ({ ...prevScore, player: prevScore.player + points }));
      setStreak(prevStreak => prevStreak + 1);
      if (powerUps.doubleWin > 0) {
        setPowerUps(prev => ({ ...prev, doubleWin: prev.doubleWin - 1 }));
      }
    } else if (result === 'Computer wins!') {
      setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
      setStreak(0);
    }
  };

  const activatePowerUp = (type) => {
    if (powerUps[type] > 0) {
      setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));
      if (type === 'peekChoice') {
        setComputerNextChoice(choices[Math.floor(Math.random() * choices.length)].name);
      }
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title pop-up">Shifumi Game</h1>
      <div className="game-box">
        <div className="score-container">
          <div className="player-score">
            <p>Player : {score.player}</p>
          </div>
          <div className="computer-score">
            <p>Computer : {score.computer}</p>
          </div>
        </div>
        
        <div className="streak-container">
          <p>Current Streak : {streak}</p>
        </div>

        <div className="choices-container">
          {choices.map((choice) => (
            <button
              key={choice.name}
              className="choice-button"
              onClick={() => handlePlayerChoice(choice.name)}
            >
              <FontAwesomeIcon icon={choice.icon} className="choice-icon" />
              <span>{choice.name}</span>
            </button>
          ))}
        </div>

        {result && (
          <div className="result-container scale-in">
            <div className="choices-display">
              <div className="choice-display player-choice">
                <p>You chose:</p>
                <FontAwesomeIcon 
                  icon={choices.find(c => c.name === playerChoice).icon} 
                  className="choice-display-icon" 
                />
              </div>
              <div className="choice-display computer-choice">
                <p>Computer chose:</p>
                <FontAwesomeIcon 
                  icon={choices.find(c => c.name === computerChoice).icon} 
                  className="choice-display-icon" 
                />
              </div>
            </div>
            <p className={`result-text ${result !== "It's a tie!" ? 'win-animation' : ''}`}>{result}</p>
            {showConfetti && <div className="confetti"></div>}
          </div>
        )}

        <div className="power-ups-container">
          <button
            className={`power-up-button ${powerUps.doubleWin > 0 ? 'active' : 'inactive'}`}
            onClick={() => activatePowerUp('doubleWin')}
            disabled={powerUps.doubleWin === 0}
          >
            <FontAwesomeIcon icon={faBolt} className="power-up-icon" />
            Double Win ({powerUps.doubleWin})
          </button>
          <button
            className={`power-up-button ${powerUps.peekChoice > 0 ? 'active' : 'inactive'}`}
            onClick={() => activatePowerUp('peekChoice')}
            disabled={powerUps.peekChoice === 0}
          >
            <FontAwesomeIcon icon={faEye} className="power-up-icon" />
            Peek Next Choice ({powerUps.peekChoice})
          </button>
        </div>

        {computerNextChoice && (
          <p className="next-choice-text fade-in">
            Next computer choice: {computerNextChoice}
          </p>
        )}
      </div>
    </div>
  );
};

export default Game;