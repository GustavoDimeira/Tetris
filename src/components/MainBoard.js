import { useState, useEffect } from "react";

function MainBoard({
  updateScorre, nextPiece, updateLinesCleared, gameState, changeState, pieces, updateCount, updateRate
}) {
  const [crrPiece, changeCrrPiece] = useState(nextPiece);

  return(
    <div>
      MainBoard
    </div>
    
  )
}

export default MainBoard;
