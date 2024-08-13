import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';

const PlayerChoice = ({ onChoiceSelected }) => {
  const choices = [
    { name: 'rock', icon: faHand },
    { name: 'paper', icon: faHandPaper },
    { name: 'scissors', icon: faHandScissors }
  ];
  
  return (
    <>
      {choices.map(choice => (
        <button key={choice.name} onClick={() => onChoiceSelected(choice.name)}>
          <FontAwesomeIcon icon={choice.icon} size="2x" />
          <span>{choice.name}</span>
        </button>
      ))}
    </>
  );
};

export default PlayerChoice;