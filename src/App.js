import { useState } from 'react';

import MainBoard from './components/MainBoard';
import Infos from './components/Infos';

const states = {
  Initial: 'initial',
  Running: 'running',
  Win: 'win',
  Lost: 'lost'
}

function App() {
  // tick speed
  const [updateRate, changeUpdateRate] = useState(1000); // mileseconds

  // game variables
  const [scorre, updateScorre] = useState(0);
  const [nextPiece, changeNextPiece] = useState();
  const [linesCleared, updateLinesCleared] = useState(0);
  const [gameState, changeState] = useState(states.Initial); // running, lost, win, initial

  // list with all pieces object in game
  const [pieces, changePieces] = useState([]);
  // pieces played so far (used to calculate the probabilit of pieces spawning)
  const [piecesCount, updateCount] = useState([]);
  
  return (
    <div className="App">
      <MainBoard
        updateScorre={updateScorre}
        nextPiece={nextPiece}
        updateLinesCleared={updateLinesCleared}
        gameState={gameState}
        changeState={changeState}
        pieces={pieces} // talez irrelevante
        updateCount={updateCount}
        updateRate={updateRate}
      />
      <Infos
        scorre={scorre}
        nextPiece={nextPiece}
        changeNextPiece={changeNextPiece}
        linesCleared={linesCleared}
        gameState={gameState}
        piecesCount={piecesCount}
        changeUpdateRate={changeUpdateRate}
        changePieces={changePieces}
      />
    </div>
  );
}

export default App;
