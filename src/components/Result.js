import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';

const Result = ({ playerChoice, computerChoice, result, score, streak }) => {
  const getIcon = (choice) => {
    switch(choice) {
      case 'rock': return faHand;
      case 'paper': return faHandPaper;
      case 'scissors': return faHandScissors;
      default: return faHand;
    }
  };

  return (
    <>
      <div className="choices-display">
        <div className="player-choice">
          <FontAwesomeIcon icon={getIcon(playerChoice)} className="choice-icon" />
          <p>You chose: {playerChoice}</p>
        </div>
        <div className="computer-choice">
          <FontAwesomeIcon icon={getIcon(computerChoice)} className="choice-icon" />
          <p>Computer chose: {computerChoice}</p>
        </div>
      </div>
      <p className="result-text">Result: {result}</p>
      <div className="score">
        <p>Score - Player: {score.player}, Computer: {score.computer}</p>
        <p>Current Streak: {streak}</p>
      </div>
    </>
  );
};

export default Result;