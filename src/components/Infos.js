import { 
  Scorre,
  NextPiece,
  CrrLevel,
} from './display';

import { useState } from 'react';

function Infos() {
  const [level, updateLevel] = useState(1);

  return(
    <div>
      <Scorre/>
      <NextPiece/>
      <CrrLevel/>
    </div>
  )
}

export default Infos;
